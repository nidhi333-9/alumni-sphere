import React, { useState } from "react";
import image from "../Images/logo.png";
import {
  User,
  Bell,
  BookOpen,
  Users,
  Rss,
  Briefcase,
  HeartHandshake,
  Home,
  ChevronDown,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showFeedDropdown, setShowFeedDropdown] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 font-semibold transition ${
      isActive
        ? "text-amber-600" // active page
        : "text-gray-700 hover:text-amber-600"
    }`;

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 w-full z-50 shadow-sm">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-8xl items-center justify-between p-2 lg:px-8"
      >
        {/* 🏠 Home + Logo */}
        <div className="flex items-center gap-4">
          <NavLink to="/homepage" className={linkClass}>
            <Home className="h-6 w-6" />
          </NavLink>
          <img src={image} alt="Logo" className="h-12 w-auto" />
        </div>

        {/* 🌐 Navigation Links */}
        <div className="hidden lg:flex lg:gap-x-6 items-center">
          <NavLink to="/directory" className={linkClass}>
            <BookOpen className="h-5 w-5" />
            Alumni Directory
          </NavLink>

          <NavLink to="/connections" className={linkClass}>
            <Users className="h-5 w-5" />
            My Connections
          </NavLink>

          {/* Feed Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFeedDropdown(!showFeedDropdown)}
              className="flex items-center gap-2 font-semibold text-gray-700 hover:text-amber-600 transition"
            >
              <Rss className="h-5 w-5" />
              Feed
              <ChevronDown className="h-4 w-4" />
            </button>

            {showFeedDropdown && (
              <div className="absolute top-10 left-0 w-40 bg-white shadow-lg rounded-lg p-2 z-50 border border-gray-200">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <NavLink
                      to="/feed"
                      className="block px-3 py-2 hover:bg-amber-50 rounded-md"
                      onClick={() => setShowFeedDropdown(false)}
                    >
                      📜 View All Feed
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/create-post"
                      className="block px-3 py-2 hover:bg-amber-50 rounded-md"
                      onClick={() => setShowFeedDropdown(false)}
                    >
                      ✍️ Post Content
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <NavLink to="/jobs" className={linkClass}>
            <Briefcase className="h-5 w-5" />
            Jobs
          </NavLink>

          <NavLink to="/donations" className={linkClass}>
            <HeartHandshake className="h-5 w-5" />
            Donate
          </NavLink>
        </div>

        {/* 🔔 Notifications + 👤 Profile */}
        <div className="hidden lg:flex items-center gap-4 relative">
          {/* Notifications */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="flex items-center gap-2 hover:bg-amber-50 p-2 rounded-full transition"
          >
            <Bell className="h-6 w-6 text-gray-700 hover:text-amber-600" />
          </button>

          {showNotifications && (
            <div className="absolute top-14 right-16 w-80 bg-white shadow-lg rounded-lg p-4 z-50 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Notifications
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="border-b pb-2">🎉 New event this weekend!</li>
                <li className="border-b pb-2">
                  👤 John Doe sent you a request.
                </li>
                <li className="border-b pb-2">📰 New article in your feed.</li>
                <li className="border-b pb-2">💼 New job posting available.</li>
                <li className="border-b pb-2">
                  📅 Reminder: Alumni meetup tomorrow.
                </li>
                <li className="border-b pb-2">
                  🔔 Your profile was viewed 5 times this week.
                </li>
                <li className="border-b pb-2">✉️ You have 3 new messages.</li>
                <li className="border-b pb-2">
                  ⭐ You received a new endorsement.
                </li>
                <li className="border-b pb-2">
                  📢 Announcement: New features added!
                </li>
                <li className="text-amber-600 cursor-pointer font-medium">
                  View more →
                </li>
              </ul>
            </div>
          )}

          {/* Profile */}
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 hover:bg-amber-50 p-2 rounded-full transition"
          >
            <User className="h-7 w-7 text-gray-700 hover:text-amber-600" />
          </button>

          {showProfileMenu && (
            <div className="absolute top-14 right-0 w-48 bg-white shadow-lg rounded-lg p-4 z-50 border border-gray-200">
              <ul className="space-y-2 text-gray-700">
                <li>
                  <NavLink
                    to="/manage-account"
                    onClick={() => setShowProfileMenu(false)}
                    className="block cursor-pointer hover:text-amber-600"
                  >
                    👤 Profile Setting
                  </NavLink>
                </li>
                <li className="cursor-pointer hover:text-amber-600">🚪 Logout</li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
