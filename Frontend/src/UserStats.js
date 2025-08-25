// UserStats.js
import React from 'react';

const UserStats = () => {
    return (
        <div className="stats-container">
            <div className="stat-box">
                <h2 className="stat-title">Users Today</h2>
                <p className="stat-value">3</p>
            </div>
            <div className="stat-box">
                <h2 className="stat-title">Users This Month</h2>
                <p className="stat-value">20</p>
            </div>
            <div className="stat-box">
                <h2 className="stat-title">All Time Users</h2>
                <p className="stat-value">30</p>
            </div>
            <div className="stat-box">
                <h2 className="stat-title">Farmers Count</h2>
                <p className="stat-value">30</p>
            </div>
            <div className="stat-box">
                <h2 className="stat-title">Entrepreneurs Count</h2>
                <p className="stat-value">20</p>
            </div>
        </div>
    );
};

export default UserStats;
