import React from 'react';
import "../styles/ItemInspect.css";


const ItemInspect = ({ show, onClose, item }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{item.product_t.product_name}</h2>
                <p>Category: {item.product_t.category}</p>
                <p>Quantity: {item.product_t.product_quantity}</p>
                <p>Sold: {item.productSale}</p>
                <p>Price: ${item.product_t.product_price}.00</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ItemInspect;
