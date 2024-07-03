import logoimg from "../styles/images/logo.png"
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../client/database";
import LogOut from "../components/LogOutCard";
import "../styles/sidenav.css";


const SideNav = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [companyName, setCompanyName] = useState('');

    useEffect(() => {
        const getCompanyName = async () => {
            try {
                const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) throw sessionError;

                const user = sessionData?.session?.user;
                console.log('User:', user);

                if (user) {
                    const { data: employeeData, error: employeeError } = await supabase
                        .from('employee_t')
                        .select('companyid')
                        .eq('employeeemail', user.email) 
                        .single();
                    if (employeeError) throw employeeError;
                    console.log('Employee Data:', employeeData);

                    const companyID = employeeData.companyid;

                    const { data: companyData, error: companyError } = await supabase
                        .from('company_t')
                        .select('companyname')
                        .eq('companyid', companyID)
                        .single();
                    if (companyError) throw companyError;
                    console.log('Company Data:', companyData);

                    setCompanyName(companyData.companyname);
                } else {
                    console.log('No active user session found');
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        getCompanyName();
    }, []);

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
         <div className="Main_container">
                <div className="dashboard_sidebar">

                        <div className="dashboard_sidebar_user">
                            <div className="logo-container">
                                <img src={logoimg} alt="logo.png" />
                            </div>
                            
                        </div>
                    

                        <div className="dashboard_sidebar_menus">
                            <ul className="dashboard_menu_lists">
                                <NavLink className="link" to ="/dashboard">
                                    <li className="Menu_active"><div>
                                        <i class="bi bi-speedometer"></i><p className="Menu_active_txt">Dashboard</p>
                                    </div></li>
                                </NavLink>
                                <NavLink className="link" to = "/items">
                                    <li><div>
                                        <i class="bi bi-box-seam-fill"></i><h1>Items</h1>
                                    </div></li>
                                </NavLink>
                                <NavLink className="link" to= "/transactions">                              
                                    <li><div>
                                        <i class="bi bi-bezier2"></i><h1>Transaction</h1>
                                    </div></li>
                                </NavLink>  
                                <NavLink className="link" to = "/activitylogs">
                                    <li><div>
                                        <i class="bi bi-clipboard-check-fill"></i><h1>Activity Logs</h1>
                                    </div></li>
                                </NavLink>
                                    <li><div onClick={handleShowModal}>
                                        <i class="bi bi-box-arrow-left"></i><h1>Log-out</h1>
                                    </div></li>
                            </ul>
                        </div>
                </div>

                <div className="dashboard_topNav">
                    <h1>{companyName}</h1>
                </div>   
            </div>
            {showLogoutModal && (
                <LogOut handleCancel={handleCancelLogout} handleConfirm={handleConfirmLogout} />
            )}
        </>
    )
}

export default SideNav;