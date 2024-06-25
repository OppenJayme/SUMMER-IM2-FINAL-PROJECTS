import { useState } from "react";
import supabase from "../client/database";
import LogOut from "../components/LogOutCard";
import "../styles/dashboard.css";
import logoimg from "../styles/images/logo.png"

const Dashboard = () => {
    const [sidebarHidden, setSidebarHidden] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleSideNav = (e) => {
        e.preventDefault();
        setSidebarHidden(!sidebarHidden);
    };

    const handleShowModal = () => {
        setShowLogoutModal(true);
    }

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    }

    const handleConfirmLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Error signing out:', error.message);
        } else {
            window.location.href = '/'; 
        }
    };

    return (
        <>
            <div className={`Main_container ${sidebarHidden ? 'sidebar-hidden' : ''}`}>
                <div
                    id="dashboard_sidebar"
                    className={`dashboard_sidebar ${sidebarHidden ? 'hidden' : ''}`}
                    onClick={handleSideNav}
                >
                        <div className="dashboard_sidebar_user">
                            <img src={logoimg} alt="logo.png" />
                        </div>
                        <div className="dashboard_sidebar_menus">
                            <ul className="dashboard_menu_lists">
                                <li className="Menu_active">
                                    <a href="/dashboard">
                                        <ion-icon name="aperture"></ion-icon> Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a href="/report">
                                        <ion-icon name="bar-chart-sharp"></ion-icon> Reports
                                    </a>
                                </li>
                            </ul>
                        </div>
                </div>

                    <div className="dashboard_content_container">
                        <div className="dashboard_topNav">
                            <div className="Menu-Pop" onClick={handleSideNav}>
                                <ion-icon name="menu"></ion-icon>
                            </div>
                            <button className="logoutBtn" onClick={handleShowModal}>
                                <ion-icon name="power"></ion-icon>Log-out</button>
                        </div>        
                        <div className="dashboard_content">
                                                        
                        </div>
                    </div>
                
            </div>
            {showLogoutModal && (
                <LogOut handleCancel={handleCancelLogout} handleConfirm={handleConfirmLogout} />
            )}
        </>
    );
};

export default Dashboard;
