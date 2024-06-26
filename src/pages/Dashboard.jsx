import "../styles/dashboard.css";
import { TotalMarketValue, TotalCategories, TotalEmployees, TotalItems, TotalMarketRevenue, TotalSales} from "../components/DashboardComps";
import SideNav from "../components/SideNav";


const Dashboard = () => {

    return (
        <>
            <SideNav/>
            <div className="dashboard_content">
            <div className="dashboard_box">
                <TotalMarketValue />
            </div>
            <div className="dashboard_box">
                <TotalCategories />
            </div>
            <div className="dashboard_box">
                <TotalEmployees />
            </div>
            <div className="dashboard_box">
                <TotalItems />
            </div>
            <div className="dashboard_box">
                <TotalSales />
            </div>
            <div className="dashboard_box">
                <TotalMarketRevenue />
            </div>
        </div>
        </>
    );
};

export default Dashboard;
