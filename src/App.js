import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ContributorDashboard from "./pages/ContributorDashboard";
import AddUserComponent from "./pages/AddUserComponent";
import CommitteeListComponent from "./pages/CommitteeListComponent";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard/" element={<Dashboard />} />
         <Route path="/contributor-dashboard/*" element={<ContributorDashboard />} />
        <Route path="/Dashboard/add-user" element={<AddUserComponent />} />
        <Route path="/Dashboard/committees" element={<CommitteeListComponent />} />
      
      </Routes>
    </Router>
  );
}

export default App;
