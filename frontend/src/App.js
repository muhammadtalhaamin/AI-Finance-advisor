import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, VStack } from '@chakra-ui/react';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import FinancialSnapshot from './components/FinancialSnapshot';
import Profile from './components/Profile';
import Onboarding from './components/Onboarding';
import { setCredentials } from './store/authSlice';
import FinancialAdvice from './components/FinancialAdvice';
import GoalPlanning from './components/GoalPlanning';
import Chatbot from './components/Chatbot';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (!user.onboardingCompleted) {
    return <Navigate to="/onboarding" />;
  }
  return children;
};

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken && !user) {
      dispatch(setCredentials({ user: JSON.parse(storedUser), token: storedToken }));
    }
  }, [dispatch, user]);

  return (
    <Router>
      <VStack minHeight="100vh">
        <NavBar />
        <Box flex={1} width="100%">
          <Routes>
            <Route path="/" element={user ? <Home /> : <LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/financial-snapshot" element={<ProtectedRoute><FinancialSnapshot /></ProtectedRoute>} />
            <Route path="/financial-advice" element={<ProtectedRoute><FinancialAdvice /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/goals" element={<ProtectedRoute><GoalPlanning /></ProtectedRoute>} />
            <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
          </Routes>
        </Box>
        <Footer />
      </VStack>
    </Router>
  );
}

export default App;