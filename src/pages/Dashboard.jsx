import "../styles/dashboard.css";
import SideNav from "../components/SideNav";


const Dashboard = () => {

    return (
        <>
            <SideNav/>
            <div className="dashboard_content">
            <div className="dashboard_box">
                <h1>Total Categories</h1>
            </div>
            <div className="dashboard_box">
                <h1>Total Employees</h1>
            </div>
            <div className="dashboard_box">
              <h1>Total Sales</h1>
            </div>
            <div className="dashboard_box">
                <h1>Total Items</h1>
            </div>
            <div className="dashboard_box">
                <h1>Total Market Value</h1>
            </div>
            <div className="dashboard_box">
                <h1>Total Market Revenue</h1>
            </div>
        </div>
        </>
    );
};

export default Dashboard;
