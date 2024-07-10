import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import Notification from "../components/Notification";
import supabase from '../client/database';
import '../styles/activitylogs.css'; 
import LoadingScreen from "../components/LoadingScreen"

const ActLogs = () => {
  const [showNotification, setNotification] = useState(false);
  const [loading, isLoading] = useState(true);
  const [products, setProducts] = useState([]);
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
             {isInsert && (
              <div className="logs-container">
                <p>{product.employee_t?.fname || 'Unknown'} has added an item "{product.product_t.product_name}" from items</p>
                <p>{product.product_t.dateadded}</p>
              </div>
             )}
             {isUpdate && (
              <div className="logs-container">
               <p>{product.employee_t?.fName || 'Unknown'} has updated an item "{product.product_t.product_name}"</p>
               <p>{product.product_t.dateadded}</p>
              </div>
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
