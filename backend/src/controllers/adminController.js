const db = require("../config/db");
const bcrypt = require("bcryptjs");

// ==================== DASHBOARD STATS ====================

exports.getDashboardStats = async (req, res) => {
  try {
    const [[alumni]] = await db.query("SELECT COUNT(*) AS totalAlumni FROM alumni_table");
    const [[students]] = await db.query("SELECT COUNT(*) AS activeStudents FROM student_table");
    const [[events]] = await db.query("SELECT COUNT(*) AS upcomingEvents FROM event_table WHERE Event_Date >= CURDATE()");
    const [[jobs]] = await db.query("SELECT COUNT(*) AS jobPostings FROM job_postings");
    const [[totalAmount]] = await db.query("SELECT SUM(Amount) AS totalDonationAmount FROM donation");
    const [[donationCount]] = await db.query("SELECT COUNT(*) AS totalDonationCount FROM donation");

    res.json({
      totalAlumni: alumni.totalAlumni || 0,
      activeStudents: students.activeStudents || 0,
      upcomingEvents: events.upcomingEvents || 0,
      jobPostings: jobs.jobPostings || 0,
      totalDonationAmount: totalAmount.totalDonationAmount || 0,
      totalDonationCount: donationCount.totalDonationCount || 0,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ error: "Failed to load dashboard statistics" });
  }
};

// ==================== PROJECT MANAGEMENT ====================

exports.getProjects = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.Project_ID AS id, p.Project_title AS title, p.Project_Description AS description,
        p.Funds_Required AS target, p.Fund_Raised AS raised, p.Category AS category,
        p.Project_Status AS status, p.Image AS image, p.Start_Date AS startDate,
        p.End_Date AS endDate, p.Created_At
      FROM project p ORDER BY p.Project_ID ASC;
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching projects:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

exports.createProject = async (req, res) => {
  try {
    const AdminUserID = req.user.id;
    const { Project_title, Project_Description, Funds_Required, Fund_Raised, Category, Image, Start_Date, End_Date } = req.body;

    if (!Project_title || !Funds_Required || !Category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [result] = await db.query(
      `INSERT INTO project (User_ID, Project_title, Project_Description, Funds_Required, Fund_Raised, Category, Image, Project_Status, Created_At, Start_Date, End_Date)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'Ongoing', NOW(), ?, ?)`,
      [AdminUserID, Project_title, Project_Description || "", Funds_Required, Fund_Raised || 0, Category, Image || null, Start_Date || null, End_Date || null]
    );

    res.status(201).json({ success: true, message: "Project created successfully", projectId: result.insertId });
  } catch (err) {
    console.error("❌ Error adding project:", err);
    res.status(500).json({ error: "Failed to create project" });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { Project_title, Project_Description, Funds_Required, Fund_Raised, Category, Image, Project_Status, Start_Date, End_Date } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE project SET Project_title=?, Project_Description=?, Funds_Required=?, Fund_Raised=?, Category=?, Image=?, Project_Status=?, Start_Date=?, End_Date=? WHERE Project_ID=?`,
      [Project_title, Project_Description, Funds_Required, Fund_Raised, Category, Image, Project_Status, Start_Date || null, End_Date || null, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: "Project not found" });
    res.json({ success: true, message: "Project updated successfully" });
  } catch (err) {
    console.error("❌ Error updating project:", err);
    res.status(500).json({ error: "Failed to update project" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const [result] = await db.query(`DELETE FROM project WHERE Project_ID = ?`, [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Project not found" });
    res.json({ success: true, message: "Project deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting project:", err);
    res.status(500).json({ error: "Failed to delete project" });
  }
};

// ==================== DONATION RECORDS ====================

exports.getDonations = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT d.Donation_ID AS donationId, d.Donor_ID AS donorId, d.Amount AS amount,
        d.Message AS message, d.Donation_Date AS donationDate, t.transaction_id AS transactionId,
        t.Payment_Mode AS paymentMode, t.Payment_Status AS paymentStatus, t.Payment_Time AS paymentTime,
        p.Project_ID AS projectId, p.Project_title AS projectTitle, p.Category AS category
      FROM donation d
      JOIN project p ON d.Project_ID = p.Project_ID
      JOIN transactions t ON d.transaction_id = t.transaction_id
      ORDER BY d.Donation_Date DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching donations:", err);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};

exports.getProjectTransactions = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT d.Donation_ID, d.Amount, d.Donation_Date, d.Message,
        t.transaction_id, t.Payment_Mode, t.Payment_Status, t.Payment_Time,
        d.Donor_ID, u.User_Fname AS Donor_Name, u.User_Lname AS Donor_LName,
        u.Email_ID AS Donor_Email, u.Phone_no AS Donor_Phone
      FROM donation d
      JOIN transactions t ON d.transaction_id = t.transaction_id
      JOIN user_table u ON d.Donor_ID = u.User_ID
      WHERE d.Project_ID = ?
      ORDER BY d.Donation_Date ASC;
    `, [req.params.id]);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching project transactions:", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// ==================== USER MANAGEMENT ====================

exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query(`
      SELECT u.User_ID, u.User_Fname, u.User_Lname, u.Email_ID, u.Gender, u.Phone_no, u.Address,
        ut.User_Type_name AS User_Type
      FROM User_Table u
      JOIN User_Type_Table ut ON u.User_Type_ID = ut.User_Type_ID
      ORDER BY u.User_ID ASC
    `);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.addAdmin = async (req, res) => {
  try {
    const { fname, lname, gender, phone, email, password, address, role } = req.body;

    if (!fname || !lname || !gender || !phone || !email || !password || !address)
      return res.status(400).json({ error: "All fields are required" });

    const hashed = await bcrypt.hash(password, 10);

    const [userResult] = await db.query(
      `INSERT INTO User_Table (User_Type_ID, User_Fname, User_Lname, Gender, Phone_no, Email_ID, Password, Address, Is_Verified)
       VALUES (3, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [fname, lname, gender, phone, email, hashed, address]
    );

    await db.query(
      `INSERT INTO Admin_Table (Admin_ID, User_ID, Role) VALUES (?, ?, ?)`,
      [userResult.insertId, userResult.insertId, role || "Administrator"]
    );

    res.status(201).json({ message: "Admin added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding admin" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const [user] = await db.query(
      `SELECT u.User_ID, u.User_Fname, u.User_Lname, u.Email_ID, u.Phone_no, u.Gender, u.Address,
        ut.User_Type_name AS User_Type
      FROM User_Table u
      JOIN User_Type_Table ut ON u.User_Type_ID = ut.User_Type_ID
      WHERE u.User_ID = ?`,
      [req.params.id]
    );

    if (!user.length) return res.status(404).json({ error: "User not found" });
    res.json(user[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching user details" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await db.query("DELETE FROM Admin_Table WHERE User_ID = ?", [id]);
    await db.query("DELETE FROM Student_Table WHERE User_ID = ?", [id]);
    await db.query("DELETE FROM Alumni_Table WHERE User_ID = ?", [id]);
    await db.query("DELETE FROM User_Table WHERE User_ID = ?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting user" });
  }
};
