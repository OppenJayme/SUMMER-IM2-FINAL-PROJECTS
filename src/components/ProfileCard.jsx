import React, { useState, useEffect } from 'react';
import supabase from '../client/database';
import "../styles/ProfileCard.css";
import ProfileUpdateModal from "../components/ProfileUpdateModal";
import Ivan from "../styles/images/Ivan.jpg";


const ProfileModal = ({ handleClose }) => {
    const [showProfileUpdateModal, setProfileUpdateModal] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [contacts, setContacts] = useState('');
    const [datecreated, setDatecreated] = useState('');

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
                    setContacts(employeeData.employeecontact);
                    setDatecreated(employeeData.date_created);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const openProfileUpdateModal = () => {
        setProfileUpdateModal(true);
    }

    if (showProfileUpdateModal){
        return (
            <ProfileUpdateModal
                show={showProfileUpdateModal}
                onClose={()=> setProfileUpdateModal(false)}
            />
        )
    }

    return (
        <div className="profile-modal">
                <div className="user-profile-container">

                
                    <div className="profile-picture-holder">
                        <img src={Ivan} alt="Profile" />

                        <div className="edit-container">
                            <i class="bi bi-pencil-square" onClick={openProfileUpdateModal}></i>
                        </div>

                        <div className="close-profile-modal">
                            <i class="bi bi-x-lg" onClick={handleClose}></i>
                        </div>

                    </div>

                    <div className="profile-details">
                        <h1>{username}</h1>
                        <p>Email: {email}</p>
                        <p>Contact Number: {contacts}</p>
                        <p>Date Registered: {datecreated}</p>
                    </div>

                    <div className="socials">
                        <a href="/"><i class="bi bi-facebook"></i></a>
                        <a href="/"><i class="bi bi-instagram"></i></a>
                        <a href="/"><i class="bi bi-twitter-x"></i></a>
                        <a href="/"><i class="bi bi-linkedin"></i></a>
                    </div>

                </div>
        </div>
    );
};

export default ProfileModal;
