import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from './Homepage';
import ChatInterface from './ChatInterface';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle user login
  const handleLogin = () => {
    // Perform authentication logic here
    setIsAuthenticated(true);
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Perform logout logic here
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        {/* Add your common layout or navigation components here */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<ChatInterface />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
