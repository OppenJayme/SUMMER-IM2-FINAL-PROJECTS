import React from "react";
import "../styles/ItemInventoryCard.css";


const ItemInventoryCard = ({ showModal, handleCloseModal, children }) => {
    if (!showModal) return null;

    return (
        <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h5 className="modal-title">Add Item</h5>
                    <button className="close-button" onClick={handleCloseModal}>×</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button className="button" onClick={handleCloseModal}>Close</button>
                    <button className="button primary">Save changes</button>
                </div>
            </div>
        </div>
    );
}

export default ItemInventoryCard;
