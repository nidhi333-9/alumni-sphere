import React, { useState } from "react";
import { MessageCircle, Search, X } from "lucide-react";

// ✅ Reusable Card Component
function ConnectionCard({ user, handleChat }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden text-center transform transition duration-300 hover:scale-105 hover:shadow-amber-300 hover:shadow-2xl">
      {/* Cover + Avatar */}
      <div className="relative">
        <div className="h-28 w-full">
          <img src={user.cover} alt="cover" className="h-full w-full object-cover" />
        </div>

        {/* Avatar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
            />
            <span
              className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${
                user.status === "online" ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 mt-12">
        <h2 className="text-xl font-semibold text-amber-900">{user.name}</h2>
        <p className="text-sm text-gray-600">{user.role}</p>
        <p className="text-xs text-gray-500 mt-1">{user.location}</p>

        {/* Chat Button */}
        <button
          onClick={() => handleChat(user)}
          className="mt-5 flex items-center justify-center gap-2 w-full py-2 rounded-full bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition"
        >
          <MessageCircle size={18} />
          Chat Now
        </button>
      </div>
    </div>
  );
}

// ✅ Chat Window Component
function ChatWindow({ user, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white border border-gray-300 rounded-2xl shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-2xl">
        <h2 className="font-semibold">{user.name}</h2>
        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto max-h-64 text-sm">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <span className="font-semibold">{msg.sender}: </span>
              <span>{msg.text}</span>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="flex items-center p-3 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-full px-3 py-1 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default function Connections() {
  
  const connections = [
    {
      id: 1,
      name: "Arjun Mehta",
      role: "Software Engineer",
      location: "Bangalore, India",
      avatar: "https://i.ibb.co/HHXfN8P/male-avatar.png",
      cover: "https://picsum.photos/400/150?random=1",
      status: "online",
    },
    {
      id: 2,
      name: "Ravi Sharma",
      role: "Entrepreneur",
      location: "Delhi, India",
      avatar: "https://i.ibb.co/HHXfN8P/male-avatar.png",
      cover: "https://picsum.photos/400/150?random=2",
      status: "offline",
    },
    {
      id: 3,
      name: "Karan Patel",
      role: "Data Scientist",
      location: "Mumbai, India",
      avatar: "https://i.ibb.co/HHXfN8P/male-avatar.png",
      cover: "https://picsum.photos/400/150?random=3",
      status: "online",
    },
    {
      id: 4,
      name: "Priya Nair",
      role: "Research Scholar",
      location: "Kochi, India",
      avatar: "https://i.ibb.co/HHXfN8P/male-avatar.png",
      cover: "https://picsum.photos/400/150?random=4",
      status: "offline",
    },
    {
      id: 5,
      name: "Abhishek Kumar",
      role: "Data Scientist",
      location: "Hyderabad, India",
      avatar: "https://i.ibb.co/HHXfN8P/male-avatar.png",
      cover: "https://picsum.photos/400/150?random=5",
      status: "online",
    },
    {
      id: 6,
      name: "Neha Gupta",
      role: "Product Manager",
      location: "Gurgaon, India",
      avatar: "https://i.ibb.co/HHXfN8P/male-avatar.png",
      cover: "https://picsum.photos/400/150?random=6",
      status: "online",
    },
  ];


  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [chatUser, setChatUser] = useState(null);

  const handleChat = (user) => {
    setChatUser(user);
  };

  const filteredConnections = connections.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase()) ||
      user.location.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || user.role.toLowerCase().includes(filter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-white to-amber-100 py-12 px-6 mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-amber-900 text-center mb-4">
          Your Alumni Connections
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Build meaningful professional and personal connections with your alumni network.
        </p>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <div className="relative w-full sm:w-2/3 lg:w-1/2">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search connections by name, role, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-full shadow-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="sm:w-48 w-full border border-amber-200 rounded-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-sm"
          >
            <option value="all">All Roles</option>
            <option value="software">Software Engineer</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="data">Data Scientist</option>
            <option value="research">Research Scholar</option>
          </select>
        </div>

        {/* Connections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredConnections.map((user) => (
            <ConnectionCard key={user.id} user={user} handleChat={handleChat} />
          ))}

          {filteredConnections.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No connections found.
            </p>
          )}
        </div>
      </div>

      {/* Chat Window */}
      {chatUser && <ChatWindow user={chatUser} onClose={() => setChatUser(null)} />}
    </section>
  );
}
