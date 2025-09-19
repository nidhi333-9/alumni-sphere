import React from "react";
import { Facebook, Instagram, Twitter, Github, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-amber-100 via-white to-amber-100 text-gray-800 py-10 mt-12 border-t border-amber-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-amber-900">Alumni Connect</h3>
          <p className="text-sm text-gray-700">
            A platform to connect students and alumni of MANIT. Stay in touch, 
            explore opportunities, and give back to your community.
          </p>
        </div>

        {/* Menu */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-amber-900">Menu</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-amber-600">Alumni Directory</a></li>
            <li><a href="#" className="hover:text-amber-600">My Connections</a></li>
            <li><a href="#" className="hover:text-amber-600">Feed</a></li>
            <li><a href="#" className="hover:text-amber-600">Jobs</a></li>
            <li><a href="#" className="hover:text-amber-600">Donate</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-amber-900">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-amber-600">MANIT</a></li>
            <li><a href="#" className="hover:text-amber-600">Vision</a></li>
            <li><a href="#" className="hover:text-amber-600">About Us</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-amber-900">Stay Connected</h3>
          <p className="text-sm text-gray-700 mb-3">
            Subscribe to get the latest updates from alumni and students.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900 border border-amber-300 focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-amber-200 pt-6 flex flex-col md:flex-row items-center justify-between px-6">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Alumni Connect, MANIT. All rights reserved.
        </p>
        <div className="flex space-x-5 mt-4 md:mt-0">
          <a href="#" className="hover:text-amber-600"><Facebook className="w-5 h-5" /></a>
          <a href="#" className="hover:text-amber-600"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="hover:text-amber-600"><Twitter className="w-5 h-5" /></a>
          <a href="#" className="hover:text-amber-600"><Github className="w-5 h-5" /></a>
          <a href="#" className="hover:text-amber-600"><Youtube className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
}
