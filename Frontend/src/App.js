import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import RegisterWrapper from './components/RegisterWrapper.js'; // Import the new wrapper component
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import ProductList from './components/ProductList.js';
import DemandList from './components/DemandList.js';
import UnifiedListings from './components/UnifiedListings.js';
import Notification from './components/Notification.js';
import Report from './components/Report.js';
import setAuthToken from './utils/setAuthToken.js';
import HomePage from './HomePage'; // Import the new HomePage component

const App = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
        }
    }, []);

    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterWrapper />} /> {/* Use the wrapper component */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/demands" element={<DemandList />} />
                    <Route path="/listings" element={<UnifiedListings />} />
                    <Route path="/notifications" element={<Notification />} />
                    <Route path="/reports" element={<Report />} />
                </Routes>
            </div>
            <style>
                {`
                .app-container {
                    font-family: 'Arial, sans-serif';
                    padding: 2rem;
                    animation: bgFadeIn 2s ease-in-out;
                    background-color: #32cd32;
                }

                @keyframes bgFadeIn {
                    0% { background-color: #fff; }
                    100% { background-color: #32cd32; }
                }
                `}
            </style>
        </Router>
    );
}

export default App;
