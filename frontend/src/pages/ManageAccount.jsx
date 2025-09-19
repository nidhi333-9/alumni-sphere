import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function ManageAccount() {
  const [profileSettings, setProfileSettings] = useState({
    profilePic: false,
    showBranch: false,
    showBatch: false,
    showLocation: false,
    showWorkplace: false,
    showExperience: false,
  });

  const [profileType, setProfileType] = useState("public");
  const [notification, setNotification] = useState(true);
  const [connectRequests, setConnectRequests] = useState(true);
  const [protection, setProtection] = useState(true);

  // Profile Pic State
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);

  // Profile Name State
  const [userName, setUserName] = useState("Your Name");
  const [isEditingName, setIsEditingName] = useState(false);

  //profile about state
  const [userAbout, setUserAbout] = useState("Your About Details of ");
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  // Load saved profile data from localStorage on mount
  useEffect(() => {
    const savedPic = localStorage.getItem("profilePic");
    const savedName = localStorage.getItem("userName");
    if (savedPic) setProfilePic(savedPic);
    if (savedName) setUserName(savedName);
  }, []);

  const handleProfileChange = (key) => {
    setProfileSettings({ ...profileSettings, [key]: !profileSettings[key] });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameSave = () => {
    setIsEditingName(false);
    localStorage.setItem("userName", userName);
  };
  const handleAboutSave = () => {
    setIsEditingAbout(false);
    localStorage.setItem("userAbout", userName);
  };
  

  return (
    <>
      <Navbar />
      <div className="min-h-screen h-full w-full
       p-20 bg-white flex justify-center items-center mt-6">
        <div className="w-full overflow-hidden sm:max-w-6xl p-8  h-full shadow-lg bg-slate-100 rounded-xl flex">
          {/* Left Side: Account Settings */}
          <div className="flex-1 pr-6 border-r">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Manage Your Account
            </h2>

            {/* Profile Visibility */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Profile Visibility</h3>
              <div className="flex items-center justify-between">
                <span>{profileType === "public" ? "Public" : "Private"}</span>
                <button
                  onClick={() =>
                    setProfileType(profileType === "public" ? "private" : "public")
                  }
                  className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
                    profileType === "public" ? "bg-[#896c6c]" : "bg-gray-400"
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

            {/* Profile Settings */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Profile Settings</h3>
              {Object.entries(profileSettings).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center justify-between mb-2 cursor-pointer"
                >
                  <span className="capitalize">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleProfileChange(key)}
                    className="w-5 h-5 accent-[#896c6c] rounded focus:ring-green-500"
                  />
                </label>
              ))}
            </div>

            {/* Notification Settings */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Notification Settings</h3>
              <label className="flex items-center justify-between cursor-pointer">
                <span>Online notification</span>
                <button
                  onClick={() => setNotification(!notification)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    notification ? "bg-[#896c6c]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      notification ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </label>
            </div>

            {/* Request Settings */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Request Settings</h3>
              <label className="flex items-center justify-between mb-2 cursor-pointer">
                <span>Connect Requests</span>
                <button
                  onClick={() => setConnectRequests(!connectRequests)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    connectRequests ? "bg-[#896c6c]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      connectRequests ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span>Protection for information</span>
                <button
                  onClick={() => setProtection(!protection)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    protection ? "bg-[#896c6c]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      protection ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </label>
            </div>

            {/* Save Button */}
            <button
              className="w-full bg-[#896c6c] text-white py-2 rounded-lg font-medium hover:bg-[#7e5353] transition"
              onClick={() => alert("Settings Saved!")}
            >
              Save
            </button>
          </div>

          {/* Right Side: Profile Update */}
          <div className="w-1/3 flex flex-col items-center pb-8 justify-start pl-6">
            {/* <h3 className="text-lg font-medium mb-4">Profile</h3> */}

            <div className="relative w-32   h-32 rounded-full overflow-hidden border-2 border-white shadow-md mb-4 group">
              <img
                src={profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {/* Edit Icon Overlay */}
              <div
                onClick={handleButtonClick}
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a2.121 2.121 0 113 3l-1.688 1.688M16.862 4.487L7.5 13.85V17h3.15l9.362-9.363M16.862 4.487l2.65 2.65"
                  />
                </svg>
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Name Editing */}
            <div className="mb-4 text-center">
              {isEditingName ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="border rounded px-2 py-1 focus:outline-none"
                  />
                  <button
                    onClick={handleNameSave}
                    className="bg-[#896c6c] text-white px-3 py-1 rounded-lg hover:bg-[#4a3030] transition"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <h4 className="text-lg font-semibold">{userName}</h4>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-[#896c6c] hover:text-[#4a3030] transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a2.121 2.121 0 113 3l-1.688 1.688M16.862 4.487L7.5 13.85V17h3.15l9.362-9.363M16.862 4.487l2.65 2.65"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            {/* About Editing */}
            <div className="mb-4 text-center">
              {isEditingAbout ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={userAbout}
                    onChange={(e) => setUserAbout(e.target.value)}
                    className="border rounded px-2 py-1 focus:outline-none"
                  />
                  <button
                    onClick={handleAboutSave}
                    className="bg-[#896c6c] text-white px-3 py-1 rounded-lg hover:bg-[#4a3030] transition"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <h4 className="text-lg font-semibold">{userAbout}</h4>
                  <button
                    onClick={() => setIsEditingAbout(true)}
                    className="text-[#896c6c] hover:text-[#4a3030] transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a2.121 2.121 0 113 3l-1.688 1.688M16.862 4.487L7.5 13.85V17h3.15l9.362-9.363M16.862 4.487l2.65 2.65"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* <button
              onClick={handleButtonClick}
              className="bg-[#896c6c] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#4a3030] transition"
            >
              Update Profile Picture
            </button> */}
          </div>
        </div>
      </div>
      < Footer />
    </>
  );
 }