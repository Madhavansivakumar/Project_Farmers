import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditProfile from './EditProfile.js';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                setError('Token not found');
                return;
            }

            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const res = await axios.get('http://localhost:5000/api/profile');
                setProfile(res.data);
            } catch (err) {
                console.error('Error fetching profile:', err.response ? err.response.data : err.message);
                setError('Error fetching profile');
            }
        };

        fetchProfile();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async (updatedProfile) => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const res = await axios.put('http://localhost:5000/api/profile/me', updatedProfile);
                setProfile(res.data);
                setIsEditing(false);
            } catch (err) {
                console.error(err.response ? err.response.data : err.message);
            }
        }
    };

    if (!profile) {
        return <div style={{ textAlign: 'center', padding: '2rem', color: '#fff', backgroundColor: '#2e7d32' }}>{error || 'Loading...'}</div>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '10px', background: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', animation: 'fadeIn 1s ease-in-out' }}>
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                button {
                    background-color: #4caf50;
                    color: #fff;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    font-family: Arial, sans-serif;
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                }

                button:hover {
                    background-color: #45a049;
                }
                `}
            </style>
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem', fontFamily: 'Arial, sans-serif', letterSpacing: '1.5px' }}>Profile</h1>
            <p style={{ color: '#333', fontFamily: 'Arial, sans-serif', marginBottom: '1rem' }}>Name: {profile.name}</p>
            <p style={{ color: '#333', fontFamily: 'Arial, sans-serif', marginBottom: '1rem' }}>Role: {profile.role}</p>
            <p style={{ color: '#333', fontFamily: 'Arial, sans-serif', marginBottom: '1rem' }}>User ID: {profile.user._id}</p>
            {profile.role === 'Entrepreneur' && (
                <p style={{ color: '#333', fontFamily: 'Arial, sans-serif', marginBottom: '1rem' }}>Business Info: {profile.businessInfo}</p>
            )}
            {!isEditing ? (
                <button onClick={handleEdit}>Edit Profile</button>
            ) : (
                <EditProfile profile={profile} onSave={handleSave} />
            )}
        </div>
    );
};

export default Profile;
