import "../styles/dashboard.css";
import SideNav from "../components/SideNav";
import firstImg from '../styles/images/1.png';
const Dashboard = () => {

    return (
        <>
            <SideNav/>
                    <div className="dashboard_content">
                        <div className="main_content_container">
                            <h1>Dashboard</h1>

                            <div className="container0">

                                <div className="dashboard_box">
                                    <h1>TotalCategories</h1>
                                    <img src={firstImg} alt="" />
                                </div>

                                <div className="dashboard_box">
                                    <h1>TotalEmployees</h1>
                                    <img src={firstImg} alt="" />
                                </div>

                                <div className="dashboard_box">
                                    <h1>TotalSales</h1>
                                    <img src={firstImg} alt="" />
                                </div>

                                <div className="dashboard_box">
                                    <h1>TotalItems</h1>
                                    <img src={firstImg} alt="" />
                                </div>

                            </div>


                            <div className="container1">

                                <div className="dashboard_box">
                                    <h1>TotalMarketValue</h1>
                                    <h2>VALUE HERE!</h2>
                                </div>

                                <div className="dashboard_box">
                                    <h1>TotalMarketRevenue</h1>
                                    <h2>VALUE HERE!</h2>
                                </div>

                            </div>
                        </div>
                    </div>
        </>
    );
};

export default Dashboard;
