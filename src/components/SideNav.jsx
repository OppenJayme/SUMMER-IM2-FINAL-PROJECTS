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
                                <NavLink className="link" to ="/dashboard">
                                <li className="Menu_active">
                                    <div>
                                    <i class="bi bi-speedometer"></i> <p className="Menu_active_txt">Dashboard</p>
                                    </div>
                                </li>
                                </NavLink>
                                <NavLink className="link" to = "/items">
                                <li>
                                    <div>
                                    <i class="bi bi-box-seam-fill"></i> Items
                                    </div>
                                </li>
                                </NavLink>
                                <NavLink className="link" to= "/transactions">                              
                                <li>
                                <div>
                                    <i class="bi bi-bezier2"></i> Transaction
                                    </div>
                                </li>
                                </NavLink>  
                                <NavLink className="link" to = "/activitylogs">
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

                <div className="sidebar-handler" onClick={handleSideNav}>
                    <div className="left-half"></div>
                    <div className="right-half"> <i class="bi bi-chevron-right"></i></div>    
                </div>

                <div className="dashboard_topNav">
                    <h1>OPPAI WARRIOR</h1>
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