import React, { useState, useEffect } from 'react';
import supabase from '../client/database';
import "../styles/ProfileCard.css";

const ProfileModal = ({ handleClose }) => {
    const [username, setUsername] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) {
                    console.error(sessionError);
                }
                const user = sessionData?.session?.user;

                if (user) {
                    const { data: employeeData, error: employeeError } = await supabase
                        .from('employee_t')
                        .select('*')
                        .eq('employeeemail', user.email)
                        .single();
                    if (employeeError) throw employeeError;

                    setUsername(`${employeeData.fname} ${employeeData.lname}`);
                    setEmail(employeeData.employeeemail);

                    const companyID = employeeData.companyid;

                    const { data: companyData, error: companyError } = await supabase
                        .from('company_t')
                        .select('companyname')
                        .eq('companyid', companyID)
                        .single();
                    if (companyError) throw companyError;

                    setCompanyName(companyData.companyname);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <div className="user-profile">
                    <i className="bi bi-person"></i>
                    <span>Username: {username}</span>
                    <p>Company: {companyName}</p>
                    <p>Email: {email}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
