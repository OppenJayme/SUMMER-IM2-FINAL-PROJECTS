import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import Notification from "../components/Notification";
import supabase from '../client/database';
import '../styles/activitylogs.css'; 
import LoadingScreen from "../components/LoadingScreen";

const ActLogs = () => {
  const [showNotification, setNotification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [isInsert, setIsInsert] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleNotification = () => {
    setNotification(prev => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('inventory_t')
        .select('*, employee_t(fname), product_t(product_name, dateadded)');
      
      if (error) {
        console.error(error);
        return;
      }

      setProducts(data);
      setLoading(false);
    };

    fetchData();

    const inventorySubscription = supabase
      .channel('inventory_t')
      .on('postgres_changes', { event: 'SELECT', schema: 'public', table: 'inventory_t' }, payload => {
        console.log('Select Received', payload);
        // Handle SELECT event
        fetchData();
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'inventory_t' }, payload => {
        console.log('Insert Received', payload);
        setIsInsert(true);
        setIsUpdate(false);
        setProducts(prevProducts => [payload.new, ...prevProducts]);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'inventory_t' }, payload => {
        console.log('Update Received', payload);
        setIsInsert(false);
        setIsUpdate(true);
        setProducts(prevProducts => {
          const updatedProducts = prevProducts.map(product =>
            product.inventoryid === payload.new.inventoryid ? payload.new : product
          );
          return updatedProducts;
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(inventorySubscription);
    };
  }, []);

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
      <div className="activity_content">
        <div className="activity_content_container">
          {/* Display activity notifications only if isInsert or isUpdate is true */}
          {(isInsert || isUpdate) && (
            products.map((product, index) => (
              <div key={index} className="activity-notif">
                {isInsert && (
                  <p>{product.employee_t?.fname || 'Unknown'} has added an item "{product.product_t?.product_name || 'Unknown'}" on {product.product_t?.dateadded || 'Unknown'}</p>
                )}
                {isUpdate && (
                  <p>{product.employee_t?.fname || 'Unknown'} has updated an item "{product.product_t?.product_name || 'Unknown'}" on {product.product_t?.dateadded || 'Unknown'}</p>
                )}
              </div>
            ))
          )}
          { products.map((product, index) => (
              <div key={index} className="activity-notif">
                  <p>{product.employee_t?.fname || 'Unknown'} has added an item "{product.product_t?.product_name || 'Unknown'}" on {product.product_t?.dateadded || 'Unknown'}</p>
              </div>))} 
        </div>
      </div>
    </>
  );
};

export default ActLogs;
