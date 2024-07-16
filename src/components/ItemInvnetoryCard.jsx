import React, { useState } from 'react';
import "../styles/inventorycard.css";
import ItemInspect from "../components/ItemInspect";

const InventoryCard = ({ item }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div>
            <div className="inventory-card" onClick={handleShow}>
                <div className="table-box"><p>{item.product_t.product_name}</p></div>
                <div className="table-box"><p>{item.product_t.category}</p></div>
                <div className="table-box"><p>{item.product_t.product_quantity}</p></div>
                <div className="table-box"><p>{item.productSale} / {item.product_t.product_quantity}</p></div>
                <div className="table-box"><p>₱ {item.product_t.product_price}.00</p></div>
            </div>
            <ItemInspect show={showModal} onClose={handleClose} item={item} />
        </div>
    );
};

export default InventoryCard;