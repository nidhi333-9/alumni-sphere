import React, { useState, useEffect } from "react";

export default function PostForm() {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState(null);
  const [user, setUser] = useState({}); 

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data); 
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };
    fetchUser();
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const formData = new FormData();
    formData.append("content", content);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:5000/feeds", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Post shared successfully!");
        setContent("");
        setImageFile(null);
        setPreview("");
      } else {
        setStatus("❌ Failed to share post.");
      }
    } catch (err) {
      console.error("Error posting content:", err);
      setStatus("⚠️ Something went wrong.");
    }
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-6 mt-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-blue-100">
        <h1 className="text-3xl font-bold text-blue-800 mb-2 text-center">
          Create a Post
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Share your achievements, memories, or updates with fellow alumni.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Row */}
          <div className="flex items-center gap-4">
            <img
              src={user.profilePic || "/dp-male.png"}
              alt={user.firstName || "User"}
              className="w-12 h-12 rounded-full border border-blue-300 object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </h3>
              {user.graduationYear && user.course && (
                <p className="text-sm text-gray-500">
                  Class of {user.graduationYear} · {user.course}
                </p>
              )}
            </div>
          </div>

          {/* Post Content */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Post Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows="5"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-gray-700 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm resize-none"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Attach Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
            />
            {preview && (
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-64 object-cover"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setContent("");
                setImageFile(null);
                setPreview("");
                setStatus(null);
              }}
              className="px-5 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Post
            </button>
          </div>
        </form>

        {/* Status Message */}
        {status && (
          <p className="mt-6 text-center text-sm font-medium text-gray-700">
            {status}
          </p>
        )}
      </div>
    </section>
  );
}
