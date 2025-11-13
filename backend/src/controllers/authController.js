const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNIN
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query user by email
    const [rows] = await pool.query(
      "SELECT * FROM User_Table WHERE Email_ID = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.Password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.User_ID, email: user.Email_ID },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    const { Password, ...userWithoutPassword } = user;

    res.json({
      message: "Signin successful",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};



//SIGNUP

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      primaryPhone,
      secondaryPhone,
      email,
      password,
      address,
      startYear,
      endYear,
      jobTitle,
      companyName,
      city,
      country,
      sector,
      skills,
      scholarId,
      department,
      branch
    } = req.body;

    const currentYear = new Date().getFullYear();
    let userTypeId = 2; 
    if (endYear && parseInt(endYear) < currentYear) {
      userTypeId = 1; 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO User_Table 
        (User_Type_ID, User_Fname, User_Lname, Gender, Phone_no, Phone_no_2, Email_ID, Password, Address) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userTypeId, firstName, lastName, gender, primaryPhone, secondaryPhone, email, hashedPassword, address]
    );

    const userId = result.insertId;

    if (userTypeId === 2) {
      await pool.query(
        `INSERT INTO Student_Table (User_ID, Scholar_No, Department, Course, Current_Year, Graduation_Year) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, scholarId, department, branch, startYear, endYear]
      );
    } else if (userTypeId === 1) {
      const alumniId = Math.floor(10000 + Math.random() * 90000); 

await pool.query(
  `INSERT INTO Alumni_Table (
    Alumni_ID, User_ID, Enrollment_No, Department, Course, Graduation_Year,
    Job_Title, Company_Name, Current_City, Current_Country, Sector, Skills
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [alumniId, userId, scholarId, department, branch, endYear, jobTitle, companyName, city, country, sector, skills]
);


    }

    res.status(201).json({ message: "User registered successfully", userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
