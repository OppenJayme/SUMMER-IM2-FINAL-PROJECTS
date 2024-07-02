import "../styles/dashboard.css";
import SideNav from "../components/SideNav";
import { useEffect, useState } from "react";
import supabase from "../client/database";

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
