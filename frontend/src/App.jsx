import Navbar from "./component/Navbar";
import Directory from "./pages/Directory";
import Homepage from "./pages/Homepage";
import Signup from "./pages/signup";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/directory" element={<Directory />} />
        </Routes>
      </BrowserRouter>
      {/* <Signup /> */}
      {/* <Homepage /> */}
      {/* <Directory /> */}
    </>
  );
}

export default App;
