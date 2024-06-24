import React from 'react';
import "../styles/logout.css";

const LogOut = ({ handleCancel, handleConfirm }) => {
    return (
        <div className="logout-overlay">
            <div className="logout-modal">
                <h1>Are you sure you want to log out?</h1>
                <div className="logout-buttons">
                    <button className="logout-confirm" onClick={handleConfirm}>Yes</button>
                    <button className="logout-cancel" onClick={handleCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default LogOut;
