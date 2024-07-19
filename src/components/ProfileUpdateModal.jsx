import React, { useState, useEffect } from "react";
import "../styles/profileupdatemodal.css";
import supabase from "../client/database";
import Ivan from "../styles/images/Ivan.jpg";

const ProfileUpdate =({onClose}) => {
    return (
        <>
            <div className="profileUpdate-modal-overlay">
                <div className="profileUpdate-modal-content">
                    <div className="profileUpdateModal-top">
                        <img src={Ivan} alt="" />
                    </div>

                    <div className="profileUpdateModal-bottom">
                        <h1>Link Social Media Accounts</h1>

                            <p><i class="bi bi-link-45deg"></i>Contact Number </p>
                            <input type="text" />

                            <p><i class="bi bi-link-45deg"></i>Facebook</p>
                            <input type="email" />
                            

                            <p><i class="bi bi-link-45deg"></i>Instagram</p>
                            <input type="text" />

                            <p><i class="bi bi-link-45deg"></i>X</p>
                            <input type="text" />

                            <p><i class="bi bi-link-45deg"></i>LinkedIn</p>
                            <input type="text" />

                            <p>New Image</p>
                            <input className="image-input" type="file" />
                            

                        <div className="profileUpdate-Btns">
                            <button className="profileUpdate-Btnfirst" type="submit">
                                Update
                            </button>

                            <button className="profileUpdate-Btnsecond" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                            
                    </div>

                </div>
            </div>
        </>
    )
}
export default ProfileUpdate;