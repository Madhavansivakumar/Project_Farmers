import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegistrationSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        role: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const { name, mobileNumber, role, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            console.log(res.data);

            // Store token and userId in local storage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.user.id);

            setErrorMessage('');
            if (onRegistrationSuccess) {
                onRegistrationSuccess(role);
            }
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
            if (err.response && err.response.data.msg) {
                setErrorMessage(err.response.data.msg);
            }
        }
    };

    return (
        <>
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                `}
            </style>
            <form
                onSubmit={e => onSubmit(e)}
                style={{
                    maxWidth: '500px',
                    margin: '0 auto',
                    padding: '2rem',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    animation: 'fadeIn 1s ease-in-out, pulse 2s infinite'
                }}
            >
                <h1 style={{ textAlign: 'center', color: '#fff', marginBottom: '2rem', fontFamily: 'Arial, sans-serif', letterSpacing: '1.5px' }}>Register</h1>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={e => onChange(e)}
                    required
                    style={{
                        display: 'block',
                        width: '100%',
                        marginBottom: '1rem',
                        padding: '0.75rem',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'border-color 0.3s',
                        fontFamily: 'Arial, sans-serif'
                    }}
                />
                <input
                    type="text"
                    placeholder="Mobile Number"
                    name="mobileNumber"
                    value={mobileNumber}
                    onChange={e => onChange(e)}
                    required
                    style={{
                        display: 'block',
                        width: '100%',
                        marginBottom: '1rem',
                        padding: '0.75rem',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'border-color 0.3s',
                        fontFamily: 'Arial, sans-serif'
                    }}
                    autoComplete="tel"
                />
                <select
                    name="role"
                    value={role}
                    onChange={e => onChange(e)}
                    required
                    style={{
                        display: 'block',
                        width: '100%',
                        marginBottom: '1rem',
                        padding: '0.75rem',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'border-color 0.3s',
                        fontFamily: 'Arial, sans-serif'
                    }}
                >
                    <option value="">Select Role</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Entrepreneur">Entrepreneur</option>
                </select>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                    required
                    style={{
                        display: 'block',
                        width: '100%',
                        marginBottom: '1rem',
                        padding: '0.75rem',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'border-color 0.3s',
                        fontFamily: 'Arial, sans-serif'
                    }}
                    autoComplete="current-password"
                />
                {errorMessage && <p style={{ color: 'red', fontFamily: 'Arial, sans-serif' }}>{errorMessage}</p>}
                <button
                    type="submit"
                    style={{
                        display: 'block',
                        width: '100%',
                        marginBottom: '1rem',
                        padding: '0.75rem',
                        backgroundColor: '#4caf50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s',
                        cursor: 'pointer',
                        fontFamily: 'Arial, sans-serif'
                    }}
                    onMouseEnter={e => e.target.style.backgroundColor = '#45a049'}
                    onMouseLeave={e => e.target.style.backgroundColor = '#4caf50'}
                >
                    Register
                </button>
            </form>
        </>
    );
};

export default Register;
