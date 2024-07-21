import React, { useState, useEffect } from 'react';
import supabase from '../client/database';
import "../styles/ProfileCard.css";
import ProfileUpdateModal from "../components/ProfileUpdateModal";
import no_image from "../styles/images/placeholderimage.webp";

const ProfileModal = ({ handleClose }) => {
    const [showProfileUpdateModal, setProfileUpdateModal] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [contacts, setContacts] = useState('');
    const [datecreated, setDatecreated] = useState('');
    const [profilePic, setProfilePic] = useState(no_image);
    const [loading, setLoading] = useState(true);

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

                    const imagePath = employeeData.image_path;
                    if (imagePath) {
                        setProfilePic(imagePath);
                    }
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false); 
            }
        };
        fetchData();
    }, []);

    const openProfileUpdateModal = () => {
        setProfileUpdateModal(true);
    }

    if (showProfileUpdateModal) {
        return (
            <ProfileUpdateModal
                show={showProfileUpdateModal}
                onClose={() => setProfileUpdateModal(false)}
            />
        );
    }

    if (loading) {
        return (
            <div className="profile-modal">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    console.log(profilePic)

    return (
        <div className="profile-modal">
            <div className="user-profile-container">
                <div className="profile-picture-holder">
                    <img src={profilePic || no_image} alt="Profile" />

                    <div className="edit-container">
                        <i className="bi bi-pencil-square" onClick={openProfileUpdateModal}></i>
                    </div>

                    <div className="close-profile-modal">
                        <i className="bi bi-x-lg" onClick={handleClose}></i>
                    </div>
                </div>

                <div className="profile-details">
                    <h1>{username}</h1>
                    <p>Email: {email}</p>
                    <p>Contact Number: {contacts}</p>
                    <p>Date Registered: {datecreated}</p>
                </div>

                <div className="socials">
                    <a href="/"><i className="bi bi-facebook"></i></a>
                    <a href="/"><i className="bi bi-instagram"></i></a>
                    <a href="/"><i className="bi bi-twitter-x"></i></a>
                    <a href="/"><i className="bi bi-linkedin"></i></a>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
