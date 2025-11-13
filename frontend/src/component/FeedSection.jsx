import React, { useEffect, useState } from "react";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";

export default function FeedSection() {
  const [posts, setPosts] = useState([]);
  const [openComments, setOpenComments] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});

  const token = localStorage.getItem("token");
  const BASE_URL = "http://localhost:5000"; 

 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const postsWithPics = data.map((p) => ({
          ...p,
          User_Image: p.User_Image ? `${BASE_URL}${p.User_Image}` : "/dp-male.png",
        }));
        setPosts(postsWithPics);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, [token]);

  
  const toggleComments = async (postId) => {
    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));

    if (!openComments[postId]) {
      try {
        const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const commentsWithPics = data.map((c) => ({
          ...c,
          User_Image: c.User_Image ? `${BASE_URL}${c.User_Image}` : "/dp-male.png",
        }));

        setComments((prev) => ({ ...prev, [postId]: commentsWithPics }));
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    }
  };

  const handleLike = async (postId) => {
    try {
      await fetch(`${BASE_URL}/posts/${postId}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts((prev) =>
        prev.map((p) =>
          p.Post_ID === postId ? { ...p, Likes_Count: (p.Likes_Count || 0) + 1 } : p
        )
      );
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

 
  const handleAddComment = async (postId, e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!newComment[postId]?.trim()) return;

    try {
      const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ commentText: newComment[postId] }),
      });

      const data = await res.json();
      if (data.success) {
        const commentWithPic = {
          ...data.comment,
          User_Image: data.comment.User_Image
            ? `${BASE_URL}${data.comment.User_Image}`
            : "/dp-male.png",
        };

        setComments((prev) => ({
          ...prev,
          [postId]: [...(prev[postId] || []), commentWithPic],
        }));

        setNewComment((prev) => ({ ...prev, [postId]: "" }));

        setPosts((prev) =>
          prev.map((p) =>
            p.Post_ID === postId
              ? { ...p, Comment_Count: (p.Comment_Count || 0) + 1 }
              : p
          )
        );
      }
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-4 mt-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
            Alumni Connect
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Stay connected, share your journey, and celebrate alumni stories.
          </p>
        </header>

        {posts.map((post) => (
          <div
            key={post.Post_ID}
            className="bg-white/90 backdrop-blur rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={post.User_Image}
                alt={post.User_Fname}
                className="w-12 h-12 rounded-full object-cover border border-blue-200"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {post.User_Fname} {post.User_Lname}
                </h3>
                <p className="text-sm text-blue-600 font-medium">
                  Class of {post.Graduation_Year} · {post.Course}
                </p>
                <span className="text-xs text-gray-400">
                  {new Date(post.Created_At).toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-gray-700 mb-3 leading-relaxed">{post.Content}</p>
            {post.Image_URL?.trim() && (
  <img
    src={post.Image_URL}
    alt="post content"
    className="w-full rounded-xl mb-4 shadow-sm"
  />
)}


            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                {post.Likes_Count || 0} Likes
              </span>
              
            </div>

            <div className="flex justify-around border-t border-gray-100 pt-3">
              <button
                type="button"
                onClick={() => handleLike(post.Post_ID)}
                className="flex items-center gap-2 px-3 py-1 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition"
              >
                <ThumbsUp size={18} /> Like
              </button>
              <button
                type="button"
                onClick={() => toggleComments(post.Post_ID)}
                className="flex items-center gap-2 px-3 py-1 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition"
              >
                <MessageCircle size={18} /> Comment
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition"
              >
                <Share2 size={18} /> Share
              </button>
            </div>

            {openComments[post.Post_ID] && (
              <div className="mt-4 border-t border-gray-100 pt-3 space-y-3">
                {(comments[post.Post_ID] || []).map((c) => (
                  <div key={c.Comment_ID} className="flex items-start gap-3">
                    <img
                      src={c.User_Image}
                      alt={c.User_Fname}
                      className="w-8 h-8 rounded-full border border-blue-200"
                    />
                    <div className="bg-blue-50 rounded-xl px-3 py-2 shadow-sm">
                      <p className="text-sm font-semibold text-blue-800">
                        {c.User_Fname} {c.User_Lname}
                      </p>
                      <p className="text-sm text-gray-700">{c.Comment}</p>
                      <span className="text-xs text-gray-400 block mt-1">
                        {new Date(c.Comment_Date).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-3 mt-2">
                  <img
                    src="/dp-male.png"
                    alt="me"
                    className="w-8 h-8 rounded-full border border-blue-200"
                  />
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={newComment[post.Post_ID] || ""}
                    onChange={(e) =>
                      setNewComment((prev) => ({
                        ...prev,
                        [post.Post_ID]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddComment(post.Post_ID, e);
                    }}
                    className="flex-1 bg-white border border-blue-100 rounded-full px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    onClick={(e) => handleAddComment(post.Post_ID, e)}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
