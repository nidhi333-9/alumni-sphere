// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Import pages
import Loader from "./pages/Loader";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import ManageAccount from "./pages/ManageAccount";
import Directory from "./pages/Directory";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import ConnectionPage from "./pages/ConnectionPage";
import DonationPage from "./pages/DonationPage";
import AlumniProfile from "./component/AlumniProfile"; // ✅ fixed
import RegisterPage from "./pages/RegisterPage";
import NewsDeatils from "./pages/NewsDetails";
import Events from "./pages/Events";
import JobsPage from "./pages/JobsPage";
// Import Layout wrapper
import Layout from "./component/Layout"; // ✅ fixed

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages without Layout */}
        <Route path="/" element={<Loader />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/* Pages with Layout */}
        <Route path="/homepage" element={<Layout><Homepage /></Layout>} />
        <Route path="/manage-account" element={<Layout><ManageAccount /></Layout>} />
        <Route path="/directory" element={<Layout><Directory /></Layout>} />
        <Route path="/feed" element={<Layout><Feed /></Layout>} />
        <Route path="/create-post" element={<Layout><CreatePost /></Layout>} />
        <Route path="/connections" element={<Layout><ConnectionPage /></Layout>} />
        <Route path="/donations" element={<Layout><DonationPage /></Layout>} />
        <Route path="/alumni/:id" element={<Layout><AlumniProfile /></Layout>} />
        <Route path="/register" element={<Layout><RegisterPage /></Layout>} />

        <Route path="/all-news" element={<NewsDeatils />} />
        <Route path="/events" element={<Events />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Routes>
    </Router>
  );
}

export default App; // ✅ don’t forget export
