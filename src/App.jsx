import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './authContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from './layout/Login';
import Landing from './layout/Landing';
import Signup from './layout/Signup';
import Home from './layout/Home';
import Layout from './layout/Layout';
import CreateTip from './layout/Create-tips';
import Profile from './layout/Profile';
import UserProfile from './layout/UserProfile';
import ExclusiveTipsPage from './layout/ExclusiveTIps';
import Success from './layout/Success';
import Cancel from './layout/Cancel';

function AuthRedirect() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();

  useEffect(() => {
    const userIdStorage = localStorage.getItem("userId");
    if (userIdStorage && !currentUser) {
      setCurrentUser(userIdStorage);
    }
    if (!userIdStorage && !["/login", "/signup", "/"].includes(window.location.pathname)) {
      navigate('/login');
    }
    if (userIdStorage && window.location.pathname === '/login') {
      navigate('/home');
    }
  }, [currentUser, navigate, setCurrentUser]);

  return null;
}

function App() {
  return (
    <Router>
      <AuthRedirect />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="create-tip" element={<CreateTip />} />
          <Route path="profile" element={<Profile />} />
          <Route path="user/:username" element={<UserProfile />} />
          <Route path="profile/:userId" element={<UserProfile />} />
          <Route path="exclusive" element={<ExclusiveTipsPage />} />
          <Route path="payment/success" element={<Success />} />
          <Route path="payment/cancel" element={<Cancel />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
