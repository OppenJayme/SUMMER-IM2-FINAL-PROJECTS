import SideNav from "../components/SideNav";
import {useState } from "react";
import Notification from "../components/Notification";


const Transactions = () => {

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
         <h1>Transaction</h1>
        </>
    )
}

export default Transactions;