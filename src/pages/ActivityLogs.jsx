import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import Notification from "../components/Notification";
import supabase from '../client/database';
import '../styles/activitylogs.css'; 

const ActLogs = () => {
  const [showNotification, setNotification] = useState(false);
  const [companyID, setCompanyID] = useState(null);
  const [products, setProducts] = useState([]);

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
        }
    };
    fetchData();
}, []);

  const handleNotification = () => {
    setNotification(prev => !prev);
  };

  return (
    <>
      <SideNav />
      <div className="notif">
        <i className="bi bi-bell-fill" onClick={handleNotification}></i>
        {showNotification && <Notification />}
      </div>
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product, index) => (
            <div key={index} className="product-item">
              <h2>Item Name: {product.product_t.product_name}</h2>
              <p>Employee Added: {product.employee_t?.fname || 'Unknown'}</p>
              <p>Category: {product.product_t.category}</p>
              <p>Quantity: {product.product_t.product_quantity}</p>
              <p>Price: {product.product_t.product_price}</p>
              <p>Supplier: {product.product_t.suppliername}</p>
              <p>Date Added: {product.product_t.dateadded}</p>
              <br></br>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ActLogs;
