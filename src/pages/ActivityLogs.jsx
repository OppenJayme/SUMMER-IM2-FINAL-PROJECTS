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
  const [activities, setActivities] = useState([]);

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
        .from('activity_logs_t')
        .select('*, employee_t(fname)')
        .eq('companyid', companyID);
      
      if (error) {
        console.error(error.message);
        return;
      }

      console.log('Initial Fetch Data:', data);

      setActivities(data);
      setLoading(false);
    };

    fetchData();

    const handleInsert = async (payload) => {
      console.log('Insert Received:', payload);

      const { data: newActivityData, error } = await supabase
        .from('activity_logs_t')
        .select('*, employee_t(fname)')
        .eq('id', payload.new.id)
        .single();

      if (error) {
        console.error('Error fetching new activity data:', error);
        return;
      }

      setActivities(prevActivities => [newActivityData, ...prevActivities]);
    };

    const handleUpdate = async (payload) => {
      console.log('Update Received:', payload);

      const { data: updatedActivityData, error } = await supabase
        .from('activity_logs_t')
        .select('*, employee_t(fname)')
        .eq('id', payload.new.id)
        .single();

      if (error) {
        console.error('Error fetching updated activity data:', error);
        return;
      }

      setActivities(prevActivities => [updatedActivityData, ...prevActivities]);
    };

    const activitySubscription = supabase
      .channel('activity_logs_t')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_logs_t' }, handleInsert)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'activity_logs_t' }, handleUpdate)
      .subscribe();

    return () => {
      supabase.removeChannel(activitySubscription);
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const groupActivitiesByDay = (activities) => {
    const grouped = activities.reduce((acc, activity) => {
      const date = new Date(activity.dateadded || '');
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

      acc[label].push(activity);
      return acc;
    }, {});

    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => new Date(b.dateadded) - new Date(a.dateadded));
    });

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

  const groupedActivities = groupActivitiesByDay(activities);

  return (
    <>
      <SideNav />
      <div className="notif">
        <i className="bi bi-bell-fill" onClick={handleNotification}></i>
        {showNotification && <Notification />}
      </div>
      <div className="activity_content">
        <div className="activity_content_container">
          {Object.keys(groupedActivities).length === 0 ? (
            <p>No activities found</p>
          ) : (
            Object.keys(groupedActivities).map((dayLabel, index) => (
              <div key={index}>
                <h3 className="day-label">{dayLabel}</h3>
                {groupedActivities[dayLabel].map((activity, idx) => (
                  <div key={activity.id} className="activity-notif">
                    {activity.event_type === 'INSERT' && (
                      <p>{activity.employee_t?.fname || 'Unknown'} has added an item "{activity.product_name || 'Unknown'}" on {format(new Date(activity.dateadded), 'MMMM d, yyyy')}</p>
                    )}
                    {activity.event_type === 'UPDATE' && (
                      <p>{activity.employee_t?.fname || 'Unknown'} has updated an item "{activity.product_name || 'Unknown'}" on {format(new Date(activity.dateadded), 'MMMM d, yyyy')}</p>
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
