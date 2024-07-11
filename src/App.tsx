import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import ProtectedPage from './Pages/Dashboard/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App h-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/protected"
              element={<ProtectedRoute element={<ProtectedPage />} />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
