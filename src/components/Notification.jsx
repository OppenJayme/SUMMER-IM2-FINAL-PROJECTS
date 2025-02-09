import React, { useEffect, useState } from "react";
import supabase from '../client/database'; // Ensure you have this setup
import "../styles/notification.css";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const {data:sessionData, error: sessionError} = await supabase.auth.getSession();

            if (sessionError) {
                console.error(sessionError)
                return;
            }

            const user  = sessionData?.session.user;

            const {data: employeeData, error:employeeError} = await supabase
            .from('employee_t')
            .select('companyid')
            .eq('employeeemail', user.email)
            .single();

            if (employeeError) {
                console.error(employeeError)
                return;
            }

            const companyID = employeeData.companyid;
            const { data, error } = await supabase
                .from('inventory_t')
                .select('*, product_t(*)')
                .eq('companyid', companyID);

            if (error) {
                console.error("Error fetching notifications:", error);
            } else {
                setNotifications(data.map(notification => ({
                    id: notification.productid,
                    title: 'Existing Inventory',
                    message: `Item: ${notification.product_t.product_name}`,
                    timestamp: new Date(notification.inventorydate).toLocaleTimeString(),
                })));
            }
        };

        fetchNotifications();

        const subscription = supabase
            .channel('inventory_t')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'inventory_t' }, payload => {
                setNotifications(prevNotifications => [
                    {
                        id: payload.new?.productid || payload.old?.productid,
                        title: getNotificationTitle(payload.eventType),
                        message: getNotificationMessage(payload),
                        timestamp: new Date().toLocaleTimeString(),
                    },
                    ...prevNotifications,
                ]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const getNotificationTitle = (eventType) => {
        switch (eventType) {
            case 'INSERT':
                return 'New Item Added';
            case 'UPDATE':
                return 'Item Updated';
            case 'DELETE':
                return 'Item Deleted';
            default:
                return 'Notification';
        }
    };

    const getNotificationMessage = (payload) => {
        switch (payload.eventType) {
            case 'INSERT':
                return `Item: ${payload.new.product_t.product_name} has been added.`;
            case 'UPDATE':
                return `Item: ${payload.new.product_t.product_name} has been updated.`;
            case 'DELETE':
                return `Item: ${payload.old.product_t.product_name} has been deleted.`;
            default:
                return 'You have a new notification.';
        }
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    return (
        <div className="notification-main-container">
            <div className="notification-header">
                <h2>Notifications</h2>
                <button className="clear-btn" onClick={clearAllNotifications}>Clear All</button>
            </div>
            <div className="notification-list">
                {notifications.length === 0 ? (
                    <h1>Currently have no notifications</h1>
                ) : (
                    notifications.map(notification => (
                        <div key={notification.id} className="notification-item">
                            <div className="notification-title">{notification.title}</div>
                            <div className="notification-message">{notification.message}</div>
                            <div className="notification-timestamp">{notification.timestamp}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notification;
