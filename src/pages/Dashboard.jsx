import "../styles/dashboard.css";
import { TotalMarketValue, TotalCategories, TotalEmployees, TotalItems, TotalMarketRevenue, TotalSales} from "../components/DashboardComps";
import SideNav from "../components/SideNav";

const Dashboard = () => {

    return (
        <>
            <SideNav/>

            <div className="dashboard_content">
                <div className="category_container">
                    
                    <div className="dashboard_box">
                        <h1>TotalCategories</h1>
                    </div>

                    <div className="dashboard_box">
                        <h1>TotalEmployees</h1>
                    </div>

                    <div className="dashboard_box">
                        <h1>TotalSales</h1>
                    </div>

                    <div className="dashboard_box">
                        <h1>TotalItems</h1>
                    </div>

                    <div className="dashboard_box">
                        <h1>TotalMarketValue</h1>
                    </div>

                    <div className="dashboard_box">
                        <h1>TotalMarketRevenue</h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
