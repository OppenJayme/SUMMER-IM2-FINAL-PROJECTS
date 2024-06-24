import { useState } from "react";
import "../styles/dashboard.css";

const Dashboard = () => {
    const [sidebarHidden, setSidebarHidden] = useState(false);

    const handleSideNav = (e) => {
        e.preventDefault();
        setSidebarHidden(!sidebarHidden);
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
                            <h1>STOCKWISE</h1>
                            <img src="img/logo.png" alt="" />
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
                            <a className="logoutBtn" href="/landingpage">
                                <ion-icon name="power"></ion-icon>Log-out
                            </a>
                        </div>

                        <div className="dashboard_content">
                            <h1 className="addproductheader">
                                <ion-icon className="addprodicon" name="add-sharp"></ion-icon>Add Products
                            </h1>
                            <div id="formModal" className="form-modal">
                                <form id="productForm" action="/dashboard/addProduct" method="POST" enctype="multipart/form-data">
                                    <label htmlFor="itemName">Item Name:</label>
                                    <input type="text" id="itemName" name="itemName" required />

                                    <label htmlFor="price">Price:</label>
                                    <input type="number" id="price" name="price" required />

                                    <label htmlFor="quantity">Quantity:</label>
                                    <input type="number" id="quantity" name="quantity" required />

                                    <label htmlFor="supplier">Supplier:</label>
                                    <input type="text" id="supplier" name="supplier" required />

                                    <label htmlFor="itemPicture">Image:</label>
                                    <input type="file" id="itemPicture" name="itemPicture" accept="image/*" required />

                                    <button type="submit">Add Product</button>
                                </form>
                            </div>
                        </div>
                    </div>
                
            </div>
        </>
    );
};

export default Dashboard;
