import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const Messaging = () => {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const [receiver, setReceiver] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User ID not found in localStorage');
                return;
            }

            try {
                const res = await axios.get(`http://localhost:5000/api/messages/${userId}`);
                setMessages(res.data);
            } catch (err) {
                console.error(err.response ? err.response.data : err.message);
            }
        };

        fetchMessages();

        const socket = io('http://localhost:5000');
        socket.on('notification', (data) => {
            setNotifications(prevNotifications => [...prevNotifications, data]);
            fetchMessages(); // Refresh messages on new notification
        });

        socket.on('typing', () => {
            setIsTyping(true);
        });

        socket.on('stopTyping', () => {
            setIsTyping(false);
        });

        return () => socket.disconnect();
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const res = await axios.post('http://localhost:5000/api/messages', { receiver, content });
                setMessages([...messages, res.data]);
                setContent('');
                setReceiver([]);
            } catch (err) {
                console.error(err.response ? err.response.data : err.message);
            }
        }
    };

    const handleTyping = (e) => {
        setContent(e.target.value);
        setTyping(true);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User ID not found in localStorage');
            return;
        }

        try {
            const res = await axios.get(`http://localhost:5000/api/messages/search/${userId}`, {
                params: { keyword: searchKeyword, startDate, endDate }
            });
            setMessages(res.data);
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
            <h2 style={{ textAlign: 'center' }}>Messaging</h2>
            <form onSubmit={sendMessage} style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '5px' }}>
                <input
                    type="text"
                    placeholder="Receiver IDs (comma separated)"
                    value={receiver.join(', ')}
                    onChange={(e) => setReceiver(e.target.value.split(',').map(id => id.trim()))}
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '5px' }}
                />
                <textarea
                    placeholder="Message Content"
                    value={content}
                    onChange={handleTyping}
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '5px' }}
                ></textarea>
                <button 
                    type="submit" 
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px' }}
                >
                    Send Message
                </button>
            </form>
            <form onSubmit={handleSearch} style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '5px', marginTop: '2rem' }}>
                <input
                    type="text"
                    placeholder="Search Keyword"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '5px' }}
                />
                <input
                    type="date"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '5px' }}
                />
                <input
                    type="date"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '5px' }}
                />
                <button 
                    type="submit" 
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px' }}
                >
                    Search Messages
                </button>
            </form>
            <div style={{ marginTop: '2rem' }}>
                <h3>Message History</h3>
                {messages.map((message) => (
                    <div key={message._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                        <p><strong>From:</strong> {message.sender.name}</p>
                        <p><strong>To:</strong> {message.receiver.map(user => user.name).join(', ')}</p>
                        <p>{message.content}</p>
                        <p><small>{new Date(message.timestamp).toLocaleString()}</small></p>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '2rem' }}>
                <h3>Notifications</h3>
                {notifications.map((notification, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                        <p>{notification.message}</p>
                        <p>{notification.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Messaging;
