import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import Notification from "../components/Notification";
import supabase from '../client/database';
import '../styles/activitylogs.css'; 
import LoadingScreen from "../components/LoadingScreen"

const ActLogs = () => {
  const [showNotification, setNotification] = useState(false);
  const [companyID, setCompanyID] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, isLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
        try {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                console.error(sessionError);
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
                setCompanyID(companyID);

                const { data: inventoryData, error: inventoryError } = await supabase
                    .from('inventory_t')
                    .select('*, product_t(product_name, category, product_quantity, product_price, suppliername, dateadded, image_path), employee_t(fname)')
                    .eq('companyid', companyID);
                if (inventoryError) throw inventoryError;
                setProducts(inventoryData);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
          isLoading(false)
        }
    };
    fetchData();
}, []);

  const handleNotification = () => {
    setNotification(prev => !prev);
  };

  if (loading) {
    return <LoadingScreen/>
  }

  return (
    <>
      <SideNav />
      <div className="notif">
        <i className="bi bi-bell-fill" onClick={handleNotification}></i>
        {showNotification && <Notification />}
      </div>
      <div className="activity_content">
        <div className="activity_content_container">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product, index) => (
            <div key={index} className="activity-notif">
              <p>{product.employee_t?.fname || 'Unknown'} has added an item "{product.product_t.product_name}" from items</p>
              <p>{product.product_t.dateadded}</p>
            </div>
          ))
        )}



{/* HIMOA IF ELSE OR WATEVER PARAS TAAS
            <div key={index} className="activity-notif">
              <p>{product.employee_t?.fname || 'Unknown'} has deleted an item "{product.product_t.product_name}" from items</p>
              <p>{product.product_t.dateadded}</p>
            </div>

            <div key={index} className="activity-notif">
              <p>{product.employee_t?.fname || 'Unknown'} has updated an item "{product.product_t.product_name}" from items</p>
              <p>{product.product_t.dateadded}</p>
            </div> */}


        </div>
      </div>
    </>
  );
};

export default ActLogs;
