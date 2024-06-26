import { useState } from "react";
import supabase from "../client/database";
import LogOut from "../components/LogOutCard";
import "../styles/dashboard.css";
import logoimg from "../styles/images/logo.png"
import { TotalMarketValue, TotalCategories, TotalEmployees, TotalItems, TotalMarketRevenue, TotalSales} from "../components/DashboardComps";
import { Link } from "react-router-dom";


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
                <div className={`dashboard_sidebar ${sidebarHidden ? 'hidden' : ''}`}
                    id="dashboard_sidebar"
                    onClick={handleSideNav}
                >
                        <div className="dashboard_sidebar_user">
                            <img src={logoimg} alt="logo.png" />
                        </div>
                        <div className="dashboard_sidebar_menus">
                            <ul className="dashboard_menu_lists">
                                <li className="Menu_active">
                                    <a href="/dashboard">
                                    <i class="bi bi-speedometer"></i> <p className="Menu_active_txt">Dashboard</p>
                                    </a>
                                </li>
                                <Link to = "/items">
                                <li>
                                    <div className="sidenav-menus">
                                    <i class="bi bi-box-seam-fill"></i> Items
                                    </div>
                                </li>
                                </Link>
                                <li>
                                    <a href="/items">
                                    <i class="bi bi-bezier2"></i> Transaction
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                    <i class="bi bi-clipboard-check-fill"></i> Activity Logs
                                    </a>
                                </li>
                                <li>
                                    <a href="" onClick={handleShowModal}>
                                    <i class="bi bi-box-arrow-left"></i> Log-out
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="sidebar-handler">
        
                        </div>
                </div>

                    <div className="dashboard_content_container">
                        <div className="dashboard_topNav">
                            <div className="Menu-Pop" onClick={handleSideNav}>
                                <ion-icon name="menu"></ion-icon>
                            </div>
                        </div>        
                        <div className="dashboard_content">
                            <TotalCategories/>
                            <TotalEmployees/>
                            <TotalItems/>
                            <TotalSales/>
                        <div className="bottom-box">
                            <TotalMarketValue/>
                            <TotalMarketRevenue/>
                        </div>                              
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
