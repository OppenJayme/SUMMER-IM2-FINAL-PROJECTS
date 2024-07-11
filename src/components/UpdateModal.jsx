import React, { useState } from 'react';
import "../styles/UpdateModal.css";
import supabase from '../client/database';


const updateModal = () => {
    return (
        <div className="update-modal-overlay">
            <div className="update-modal-content">

                <div className="update-modal-content_left">
                    <img src={item.product_t.image_path} alt="" />
                </div>

                <div className="update-modal-content_right">
                    <div className="update-close">
                            <i onClick={onClose} class="bi bi-x-lg"></i>
                    </div>

                    <p>SUPPLIER NAME</p>
                        <input name="suppliername" className="update-input-container" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} required/>

                    <p>PRODUCT QUANTITY</p>
                        <input name="quantity" className="update-input-container" value={quantity} onChange={(e) => setQuantity(e.target.value)} required/>

                    <p>PRODUCT NAME</p>
                        <input name="productname" className="update-input-container" value={productName} onChange={(e) => setProductName(e.target.value)} required/>
                
                    <p>CATEGORY</p>
                        <input name="category" className="update-input-container" value={category} onChange={(e) => setCategory(e.target.value)} required/>

                    <p>PRODUCT PRICE</p>
                        <input name="price" className="update-input-container" value={price} onChange={(e) => setPrice(e.target.value)} required/>

                    <p>NO. PRODCUTS SOLD</p>
                        <input name="sale" className="update-input-container" value={sale} onChange={(e) => setSales(e.target.value)} required/>

                    <p>ITEM IMAGE</p>
                        <input name="sale" className="update-img-input-container" type="file" onChange={handleFile}required/>
                        
                    <div className="update-Btns">
                        <button className='update-Btnfirst' onClick={onClose}>Update</button>
                        <button className='update-Btnsecond' onClick={deleteInventory} disabled ={deleteLoading}>
                            {deleteLoading ? 'Updating Product..' : 'Update'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default updateModal;
