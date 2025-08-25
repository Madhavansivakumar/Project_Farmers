import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [notificationMethod, setNotificationMethod] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const socket = io('http://localhost:5000', {
            transports: ['websocket', 'polling', 'flashsocket'], // Specify the transports
        });

        socket.on('notification', (data) => {
            setNotifications(prevNotifications => [...prevNotifications, data]);
        });

        return () => socket.disconnect();
    }, []);

    const handleNotificationMethodChange = (event) => {
        setNotificationMethod(event.target.value);
    };

    const handleNotificationSubmit = () => {
        const methodText = notificationMethod.charAt(0).toUpperCase() + notificationMethod.slice(1);
        setConfirmationMessage(`Thank you! You will be notified soon via ${methodText}.`);

        // Delay the navigation by 3 seconds
        setTimeout(() => {
            navigate('/reports'); // Navigate to Report page
        }, 3000);
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', animation: 'fadeIn 2s' }}>
            <h2 style={{ textAlign: 'center', color: '#4CAF50', animation: 'slideIn 3s' }}>Notifications</h2>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <label htmlFor="notification-method" style={{ fontSize: '1.2rem', color: '#2196F3', animation: 'bounce 2s infinite' }}>Select option for Notification: </label>
                <select
                    id="notification-method"
                    value={notificationMethod}
                    onChange={handleNotificationMethodChange}
                    style={{ padding: '0.5rem', margin: '0.5rem', borderRadius: '5px', borderColor: '#FF5722', animation: 'swing 2s infinite' }}
                >
                    <option value="">--Select--</option>
                    <option value="sms" style={{ color: '#009688' }}>SMS</option>
                    <option value="email" style={{ color: '#3F51B5' }}>E-mail</option>
                    <option value="whatsapp" style={{ color: '#4CAF50' }}>WhatsApp</option>
                </select>
                <button
                    onClick={handleNotificationSubmit}
                    style={{ marginLeft: '1rem', padding: '0.5rem 1rem', backgroundColor: '#FF9800', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer', animation: 'pulse 2s infinite' }}
                >
                    Get Notified
                </button>
            </div>
            {confirmationMessage && <p style={{ textAlign: 'center', marginTop: '1rem', color: '#673AB7', animation: 'fadeIn 3s' }}>{confirmationMessage}</p>}
            <div style={{ marginTop: '2rem' }}>
                {notifications.map((notification, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', backgroundColor: '#f9f9f9', animation: 'fadeIn 2s' }}>
                        <p>{notification.message}</p>
                        <p>Contact: {notification.contact}</p>
                    </div>
                ))}
            </div>
            <style>
                {`
                    @keyframes fadeIn {
                        0% { opacity: 0; }
                        100% { opacity: 1; }
                    }
                    @keyframes slideIn {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(0); }
                    }
                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% {
                            transform: translateY(0);
                        }
                        40% {
                            transform: translateY(-30px);
                        }
                        60% {
                            transform: translateY(-15px);
                        }
                    }
                    @keyframes swing {
                        20% {
                            transform: rotate(15deg);
                        }
                        40% {
                            transform: rotate(-10deg);
                        }
                        60% {
                            transform: rotate(5deg);
                        }
                        80% {
                            transform: rotate(-5deg);
                        }
                        100% {
                            transform: rotate(0deg);
                        }
                    }
                    @keyframes pulse {
                        0% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.05);
                        }
                        100% {
                            transform: scale(1);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Notification;
