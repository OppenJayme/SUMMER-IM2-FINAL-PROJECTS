import React from "react";
import "../styles/loadingScreen.css"; // Assuming you have a separate CSS file for styles

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingScreen;
