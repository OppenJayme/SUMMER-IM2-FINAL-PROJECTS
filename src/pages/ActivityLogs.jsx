import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import Notification from "../components/Notification";
import supabase from '../client/database';
import '../styles/activitylogs.css'; 
import LoadingScreen from "../components/LoadingScreen"

const ActLogs = () => {
  const [showNotification, setNotification] = useState(false);
  const [loading, isLoading] = useState(true);
  const [product, setProducts] = useState([]);
  const [isInsert, setIsInsert] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);


  useEffect(() => {
    const fetchData = async () => {

      const {data: inventoryData, error} = await supabase
      .from('inventory_t')
      .select('*, employee_t(fname), product_t(product_name, dateadded)');

      if (error) {
        console.error(error)
        return;
      }
      console.log('Fetched data:', inventoryData);
      setProducts(inventoryData);
      isLoading(false);
    };
    fetchData();

    const inventorySubscription = supabase
    .channel('inventory_t')
    .on('postgres_changes', {event: 'INSERT', schema: 'public', table: 'inventory_t'}, payload => {
      console.log('Insert Recieved', payload);
      setIsInsert(true);
      setIsUpdate(false);
      setProducts(prevProducts => [payload.new, ...prevProducts])
    })
    .on('postgres_changes', {event: 'UPDATE', schema: 'public', table: 'inventory_t'}, payload => {
      console.log('Update Received', payload);
      setIsInsert(false);
      setIsUpdate(true);
      setProducts(prevProducts => {
        const updatedProducts = prevProducts.map(product => product.id === payload.id.new ? payload.new: product
        );
        return updatedProducts;
      });
    })
    .subscribe();

    return () => {
      supabase.removeChannel(inventorySubscription);
    }



  }, [])
  console.log('Products:', product)
            console.log('isInsert:', isInsert)
            console.log('isUpdate:', isUpdate)

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
        {product.length === 0 ? (
          <p>No products found</p>
        ) : (
          product.map((item, index) => (
            <div key={index} className="activity-notif">
              {isInsert && (
                <p>{item.employee_t?.fname || 'Unknown'} has added an item "{item.product_t.product_name}" from items</p>
              )}
              {isUpdate && (
                <p>{item.employee_t?.fname || 'Unknown'} has updated an item "{item.product_t.product_name}"</p>
              )}
            </div>
          ))
          
        )}
        </div>
      </div>
    </>
  );
};

export default ActLogs;
