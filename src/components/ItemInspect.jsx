import React from 'react';
import "../styles/ItemInspect.css";


const ItemInspect = ({ show, onClose, item }) => {
    if (!show) {
        return null;
    }
    console.log(item.product_t.image_path);
    return (
        <div className="inspect-modal-overlay">
            <div className="inspect-modal-content">
                <div className="inspect-modal-content_left">
                    <img src={item.product_t.image_path} alt="" />

                </div>
                <div className="inspect-modal-content_right">
                    <h2>{item.product_t.product_name}</h2>
                    <p>Category: {item.product_t.category}</p>
                    <p>Quantity: {item.product_t.product_quantity}</p>
                    <p>Sold: {item.productSale}</p>
                    <p>Price: ${item.product_t.product_price}.00</p>
                    <p>Supplier: {item.product_t.suppliername}</p>
                    <p>Date Added: {item.product_t.dateadded}</p>
                </div>
            </div>

                <button onClick={onClose}>Close</button>
            
        </div>
    );
};

export default ItemInspect;
