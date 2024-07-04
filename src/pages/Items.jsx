import React, { useState } from "react";
import SideNav from "../components/SideNav";
import ItemInventoryCard from "../components/ItemInventoryCard"
import "../styles/ItemInventoryCard.css";
import "../styles/items.css";

const Items = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <SideNav/>
            <div className="item_content">
                <div className="item_content_container">
                    <div className="search-container">
                        <i className="bi bi-search"></i>
                        <div className="search_box_container">
                            <input className="search-box" type="text" placeholder="Search"/>
                            <i className="bi bi-plus-square-fill" onClick={handleShowModal}></i>
                        </div>
                    </div>
                </div>
            </div>

            <ItemInventoryCard showModal={showModal} handleCloseModal={handleCloseModal}>
            <div className="modal-body">
                <p>PRODUCT ID</p>
                <input className="input-container"></input>
                <p>SUPPLIER NAME</p>
                <input className="input-container"></input>
                <p>DATE ADDED</p>
                <input className="input-container"></input>
            </div>    
            </ItemInventoryCard>
        </>
    );
}

export default Items;
