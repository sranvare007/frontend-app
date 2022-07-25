import React from "react";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Info from "../Info/Info";
import Eligible from "../Eligible/Eligible";
import UpcomingDrives from "../UpcomingDrives/UpcomingDrives";
import EmailSendOut from "../EmailSendOut/EmailSendOut";
import AddStudentData from "../Add/Add";
import EditStudentData from "../Edit/Edit";
import Profile from "../Profile/Profile";

function Main() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Info />} />
        <Route path="/info" element={<Info />} />
        <Route path="/eligible" element={<Eligible />} />
        <Route path="/upcoming" element={<UpcomingDrives />} />
        <Route path="/email" element={<EmailSendOut />} />
        <Route path="/add" element={<AddStudentData />} />
        <Route path="/edit/:id" element={<EditStudentData />} />
        <Route path="/info/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default Main;
