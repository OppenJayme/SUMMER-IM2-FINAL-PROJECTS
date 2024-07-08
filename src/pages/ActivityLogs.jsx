import SideNav from "../components/SideNav"
import {useState } from "react";
import Notification from "../components/Notification";

const ActLogs = () => {
    const [showNotification, setNotification] = useState(false);

    const handleNotification = () => {
        setNotification(prev => !prev);
    }
    return (
        <>
        <SideNav/>
        <div className="notif">
                <i class="bi bi-bell-fill" onClick={handleNotification}></i>
                {showNotification && <Notification/>}
        </div>
        <h1>Activity Logs</h1>
        
        </>
    )
}

export default ActLogs;