import "../styles/dashboard.css";
import { TotalMarketValue, TotalCategories, TotalEmployees, TotalItems, TotalMarketRevenue, TotalSales} from "../components/DashboardComps";
import SideNav from "../components/SideNav";


const Dashboard = () => {

    return (
        <>
            <SideNav/>
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
        </>
    );
};

export default Dashboard;
