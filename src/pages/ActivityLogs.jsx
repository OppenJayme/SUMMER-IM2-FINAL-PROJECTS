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

      console.log('Initial Fetch Data:', data);
      setProducts(data);
      setLoading(false);
    };

    fetchData();

    const handleInsert = async (payload) => {
      console.log('Insert Received:', payload);

      // Fetch full details of the new product
      const { data: newProductData, error } = await supabase
        .from('inventory_t')
        .select('*, employee_t(fname), product_t(product_name, dateadded)')
        .eq('inventoryid', payload.new.inventoryid)
        .single();

      if (error) {
        console.error('Error fetching new product data:', error);
        return;
      }

      const newProduct = {
        ...newProductData,
        type: 'INSERT'
      };

      setProducts(prevProducts => [newProduct, ...prevProducts]);
    };

    const handleUpdate = async (payload) => {
      console.log('Update Received:', payload);

      // Fetch full details of the updated product
      const { data: updatedProductData, error } = await supabase
        .from('inventory_t')
        .select('*, employee_t(fname), product_t(product_name, dateadded)')
        .eq('inventoryid', payload.new.inventoryid)
        .single();

      if (error) {
        console.error('Error fetching updated product data:', error);
        return;
      }

      const updatedProduct = {
        ...updatedProductData,
        type: 'UPDATE'
      };

      setProducts(prevProducts => {
        const updatedProducts = prevProducts.map(product =>
          product.inventoryid === updatedProduct.inventoryid ? updatedProduct : product
        );
        return updatedProducts;
      });
    };

    const inventorySubscription = supabase
      .channel('inventory_t')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'inventory_t' }, handleInsert)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'inventory_t' }, handleUpdate)
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
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            products.map((product, index) => (
              <div key={index} className="activity-notif">
                {product.type === 'INSERT' && (
                  <p>{product.employee_t?.fname || 'Unknown'} has added an item "{product.product_t?.product_name || 'Unknown'}" on {product.product_t?.dateadded || 'Unknown'}</p>
                )}
                {product.type === 'UPDATE' && (
                  <p>{product.employee_t?.fname || 'Unknown'} has updated an item "{product.product_t?.product_name || 'Unknown'}" on {product.product_t?.dateadded || 'Unknown'}</p>
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
