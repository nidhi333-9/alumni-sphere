import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function ManageAccount() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
    branch: "",
    graduationYear: "",
    about: "",
    profilePic: "",
  });

  const [loading, setLoading] = useState(true);
  const [profileType, setProfileType] = useState("public");
  const [profileSettings, setProfileSettings] = useState({
    showBranch: true,
    showBatch: true,
    showLocation: true,
    showWorkplace: true,
    showExperience: true,
  });
  const [notification, setNotification] = useState(true);
  const [connectRequests, setConnectRequests] = useState(true);
  const [protection, setProtection] = useState(true);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [toast, setToast] = useState(null); 

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          navigate("/signin");
          return;
        }

        const data = await res.json();
        setUser({
          id: data.id,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          department: data.department || "",
          branch: data.course || "",
          graduationYear: data.graduationYear || "",
          about: data.about || "",
          profilePic: data.profilePic || "",
        });
      } catch (err) {
        console.error("Error loading profile:", err);
        showToast("Failed to load profile", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle toggles
  const handleProfileChange = (key) => {
    setProfileSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Upload profile picture
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/user/upload-pic", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUser((prev) => ({
          ...prev,
          profilePic: `http://localhost:5000${data.imagePath}`,
        }));
        showToast("Profile picture updated!", "success");
      } else {
        showToast(data.error || "Failed to upload profile picture", "error");
      }
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      showToast("Error uploading profile picture", "error");
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/user/update-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profileType,
          profileSettings,
          notification,
          connectRequests,
          protection,
          about: user.about,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast("Settings saved successfully!", "success");
      } else {
        showToast(data.error || "Failed to save settings", "error");
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      showToast("Failed to save settings", "error");
    }
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      showToast("New passwords do not match!", "error");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast("Password updated successfully!", "success");
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setShowPasswordFields(false);
      } else {
        showToast(data.error || "Password change failed", "error");
      }
    } catch (err) {
      console.error("Error changing password:", err);
      showToast("Password change failed", "error");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center text-lg">
        Loading profile...
      </div>
    );

  return (
    <>
      <Navbar />

      {toast && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-md text-white z-50 transition-all duration-300 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6 mt-10">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10 flex flex-col md:flex-row gap-10">
          <div className="flex-1 border-r pr-8">
            <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">
              Account Settings
            </h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Profile Visibility</h3>
              <div className="flex items-center justify-between">
                <span>{profileType === "public" ? "Public" : "Private"}</span>
                <button
                  onClick={() =>
                    setProfileType(profileType === "public" ? "private" : "public")
                  }
                  className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
                    profileType === "public" ? "bg-amber-600" : "bg-gray-400"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      profileType === "public" ? "translate-x-7" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Profile Settings</h3>
              {Object.entries(profileSettings).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center justify-between mb-2 cursor-pointer"
                >
                  <span className="capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleProfileChange(key)}
                    className="w-5 h-5 accent-amber-600"
                  />
                </label>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Notification Settings</h3>
              <div className="flex items-center justify-between mb-3">
                <span>Online Notification</span>
                <input
                  type="checkbox"
                  checked={notification}
                  onChange={() => setNotification(!notification)}
                  className="w-5 h-5 accent-amber-600"
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Privacy Settings</h3>
              <div className="space-y-2">
                <label className="flex justify-between items-center">
                  <span>Connect Requests</span>
                  <input
                    type="checkbox"
                    checked={connectRequests}
                    onChange={() => setConnectRequests(!connectRequests)}
                    className="w-5 h-5 accent-amber-600"
                  />
                </label>
                <label className="flex justify-between items-center">
                  <span>Information Protection</span>
                  <input
                    type="checkbox"
                    checked={protection}
                    onChange={() => setProtection(!protection)}
                    className="w-5 h-5 accent-amber-600"
                  />
                </label>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-amber-600 text-white py-2 rounded-full font-medium shadow-md hover:bg-amber-700 transition"
            >
              Save Changes
            </button>
          </div>

          <div className="flex flex-col items-center justify-start flex-1 space-y-6">
            <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-md">
              <img
                src={user.profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-1 right-15  bg-amber-600 text-white rounded-full p-1 shadow-md hover:bg-amber-700 transition"
              >
                ✎
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <p className="text text-smbold">Department: {user.department}</p>
            <p className="text text-smbold">Branch: {user.branch}</p>
            <p className="text text-smbold">
              Graduation Year: {user.graduationYear}
            </p>

            <textarea
              value={user.about}
              onChange={(e) => setUser({ ...user, about: e.target.value })}
              placeholder="Write about yourself..."
              className="w-full border rounded-md p-2 text-sm"
              rows="3"
            />

            <div className="w-full border-t pt-4">
              {!showPasswordFields && (
                <button
                  onClick={() => setShowPasswordFields(true)}
                  className="w-full bg-amber-600 text-white py-2 rounded-full font-medium shadow-md hover:bg-amber-700 transition"
                >
                  Change Password
                </button>
              )}

              {showPasswordFields && (
                <div className="space-y-2 mt-2">
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={passwords.currentPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full border rounded-md p-2"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full border rounded-md p-2"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={passwords.confirmPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full border rounded-md p-2"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleChangePassword}
                      className="flex-1 bg-amber-600 text-white py-2 rounded-full font-medium shadow-md hover:bg-amber-700 transition"
                    >
                      Update Password
                    </button>
                    <button
                      onClick={() => setShowPasswordFields(false)}
                      className="flex-1 bg-gray-400 text-white py-2 rounded-full font-medium shadow-md hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
