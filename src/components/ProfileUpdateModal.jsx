import React, { useState, useEffect } from "react";
import "../styles/profileupdatemodal.css";
import supabase from "../client/database";
import no_image from "../styles/images/placeholderimage.webp";

const ProfileUpdate = ({ onClose }) => {
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [contactNumber, setContactNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageData, setImageData] = useState({
        imagePath: null
    });

    useEffect(() => {
        setLoading(true);
       try {
        const fetchData = async () => {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                console.error(sessionError);
                return;
            }

            const user = sessionData?.session?.user;
            if (user) {
                const { data, error } = await supabase
                    .from('employee_t')
                    .select('image_path, employeecontact')
                    .eq('employeeemail', user.email)
                    .single();

                if (error) {
                    console.error('Error fetching profile data:', error);
                    return;
                }

                setImageData(prevData => ({ ...prevData, imagePath: data.image_path }));
                setContactNumber(data.employeecontact || '');
            }
        };

        fetchData();
       } catch (err) {
        console.log(err.message)
        return;
       } finally {
        setLoading(false);
       }
    }, []);

    const handleFile = (e) => {
        setNewProfilePic(e.target.files[0]);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                console.error(sessionError);
                return;
            }

            const user = sessionData?.session?.user;
            let imagePath = imageData.imagePath;
            const fileName = `${newProfilePic.name}`;

            if (newProfilePic) {
                const { error: uploadError } = await supabase
                    .storage
                    .from('Profile Picutres')
                    .upload(`Images/${fileName}`, newProfilePic, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) {
                    console.error('Error uploading image:', uploadError);
                    return;
                }

                imagePath = "https://gsnildikcufttbrexwwt.supabase.co/storage/v1/object/public/Profile%20Picutres/Images/";
            }

            const path_name_to_employee = imagePath + fileName;
            const { error: updateError } = await supabase
                .from('employee_t')
                .update({
                    employeecontact: contactNumber,
                    image_path: path_name_to_employee,
                })
                .eq('employeeemail', user.email);

            if (updateError) {
                console.error('Error updating profile:', updateError);
                return;
            }

            alert('Profile updated successfully!');
            onClose();
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <>
            <div className="profileUpdate-modal-overlay">
                <div className="profileUpdate-modal-content">
                    <div className="profileUpdateModal-top">
                        <img src={imageData.imagePath || no_image} alt="Profile" />
                    </div>

                    <form className="pfp-update-form" onSubmit={handleSubmit}>
                        <div className="profileUpdateModal-bottom">
                            <h1>Update Profile</h1>

                            <p>Contact Number</p>
                            <input 
                                type="text" 
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                            />

                            <p>New Image</p>
                            <input 
                                className="image-input" 
                                type="file" 
                                onChange={handleFile}
                            />

                            <div className="profileUpdate-Btns">
                                <button 
                                    className="profileUpdate-Btnfirst" 
                                    type="submit" 
                                >
                                {loading ? 'Updating' : 'Update'}
                                </button>

                                <button 
                                    className="profileUpdate-Btnsecond" 
                                    type="button" 
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProfileUpdate;
