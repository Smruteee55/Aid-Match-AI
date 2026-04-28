import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MatchPage from './pages/MatchPage';
import VolunteerDashboard from './pages/VolunteerDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          {/* CORRECTED: The route must be inside the <Routes> component */}
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
          <Route path="/match/:needId/:location/:category" element={<MatchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;