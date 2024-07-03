import "../styles/dashboard.css";
import SideNav from "../components/SideNav";
import firstImg from '../styles/images/1.png';
import { useEffect, useState } from "react";
import supabase from "../client/database";
const Dashboard = () => {
    const [totalCategories, setTotalCategories] = useState(0);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalMarketValue, setMarketValue] = useState(0);
    const [totalMarketRevenue, setMarketRevenue] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async() => {
            try {
                const {data: sessionData, error:sessionError} = await supabase.auth.getSession();
                if(sessionError) {
                    console.error(sessionError);
                }
   
                const user = sessionData?.session.user;
   
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
                    .select('*, product_t(product_name, category, product_quantity, product_price)')
                    .eq('companyid', companyID)
   
                    if(inventoryError) throw inventoryError;


                    const totalSales = inventoryData.reduce((acc, item) => acc + item.productSale, 0);
                    setTotalSales(totalSales);

                    const totalRevenue = inventoryData.reduce((acc, item) => acc + (item.productSale * item.product_t.product_price), 0);
                    setMarketRevenue(totalRevenue);
   
                    const productData = inventoryData.map(item => item.product_t);

   
                    const totalItems = productData.reduce((acc, product) => acc + product.product_quantity, 0);
                    setTotalItems(totalItems);
   
                    const totalMarketValue = productData.reduce((acc, product) => acc + (product.product_quantity * product.product_price), 0);
                    setMarketValue(totalMarketValue);
   
                    const categories = new Set(productData.map(product => product.category));
                    setTotalCategories(categories.size);
   
                    const {data: allEmployeeData, error: allEmployeeError} = await supabase
                    .from('employee_t')
                    .select('*')
                    .eq('companyid', companyID);
   
                    if(allEmployeeError) throw allEmployeeError;
   
                    setTotalEmployees(allEmployeeData.length);
                     }
                 } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data. Please try again');
            }
        };
        fetchData();
}, []);


    return (
        <>
            <SideNav/>
                    <div className="dashboard_content">
                        <div className="main_content_container">
                            <h1>Dashboard</h1>
                            {error && <p>{error}</p>}
                            <div className="container0">

                                <div className="dashboard_box">
                                    <h1>TotalCategories</h1>
                                    <img src={firstImg} alt="" />
                                    <p>{totalCategories}</p>
                                </div>

                                <div className="dashboard_box">
                                    <h1>TotalEmployees</h1>
                                    <img src={firstImg} alt="" />
                                    <p>{totalEmployees}</p>
                                </div>


                                <div className="dashboard_box">
                                    <h1>TotalItems</h1>
                                    <img src={firstImg} alt="" />
                                    <p>{totalItems}</p>
                                </div>

                                <div className="dashboard_box">
                                    <h1>Total Sales</h1>
                                    <img src={firstImg} alt="" />
                                    <p>{totalSales}</p>
                                </div>

                            </div>


                            <div className="container1">

                                <div className="dashboard_box">
                                    <h1>Total Market Value</h1>
                                    <h2>{totalMarketValue}</h2>
                                </div>

                                <div className="dashboard_box">
                                    <h1>Total Market Revenue</h1>
                                    <h2>{totalMarketRevenue}</h2>
                                </div>

                            </div>
                        </div>
                    </div>
        </>
    );
};

export default Dashboard;
