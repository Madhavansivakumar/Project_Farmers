import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    let ws;

    useEffect(() => {
        ws = new WebSocket(`ws://localhost:${process.env.REACT_APP_WS_PORT || 8080}`);

        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (event) => {
            const newMessage = event.data;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = (message) => {
        ws.send(message);
    };

    return (
        <div>
            <h2>WebSocket Messages</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <button onClick={() => sendMessage('Hello, WebSocket!')}>
                Send Message
            </button>
        </div>
    );
};

export default WebSocketComponent;
