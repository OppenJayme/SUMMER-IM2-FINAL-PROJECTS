import "../styles/dashboard.css";
import SideNav from "../components/SideNav";
<<<<<<< HEAD
import firstImg from '../styles/images/1.png';
=======
import { useEffect, useState } from "react";
import supabase from "../client/database";

>>>>>>> bae329d0bf3580cc846aa354a7ecbe3f0beed6a5
const Dashboard = () => {
    const [totalCategories, setTotalCategories] = useState(0);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [totalMarketValue, setMarketValue] = useState(0);
    const [totalMarketRevenue, setMarketRevenue] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async() => {
            const {data: sessionData, error:sessionError} = await supabase.auth.getSession();
            if(sessionError) {
                console.error(sessionError);
            }

            const user = sessionData?.session.user;
            console.log('User:', user);

            if (user) {
                const {data: employeeData, error: employeeError } = await supabase
                .from('employee_t')
                .select('companyid')
                .eq('employeeemail', user.email)
                .single();

                if(employeeError) throw employeeError;
                
                const companyID = employeeData.companyid;

                const {data: inventoryData, error:inventoryError } = await supabase
                .from('inventory_t')
                .select('*')
                .eq('companyid', companyID)

                if(inventoryError) throw inventoryError;

        }
    }
}, []);


    return (
        <>
            <SideNav/>
                    <div className="dashboard_content">
                        <div className="main_content_container">
                            <h1>Dashboard</h1>

<<<<<<< HEAD
                            <div className="container0">
=======
            <div className="dashboard_content">
                <div className="category_container">
                    
                    <div className="dashboard_box">
                        <h1>TotalCategories</h1>
                    </div>
>>>>>>> bae329d0bf3580cc846aa354a7ecbe3f0beed6a5

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
<<<<<<< HEAD
=======
                </div>
            </div>
>>>>>>> bae329d0bf3580cc846aa354a7ecbe3f0beed6a5
        </>
    );
};

export default Dashboard;
