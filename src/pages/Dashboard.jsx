import "../styles/dashboard.css";
import SideNav from "../components/SideNav";
import { useEffect, useState, useRef, useCallback } from "react"; // Import useCallback
import supabase from "../client/database";
import LoadingScreen from "../components/LoadingScreen";
import Notification from "../components/Notification";
import Chart from 'chart.js/auto';

const Dashboard = () => {
    const [totalCategories, setTotalCategories] = useState(0);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalMarketValue, setMarketValue] = useState(0);
    const [totalMarketRevenue, setMarketRevenue] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showNotification, setNotification] = useState(false);
    const [monthlySales, setMonthlySales] = useState([]);
    const [monthlyItems, setMonthlyItems] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) {
                    console.error(sessionError);
                    throw sessionError;
                }

                const user = sessionData?.session.user;

                if (user) {
                    const { data: employeeData, error: employeeError } = await supabase
                        .from('employee_t')
                        .select('companyid')
                        .eq('employeeemail', user.email)
                        .single();

                    if (employeeError) throw employeeError;

                    const companyID = employeeData.companyid;

                    const { data: inventoryData, error: inventoryError } = await supabase
                        .from('inventory_t')
                        .select(`*, product_t(product_name, category, product_quantity, product_price, dateadded)`)
                        .eq('companyid', companyID);

                    if (inventoryError) throw inventoryError;

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

                    const { data: allEmployeeData, error: allEmployeeError } = await supabase
                        .from('employee_t')
                        .select('*')
                        .eq('companyid', companyID);

                    if (allEmployeeError) throw allEmployeeError;

                    setTotalEmployees(allEmployeeData.length);

                    const salesByMonth = inventoryData.reduce((acc, item) => {
                        const saleDate = new Date(item.product_t.dateadded);
                        const month = saleDate.getMonth();
                        const year = saleDate.getFullYear();
                        const key = `${year}-${String(month + 1).padStart(2, '0')}`;

                        if (!acc[key]) {
                            acc[key] = { sales: 0, items: 0 };
                        }
                        acc[key].sales += item.productSale;
                        acc[key].items += item.product_t.product_quantity;
                        return acc;
                    }, {});

                    const monthlySalesArray = Object.keys(salesByMonth).map(key => ({
                        month: key,
                        totalSales: salesByMonth[key].sales ,
                        totalItems: salesByMonth[key].items
                    })).sort((a, b) => new Date(a.month) - new Date(b.month));

                    setMonthlySales(monthlySalesArray.map(data => ({ month: data.month, totalSales: data.totalSales })));
                    setMonthlyItems(monthlySalesArray.map(data => ({ month: data.month, totalItems: data.totalItems })));
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data. Please try again');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleNotification = () => {
        setNotification(prev => !prev);
    }

    const renderChart = useCallback(() => {
        const ctx = chartRef.current.getContext('2d');

        if (ctx) {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            const labels = monthlySales.map(data => data.month);
            const salesData = monthlySales.map(data => data.totalSales);
            const itemsData = monthlyItems.map(data => data.totalItems)

            chartRef.current.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Total Sales',
                            data: salesData,
                            backgroundColor: 'rgb(194, 223, 148)',
                            borderColor: 'none',
                            borderWidth: 0
                        } ,
                        {
                            label: 'Total Items',
                            data: itemsData,
                            backgroundColor: 'rgb(147, 189, 236)',
                            borderColor: 'none',
                            borderWidth: 0
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [monthlySales, monthlyItems]);

    useEffect(() => {
        if (!loading && chartRef.current) {
            renderChart();
        }
    }, [loading, renderChart]);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <>
            <SideNav />
            <div className="notif">
                <i className="bi bi-bell-fill" onClick={handleNotification}></i>
                {showNotification && <Notification />}
            </div>
            <div className="dashboard_content">
                <div className="main_content_container">
                    {error && <p>{error}</p>}
                    <div className="container0">
                        <div className="dashboard_box">
                            <div className="left hvr-sweep-to-right">
                                <i className="bi bi-diagram-2-fill"></i>
                            </div>
                            <div className="right">
                                <h1>Total Categories</h1>
                                <p>{totalCategories}</p>
                            </div>
                        </div>

                        <div className="dashboard_box">
                            <div className="left2 hvr-sweep-to-right">
                                <i className="bi bi-people-fill"></i>
                            </div>
                            <div className="right">
                                <h1>Total Employees</h1>
                                <p>{totalEmployees}</p>
                            </div>
                        </div>

                        <div className="dashboard_box">
                            <div className="left3 hvr-sweep-to-right">
                                <i className="bi bi-microsoft"></i>
                            </div>
                            <div className="right">
                                <h1>Total Items</h1>
                                <p>{totalItems}</p>
                            </div>
                        </div>

                        <div className="dashboard_box">
                            <div className="left4 hvr-sweep-to-right">
                                <i className="bi bi-reception-4"></i>
                            </div>
                            <div className="right">
                                <h1>Total Sales</h1>
                                <p>{totalSales}</p>
                            </div>
                        </div>
                    </div>

                    <div className="container1">
                        <div className="dashboard_box">
                            <div className="left5 hvr-sweep-to-right">
                                <i className="bi bi-cash-coin"></i>
                            </div>
                            <div className="right">
                                <h1>Total Market Value</h1>
                                <p>₱ {totalMarketValue}</p>
                            </div>
                        </div>

                        <div className="dashboard_box">
                            <div className="left6 hvr-sweep-to-right">
                                <i className="bi bi-activity"></i>
                            </div>
                            <div className="right">
                                <h1>Total Market Revenue</h1>
                                <p>₱ {totalMarketRevenue}</p>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-chart">
                        <canvas id="acquisitions" ref={chartRef}></canvas>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
