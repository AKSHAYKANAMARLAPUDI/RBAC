import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserManagement from "./components/UserManagement.jsx";
import RoleManagement from "./components/RoleManagement.jsx";
import PermissionMatrix from "./components/PermissionMatrix.jsx";

const App = () => (
  <Router>
    <div>
      <nav>
        <Link to="/users">User Management</Link> | 
        <Link to="/roles">Role Management</Link> | 
        <Link to="/permissions">Permission Matrix</Link>
      </nav>
      <Routes>
        <Route path="/users" element={<UserManagement />} />
        <Route path="/roles" element={<RoleManagement />} />
        <Route path="/permissions" element={<PermissionMatrix />} />
      </Routes>
    </div>
  </Router>
);

export default App;
