import React, { useState, useEffect} from "react";
import SideNav from "../components/SideNav";
import AddProducts from "../components/ItemInventoryCard"; // Make sure the import path is correct
import InventoryCard from "../components/ItemInvnetoryCard";
import "../styles/items.css";
import "../styles/ItemInventoryCard.css";
import supabase from "../client/database";

const Items = () => {
    const [inventory, setInventory] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchInventory = async () => {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                console.error(sessionError);
                return;
            }

            const user = sessionData?.session.user;

            if (user) {
                const { data: employeeData, error: employeeError } = await supabase
                    .from('employee_t')
                    .select('companyid')
                    .eq('employeeemail', user.email)
                    .single();

                if (employeeError) throw employeeError;

                const companyID = employeeData.companyid;

                const { data: inventoryData, error } = await supabase
                    .from('inventory_t')
                    .select('*, product_t(product_name, category, product_quantity, product_price)')
                    .eq('companyid', companyID);

                if (error) {
                    setError('Could not fetch database. Please try again later');
                    console.log(error);
                    setInventory([]);
                } else {
                    setInventory(inventoryData);
                    setError(null);
                }
            }
        };
        fetchInventory();
    }, []);

   

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    return (
        <>
            <SideNav />
            <div className="item_content">
                <div className="item_content_container">
                    {error && <h1>{error}</h1>}
                    <div className="search-container">
                        <i className="bi bi-search"></i>
                        <div className="search_box_container">
                            <input className="search-box" type="text" placeholder="Search" />
                            <i className="bi bi-plus-square-fill" onClick={handleShowModal}></i>
                        </div>
                    </div>
                    <div className="main-content-area">
                        {inventory.map(item => (
                            <InventoryCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        

            <AddProducts showModal={showModal} handleCloseModal={handleCloseModal}/>
        </>
    );
};

export default Items;
