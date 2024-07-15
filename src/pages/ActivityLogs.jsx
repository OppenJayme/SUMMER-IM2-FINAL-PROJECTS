import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import Notification from "../components/Notification";
import supabase from '../client/database';
import '../styles/activitylogs.css'; 
import LoadingScreen from "../components/LoadingScreen";
import { format, differenceInDays } from 'date-fns';

const ActLogs = () => {
  const [showNotification, setNotification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const handleNotification = () => {
    setNotification(prev => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
          console.error(sessionError);
          throw sessionError;
      }
      const user = sessionData?.session.user;

      const { data: employeeData, error: employeeError } = await supabase
            .from('employee_t')
            .select('companyid')
            .eq('employeeemail', user.email)
            .single();

      if (employeeError) throw employeeError;

      const companyID = employeeData.companyid;
      const { data, error } = await supabase
        .from('inventory_t')
        .select('*, employee_t(fname), product_t(product_name, dateadded)')
        .eq('companyid', companyID);
      
      if (error) {
        console.error(error);
        return;
      }

      console.log('Initial Fetch Data:', data);

      // Add a type to the fetched data (if needed, based on your logic)
      const initialProducts = data.map(product => ({
        ...product,
        type: 'INITIAL'
      }));

      setProducts(initialProducts);
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

  const groupProductsByDay = (products) => {
    const grouped = products.reduce((acc, product) => {
      const date = new Date(product.product_t?.dateadded || '');
      const diffDays = differenceInDays(new Date(), date);
      let label;

      if (diffDays === 0) {
        label = 'Today';
      } else if (diffDays === 1) {
        label = 'Yesterday';
      } else {
        label = `${diffDays} days ago`;
      }

      if (!acc[label]) {
        acc[label] = [];
      }

      acc[label].push(product);
      return acc;
    }, {});

    // Sort the products within each group by dateadded in descending order
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => new Date(b.product_t?.dateadded) - new Date(a.product_t?.dateadded));
    });

    // Sort the groups by their labels ("Today", "Yesterday", etc.)
    const sortedGroups = Object.keys(grouped).sort((a, b) => {
      const aDays = a === 'Today' ? 0 : a === 'Yesterday' ? 1 : parseInt(a);
      const bDays = b === 'Today' ? 0 : b === 'Yesterday' ? 1 : parseInt(b);
      return aDays - bDays;
    });

    return sortedGroups.reduce((acc, key) => {
      acc[key] = grouped[key];
      return acc;
    }, {});
  };

  const groupedProducts = groupProductsByDay(products);

  return (
    <>
      <SideNav />
      <div className="notif">
        <i className="bi bi-bell-fill" onClick={handleNotification}></i>
        {showNotification && <Notification />}
      </div>
      <div className="activity_content">
        <div className="activity_content_container">
          {Object.keys(groupedProducts).length === 0 ? (
            <p>No products found</p>
          ) : (
            Object.keys(groupedProducts).map((dayLabel, index) => (
              <div key={index}>
                <h3 className="day-label">{dayLabel}</h3>
                {groupedProducts[dayLabel].map((product, idx) => (
                  <div key={idx} className="activity-notif">
                    {product.type === 'INSERT' && (
                      <p>{product.employee_t?.fname || 'Unknown'} has added an item "{product.product_t?.product_name || 'Unknown'}" on {format(new Date(product.product_t?.dateadded), 'MMMM d, yyyy')}</p>
                    )}
                    {product.type === 'UPDATE' && (
                      <p>{product.employee_t?.fname || 'Unknown'} has updated an item "{product.product_t?.product_name || 'Unknown'}" on {format(new Date(product.product_t?.dateadded), 'MMMM d, yyyy')}</p>
                    )}
                    {product.type === 'INITIAL' && (
                      <p>{product.employee_t?.fname || 'Unknown'} has added an item "{product.product_t?.product_name || 'Unknown'}" on {format(new Date(product.product_t?.dateadded), 'MMMM d, yyyy')}</p>
                    )}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ActLogs;
