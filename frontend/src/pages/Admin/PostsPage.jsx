import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import jsPDF from "jspdf";
import maledp from "../../assets/dp-male.png";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
        const res = await fetch(`${API_BASE_URL}/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log("Fetched posts:", data);
        setPosts(
          data.map((p) => ({
            id: p.Post_ID,
            author: `${p.User_Fname} ${p.User_Lname}`,
            userImage: p.User_Image,
            department: p.Department,
            course: p.Course,
            graduationYear: p.Graduation_Year,
            content: p.Content,
            image: p.Image_URL,
            likes: p.Likes_Count,
            comments: p.Comment_Count,
            createdAt: new Date(p.Created_At).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }),
          }))
        );
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

      const res = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        setMessageType("error");
        setMessage(data.message || "❌ Failed to delete post.");
        return;
      }

      setPosts((prev) => prev.filter((p) => p.id !== postId));

      setMessageType("success");
      setMessage("🗑️ Post deleted successfully!");
    } catch (err) {
      console.error("Delete Post Error:", err);
      setMessageType("error");
      setMessage("❌ Server error while deleting post.");
    }
  };


  const handleDownloadReport = (post) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("📄 Post Summary Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Author: ${post.author}`, 14, 35);
    doc.text(`Department: ${post.department}`, 14, 42);
    doc.text(`Course: ${post.course}`, 14, 49);
    doc.text(`Graduation Year: ${post.graduationYear}`, 14, 56);
    doc.text(`Likes: ${post.likes}`, 14, 63);
    doc.text(`Comments: ${post.comments}`, 14, 70);
    doc.text(`Created On: ${post.createdAt}`, 14, 77);
    doc.text("Content:", 14, 85);
    doc.text(post.content || "No content available", 14, 93, { maxWidth: 180 });
    doc.save(`${post.author}_Post_Report.pdf`);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {message && (
        <div
          className={`fixed top-6 right-6 z-50 rounded-xl shadow-lg px-6 py-4 text-white font-medium transition-all duration-500 ${messageType === "success" ? "bg-green-600" : "bg-red-600"
            }`}
        >
          {message}
        </div>
      )}

      <Card className="max-w-6xl mx-auto shadow-lg">
        <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            📰 Manage Posts
          </CardTitle>
          <Input
            placeholder="Search by author, department, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-72"
          />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredPosts.length ? (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={post.userImage || maledp}
                          alt={post.author}
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{post.author}</div>
                          <div className="text-xs text-gray-500">{post.graduationYear}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{post.department}</TableCell>
                    <TableCell>{post.course}</TableCell>
                    <TableCell className="max-w-sm truncate">{post.content}</TableCell>
                    <TableCell>{post.likes}</TableCell>
                    <TableCell>{post.comments}</TableCell>
                    <TableCell>{post.createdAt}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => { setSelectedPost(post); setShowViewDialog(true); }}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setPostToDelete(post);
                            setShowDeleteDialog(true);
                          }}
                        >
                          Delete
                        </Button>

                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="8" className="text-center text-gray-500">
                    No posts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              handleDeletePost(postToDelete.id);
              setShowDeleteDialog(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>


      {/* 🔹 View Post Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogHeader>
          <DialogTitle>{selectedPost?.author}'s Post</DialogTitle>
          <DialogDescription>Post Details</DialogDescription>
        </DialogHeader>
        <DialogContent>
          {selectedPost && (
            <div className="space-y-3 text-gray-700">
              <p><strong>Author:</strong> {selectedPost.author}</p>
              <p><strong>Department:</strong> {selectedPost.department}</p>
              <p><strong>Course:</strong> {selectedPost.course}</p>
              <p><strong>Graduation Year:</strong> {selectedPost.graduationYear}</p>
              <p><strong>Created At:</strong> {selectedPost.createdAt}</p>
              <p><strong>Likes:</strong> {selectedPost.likes}</p>
              <p><strong>Comments:</strong> {selectedPost.comments}</p>
              <p><strong>Content:</strong></p>
              <p className="whitespace-pre-line">{selectedPost.content}</p>
              {selectedPost.image && (
                <img src={selectedPost.image} alt="Post" className="rounded-lg mt-3" />
              )}
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => handleDownloadReport(selectedPost)}
          >
            📄 Download PDF
          </Button>
          <Button variant="outline" onClick={() => setShowViewDialog(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
