import React from 'react';
import agricultureImage from './assets/agriculture.jpg'; // Import the image
import UserStats from './UserStats'; // Import the UserStats component

const HomePage = () => {
    return (
        <div className="content-container">
            <UserStats />
            <h1 className="welcome-message">WELCOME FARMERS AND ENTREPRENEURS</h1>
            <p className="welcome-subtext">When farmers and entrepreneurs unite with trust and collaboration, they sow the seeds of innovation and harvest the fruits of shared success.</p>
            <p className="empowering-message">Empowering farmers and entrepreneurs with real-time market insights to ensure fair pricing and meet demand accurately. Bridging the gap for a prosperous and sustainable future.</p>
            <div className="instructions-container">
                <div className="instructions-column">
                    <h2>FARMERS</h2>
                    <ol className="instruction-list">
                        <li>Register with details</li>
                        <li>Automatically you are logged in</li>
                        <li>Post your Product on ProductListings</li>
                        <li>Check your product posted in Unified listings</li>
                        <li>Give notification preferences</li>
                        <li>Verify market data in Reports section</li>
                    </ol>
                </div>
                <img src={agricultureImage} alt="Agriculture" className="centered-image" />
                <div className="instructions-column">
                    <h2>ENTREPRENEURS</h2>
                    <ol className="instruction-list">
                        <li>Register with details</li>
                        <li>Automatically you are logged in</li>
                        <li>Post your Demand on Demandposting</li>
                        <li>Check your demand posted in Unified listings</li>
                        <li>Give notification preferences</li>
                        <li>Verify market data in Reports section</li>
                    </ol>
                </div>
            </div>
            <style>
                {`
                /* Keyframe animations */
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }

                @keyframes slideIn {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0); }
                }

                @keyframes pop {
                    0% { transform: scale(0.8); }
                    100% { transform: scale(1); }
                }

                @keyframes bounceIn {
                    0% { transform: scale(0.8); opacity: 0; }
                    50% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); }
                }

                @keyframes rainbowText {
                    0%, 100% { color: #ff0000; }
                    15% { color: #ff7f00; }
                    30% { color: #ffff00; }
                    45% { color: #00ff00; }
                    60% { color: #0000ff; }
                    75% { color: #4b0082; }
                    90% { color: #8b00ff; }
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                @keyframes rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @keyframes shadowPulse {
                    0%, 100% { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                    50% { box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); }
                }

                /* CSS for the welcome section */
                .welcome-message {
                    font-size: 2.5rem;
                    color: #4caf50;
                    animation: bounceIn 2s ease-in-out, rainbowText 5s infinite;
                }

                .welcome-subtext, .empowering-message {
                    font-size: 1.5rem;
                    color: #333;
                    margin-top: 1rem;
                }

                /* Content container styles */
                .content-container {
                    padding: 2rem;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    animation: fadeIn 1s ease-in-out;
                    text-align: center;
                }

                /* Centered image styles */
                .centered-image {
                    display: block;
                    margin: 20px auto;
                    max-width: 100%;
                    height: auto;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                /* Instructions container styles */
                .instructions-container {
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    margin-top: 20px;
                    margin-bottom: 20px;
                }

                .instructions-column {
                    flex: 1;
                    padding: 10px;
                    animation: slideIn 0.8s ease forwards;
                    opacity: 1; /* Ensure opacity is 1 to display */
                    transition: transform 0.3s, background-color 0.3s;
                }

                .instructions-column:hover {
                    transform: translateY(-5px);
                    background-color: #f1f1f1; /* Light background on hover */
                }

                .instructions-column h2 {
                    font-size: 2rem;
                    color: #4caf50; /* Color for the heading */
                    animation: bounceIn 1.2s ease-in-out;
                }

                /* Instruction list styles */
                .instruction-list {
                    list-style-type: decimal; /* Use decimal numbers for ordering */
                    padding-left: 20px; /* Indent the list */
                    margin: 10px 0; /* Margin above and below the list */
                    animation: fadeIn 0.5s ease-in-out; /* Fade-in effect */
                    background-color: #e0f7fa; /* New background color for instruction list */
                    padding: 1rem; /* Optional padding for better spacing */
                    border-radius: 5px; /* Optionally round corners */
                }

                .instruction-list li {
                    margin: 0.5rem 0; /* Space between list items */
                    transition: color 0.3s; /* Smooth color transition */
                    font-size:1.3rem;
                }

                .instruction-list li:hover {
                    color: #4caf50; /* Change color on hover */
                    transform: scale(1.05); /* Slight grow effect on hover */
                }

                /* Stats container styles */
                .stats-container {
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    margin-top: 2rem;
                    margin-bottom: 2rem;
                }

                .stat-box {
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    padding: 1rem;
                    margin: 1rem;
                    text-align: center;
                    animation: fadeIn 1s ease-in-out, pop 1s ease-in-out, rotate 4s linear infinite, shadowPulse 2s infinite;
                    transition: transform 0.3s;
                }

                .stat-box:hover {
                    transform: translateY(-10px);
                }

                .stat-title {
                    font-size: 1.2rem;
                    color: #333;
                    animation: rainbowText 5s infinite;
                }

                .stat-value {
                    font-size: 1.5rem;
                    color: #4caf50;
                    margin-top: 0.5rem;
                    animation: pulse 2s infinite;
                }
                `}
            </style>
        </div>
    );
};

export default HomePage;