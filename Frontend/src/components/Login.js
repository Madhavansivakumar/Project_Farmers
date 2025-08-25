import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        mobileNumber: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [logoutMessage, setLogoutMessage] = useState('');
    const navigate = useNavigate();

    const { mobileNumber, password } = formData;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            setIsLoggedIn(true);
            setErrorMessage('');

            // Navigate to Profile page after login
            navigate('/Profile');

        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
            if (err.response && err.response.data.msg) {
                setErrorMessage(err.response.data.msg);
            }
        }
    };

    const handleLogout = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found, user might already be logged out.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/logout", null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setFormData({
                mobileNumber: '',
                password: ''
            });
            setLogoutMessage('Thank you!!!!! You are logged out successfully.');

            // Navigate to HomePage after logout
            navigate('/');

        } catch (err) {
            console.error("Logout failed:", err.response ? err.response.data : err.message);
        }
    };

    return (
        <div style={styles.container}>
            {!isLoggedIn ? (
                <form onSubmit={e => onSubmit(e)} style={styles.form}>
                    <h1 style={styles.heading}>Login</h1>
                    <input
                        type="text"
                        placeholder="Mobile Number"
                        name="mobileNumber"
                        value={mobileNumber}
                        onChange={e => onChange(e)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        required
                        style={styles.input}
                    />
                    {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
                    <button type="submit" style={styles.loginButton}>Login</button>
                    {logoutMessage && (
                        <div style={styles.logoutMessageContainer}>
                            <p style={styles.logoutMessage}>{logoutMessage}</p>
                        </div>
                    )}
                </form>
            ) : (
                <div style={styles.loggedInContainer}>
                    <h2 style={styles.welcomeMessage}>Welcome! You are logged in.</h2>
                    <div style={styles.logoutContainer}>
                        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f7fa',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        animation: 'fadeIn 1s ease-out',
    },
    form: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        animation: 'formSlideIn 0.8s ease-out, shake 2s infinite, colorChange 5s infinite',
        position: 'relative',
    },
    heading: {
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#333',
        animation: 'headingSlideIn 0.8s ease-out',
    },
    input: {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem',
        transition: 'border-color 0.3s',
        animation: 'inputFadeIn 0.8s ease-out',
    },
    inputFocus: {
        borderColor: '#007bff',
    },
    errorMessage: {
        color: 'red',
        fontSize: '0.9rem',
        textAlign: 'center',
        marginTop: '10px',
        animation: 'shake 0.5s ease-out',
    },
    loginButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1.1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.3s',
        animation: 'buttonSlideIn 0.8s ease-out',
    },
    loginButtonHover: {
        backgroundColor: '#0056b3',
        transform: 'scale(1.05)',
    },
    loggedInContainer: {
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        animation: 'formSlideIn 0.8s ease-out',
    },
    welcomeMessage: {
        color: '#333',
        marginBottom: '20px',
        fontSize: '1.5rem',
        animation: 'welcomeBounceIn 0.8s ease-out',
    },
    logoutContainer: {
        marginTop: '20px',
    },
    logoutButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1.1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.3s',
        animation: 'buttonSlideIn 0.8s ease-out',
    },
    logoutButtonHover: {
        backgroundColor: '#c82333',
        transform: 'scale(1.05)',
    },
    logoutMessageContainer: {
        marginTop: '20px',
        textAlign: 'center',
        position: 'absolute',
        bottom: '-40px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
    },
    logoutMessage: {
        color: 'green',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        animation: 'fadeIn 1s ease-out',
    },
};

const keyframes = `
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes formSlideIn {
        0% {
            transform: translateY(20px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
    @keyframes shake {
        0%, 100% {
            transform: translateX(0);
        }
        25%, 75% {
            transform: translateX(-5px);
        }
        50% {
            transform: translateX(5px);
        }
    }
    @keyframes bounceIn {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
    @keyframes headingSlideIn {
        0% {
            transform: translateY(-20px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
    @keyframes inputFadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes buttonSlideIn {
        0% {
            transform: translateY(10px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
    @keyframes welcomeBounceIn {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }
    @keyframes colorChange {
        0%, 100% {
            background-color: white;
        }
        50% {
            background-color: #ffe4e6;
        }
    }
`;

document.head.insertAdjacentHTML('beforeend', `<style>${keyframes}</style>`);

export default Login;
