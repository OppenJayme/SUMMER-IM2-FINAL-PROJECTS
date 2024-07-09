import SideNav from '../components/SideNav';
import React, { useState, useEffect } from 'react';
import supabase from '../client/database';
import Notification from '../components/Notification';
import '../styles/profile.css';



const Profile = () => {
    const [ showNotification, setNotification] = useState(false);
    const [username, setUsername] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const handleNotification = () => {
        setNotification(prev => !prev);
    }

    useEffect (() => {
        const fetchData = async () => {
            try {
                const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) {
                    console.error(sessionError);
                }
                const user = sessionData?.session.user;
                
                if(user) {
                    const { data: employeeData, error: employeeError} = await supabase
                    .from('employee_t')
                    .select('*')
                    .eq('employeeemail', user.email);
    
                if (employeeError) throw employeeError;
    
                setUsername(`${employeeData[0].fname} ${employeeData[0].lname}`);
                setEmail(employeeData[0].employeeemail);
                
                const companyID = employeeData[0].companyid; 
    
                const { data: companyData, error: companyError } = await supabase 
                .from('company_t')
                .select('companyname')
                .eq('companyid', companyID)
                .single();
                
                if (companyError)  throw companyError;
    
                setCompanyName(companyData.companyname);
    
                }
            } catch (err){
                console.error('Error cant get data', err);
            }
        };
        fetchData();
    }, []);
    
    return (
        <div>
            <SideNav/>
            <div className="notif">
                <i class="bi bi-bell-fill" onClick={handleNotification}></i>
                {showNotification && <Notification/>}
            </div>
            <div className="user-profile">
            <i class="bi bi-person"></i>
            <span> Username: { username }</span>
            <p> companyName: { companyName } </p> 
            <p>Email: { email } </p>
    
            </div>
        </div>
    );
};

export default Profile;