import logoimg from "../styles/images/logo.png"
import { NavLink } from "react-router-dom";
import { useState } from "react";
import supabase from "../client/database";
import LogOut from "../components/LogOutCard";
import "../styles/sidenav.css";


const SideNav = () => {
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
                <div className={`dashboard_sidebar ${sidebarHidden ? 'hidden' : ''}`}
                    id="dashboard_sidebar" onClick={handleSideNav}>

                        <div className="dashboard_sidebar_user">
                            <img src={logoimg} alt="logo.png" />
                        </div>

                        <div className="dashboard_sidebar_menus">
                            <ul className="dashboard_menu_lists">
                                <NavLink to ="/dashboard">
                                <li className="Menu_active">
                                    <div>
                                    <i class="bi bi-speedometer"></i> <p className="Menu_active_txt">Dashboard</p>
                                    </div>
                                </li>
                                </NavLink>
                                <NavLink to = "/items">
                                <li>
                                    <div>
                                    <i class="bi bi-box-seam-fill"></i> Items
                                    </div>
                                </li>
                                </NavLink>
                                <NavLink to= "/transactions">                              
                                <li>
                                <div>
                                    <i class="bi bi-bezier2"></i> Transaction
                                    </div>
                                </li>
                                </NavLink>  
                                <NavLink to = "/activitylogs">
                                <li>
                                <div>
                                    <i class="bi bi-clipboard-check-fill"></i> Activity Logs
                                    </div>
                                </li>
                                </NavLink>
                                <li>
                                    <div onClick={handleShowModal}>
                                    <i class="bi bi-box-arrow-left"></i> Log-out
                                    </div>
                                </li>
                            </ul>
                        </div>

                </div>

                <div className="dashboard_topNav">
                    <div className="Menu-Pop" onClick={handleSideNav}>
                        <ion-icon name="menu"></ion-icon>
                    </div>
                    <i class="bi bi-bell-fill"></i>
                </div>   
            </div>
            {showLogoutModal && (
                <LogOut handleCancel={handleCancelLogout} handleConfirm={handleConfirmLogout} />
            )}
        </>
    )
}

export default SideNav;