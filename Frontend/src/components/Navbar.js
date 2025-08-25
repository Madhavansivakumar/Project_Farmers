import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{
            background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
            color: '#fff',
            padding: '1rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            animation: 'fadeIn 1s ease-in-out'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem', animation: 'slideDown 1s ease-in-out' }}>
                <h1 style={{
                    margin: '0',
                    fontFamily: 'Arial, sans-serif',
                    letterSpacing: '1.5px',
                    fontSize: '2rem',
                    color: '#FFD700',
                    animation: 'pulse 2s infinite'
                }}>FARMERS</h1>
                <p style={{
                    margin: '0',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '1.1rem',
                    color: '#FFA500',
                    animation: 'fadeIn 1.5s ease-in-out'
                }}>Farmers Agricultural Rate Monitoring and Enhanced Reporting Software</p>
            </div>
            <ul style={{
                listStyle: 'none',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'slideUp 1s ease-in-out'
            }}>
                <li style={{ marginRight: '1rem', fontFamily: 'Arial, sans-serif', animation: 'bounceIn 1s ease-in-out' }}>
                    <Link to="/" style={{
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s',
                        animation: 'fadeIn 1s ease-in-out'
                    }} onMouseEnter={e => e.target.style.backgroundColor = '#5a79ba'} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>Home</Link>
                </li>
                <li style={{ marginRight: '1rem', fontFamily: 'Arial, sans-serif', animation: 'bounceIn 1s ease-in-out' }}>
                    <Link to="/register" style={{
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s',
                        animation: 'fadeIn 1s ease-in-out'
                    }} onMouseEnter={e => e.target.style.backgroundColor = '#5a79ba'} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>Register</Link>
                </li>
                <li style={{ marginRight: '1rem', fontFamily: 'Arial, sans-serif', animation: 'bounceIn 1s ease-in-out' }}>
                    <Link to="/login" style={{
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s',
                        animation: 'fadeIn 1s ease-in-out'
                    }} onMouseEnter={e => e.target.style.backgroundColor = '#5a79ba'} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>Login</Link>
                </li>
                <li style={{ marginRight: '1rem', fontFamily: 'Arial, sans-serif', animation: 'bounceIn 1s ease-in-out' }}>
                    <Link to="/profile" style={{
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s',
                        animation: 'fadeIn 1s ease-in-out'
                    }} onMouseEnter={e => e.target.style.backgroundColor = '#5a79ba'} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>Profile</Link>
                </li>
                <li style={{ marginRight: '1rem', fontFamily: 'Arial, sans-serif', animation: 'bounceIn 1s ease-in-out' }}>
                    <Link to="/products" style={{
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s',
                        animation: 'fadeIn 1s ease-in-out'
                    }} onMouseEnter={e => e.target.style.backgroundColor = '#5a79ba'} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>Product Listings</Link>
                </li>
                <li style={{ marginRight: '1rem', fontFamily: 'Arial, sans-serif', animation: 'bounceIn 1s ease-in-out' }}>
                    <Link to="/demands" style={{
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s',
                        animation: 'fadeIn 1s ease-in-out'
                    }} onMouseEnter={e => e.target.style.backgroundColor = '#5a79ba'} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>Demand Postings</Link>
                </li>
                <li style={{ marginRight: '1rem', fontFamily: 'Arial, sans-serif', animation: 'bounceIn 1s ease-in-out' }}>
                    <Link to="/listings" style={{
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s',
                        animation: 'fadeIn 1s ease-in-out'
                    }} onMouseEnter={e => e.target.style.backgroundColor = '#5a79ba'} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>Unified Listings</Link>
                </li>
                <li style={{ marginRight: '1rem', fontFamily: 'Arial, sans-serif', animation: 'bounceIn 1s ease-in-out' }}>
                    <Link to="/notifications" style={{
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s',
                        animation: 'fadeIn 1s ease-in-out'
                    }} onMouseEnter={e => e.target.style.backgroundColor = '#5a79ba'} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>Notifications</Link>
                </li>
                <li style={{ marginRight: '1rem', fontFamily: 'Arial, sans-serif', animation: 'bounceIn 1s ease-in-out' }}>
                    <Link to="/reports" style={{
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s',
                        animation: 'fadeIn 1s ease-in-out'
                    }} onMouseEnter={e => e.target.style.backgroundColor = '#5a79ba'} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>Reports</Link>
                </li>
            </ul>
            <style>
                {`
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }

                @keyframes slideDown {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(0); }
                }

                @keyframes slideUp {
                    0% { transform: translateY(100%); }
                    100% { transform: translateY(0); }
                }

                @keyframes bounceIn {
                    0% { transform: scale(0.8); opacity: 0; }
                    50% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); }
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                `}
            </style>
        </nav>
    );
};

export default Navbar;
