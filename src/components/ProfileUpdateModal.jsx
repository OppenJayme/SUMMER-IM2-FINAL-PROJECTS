import React, { useState, useEffect } from "react";
import "../styles/profileupdatemodal.css";
import supabase from "../client/database";
import no_image from "../styles/images/placeholderimage.webp";

const ProfileUpdate = ({ onClose, profileInstances }) => {
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [contactNumber, setContactNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [profileUpdateError, setProfileUpdateError] = useState('');
    const [imageData, setImageData] = useState({
        imagePath: null
    });

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                console.error(sessionError);
                setLoading(false);
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
                    setLoading(false);
                    return;
                }

                setImageData(prevData => ({ ...prevData, imagePath: data.image_path }));
                
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleFile = (e) => {
        setNewProfilePic(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                console.error(sessionError);
                setLoading(false);
                return;
            }

            const user = sessionData?.session?.user;
            let imagePath_to_upload = imageData.imagePath;

            if (newProfilePic) {
                const {  error: uploadError } = await supabase
                    .storage
                    .from('Profile Picutres')
                    .upload(`Images/${newProfilePic.name}`, newProfilePic, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) {
                    console.error('Error uploading image:', uploadError);
                    setLoading(false);
                    return;
                }

                if (profileInstances.image_path) {
                    const oldImage_path = profileInstances.image_path;
                    const fileName = oldImage_path.split("/").pop();
    
                    const { error: imageError } = await supabase
                        .storage
                        .from("Profile Picutres")
                        .remove([`Images/${fileName}`]);
    
                    if (imageError) {
                        console.log("Error deleting image:", imageError);
                        setProfileUpdateError("Error deleting image");
                        setLoading(false);
                        return;
                    }
                }

                imagePath_to_upload = `https://gsnildikcufttbrexwwt.supabase.co/storage/v1/object/public/Profile%20Picutres/Images/${newProfilePic.name}`;
            }
            const { error: updateError } = await supabase
                .from('employee_t')
                .update({
                    employeecontact: contactNumber ? contactNumber : profileInstances.employeecontact,
                    image_path: imagePath_to_upload,
                })
                .eq('employeeemail', user.email);

            if (updateError) {
                console.error('Error updating profile:', updateError);
                setLoading(false);
                return;
            }

            alert('Profile updated successfully! Reload to view changes');
            onClose();
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="profileUpdate-modal-overlay">
                <div className="profileUpdate-modal-content">
                    <div className="profileUpdateModal-top">
                        <img src={newProfilePic ? URL.createObjectURL(newProfilePic) : (imageData.imagePath || no_image)} alt="Profile" />
                    </div>

                    <form className="pfp-update-form" onSubmit={handleSubmit}>
                        {profileUpdateError && (<p>{profileUpdateError}</p>)}
                        <div className="profileUpdateModal-bottom">
                            <h1>Update Profile</h1>

                            <p>Contact Number</p>
                            <input 
                                type="text" 
                                value={contactNumber}
                                defaultValue={contactNumber}
                                placeholder= {profileInstances.employeecontact}
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
