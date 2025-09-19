import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
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
import AlumniProfile from "./component/AlumniProfile"; // ✅ import profile page
import RegisterPage from "./pages/RegisterPage";
import Events from "./pages/Events";
import EventsDetails from "./pages/EventsDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loader />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/manage-account" element={<ManageAccount />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/connections" element={<ConnectionPage />} />
        <Route path="/donations" element={<DonationPage />} />
        
        {/* ✅ Add dynamic route for individual alumni */}
        <Route path="/alumni/:id" element={<AlumniProfile />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/eventsDetails/:id" element={<EventsDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;
