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
          {/* Landing Page / Login */}
          <Route path="/" element={<Login />} />
          
          {/* NGO Admin Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} /> 
          
          {/* Volunteer Dashboard */}
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
          
          {/* Smart Matching Page with URL Parameters */}
          <Route path="/match/:needId/:location/:category" element={<MatchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;