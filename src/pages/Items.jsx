import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import AddProducts from "../components/AddProducts"; 
import InventoryCard from "../components/ItemInventoryCard";
import "../styles/items.css";
import "../styles/ItemInventoryCard.css";
import supabase from "../client/database";
import LoadingScreen from "../components/LoadingScreen";
import Notification from "../components/Notification";
import ItemInspect from "../components/ItemInspect";

const Items = () => {
    const [inventory, setInventory] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showNotification, setNotification] = useState(false);
    const [showInspectModal, setShowInspectModal] = useState(false);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    useEffect(() => {
        const fetchInventory = async () => {
           try {
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
                    .select('*, product_t(*)')
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

           } catch (err) {
                console.error(err)
           } finally {
            setLoading(false);
           }
        };
        fetchInventory();

        const inventorySubscription = supabase
        .channel('inventory_t')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'inventory_t' }, payload => {
            console.log('Change Received', payload);
            fetchInventory();
        })
        .subscribe();

        return () => {
            supabase.removeChannel(inventorySubscription);
        };

    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSearchQuery = (e) => setSearchQuery(e.target.value);

    const filterInventory = inventory.filter(item => 
        item.product_t.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product_t.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.product_t.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <LoadingScreen />;
    }

    const handleNotification = () => {
        setNotification(prev => !prev);
    };

    const handleOpenInspect = (index) => {
        setCurrentItemIndex(index);
        setShowInspectModal(true);
    };

    const handleCloseInspect = () => setShowInspectModal(false);

    const handleNextItem = () => {
        setCurrentItemIndex((prevIndex) => (prevIndex + 1) % filterInventory.length);
    };

    const handlePrevItem = () => {
        setCurrentItemIndex((prevIndex) => (prevIndex - 1 + filterInventory.length) % filterInventory.length);
    };

    

    return (
        <>
            <SideNav />
            <div className="notif">
                <i className="bi bi-bell-fill" onClick={handleNotification}></i>
                {showNotification && <Notification />}
            </div>
            <div className="item_content">
                <div className="item_content_container">
                    {error && <h1>{error}</h1>}
                    <div className="search-container">
                        <i className="bi bi-search"></i>
                        <div className="search_box_container">
                            <input 
                            className="search-box" 
                            type="text" 
                            placeholder="Search by Product Name or Category" 
                            value={searchQuery}
                            onChange={handleSearchQuery}
                            />
                            <i className="bi bi-plus-square-fill" onClick={handleShowModal}></i>
                        </div>
                    </div>
                    <div className="main-content-area">
                    <div className="inventory-card-categories">
                            <div className="table-box-categories"><p>Product Name </p></div>
                            <div className="table-box-categories"><p>Category </p></div>
                            <div className="table-box-categories"><p>Current Quantity </p></div>
                            <div className="table-box-categories"><p>Items Sold </p></div>
                            <div className="table-box-categories"><p>Status </p></div>
                            <div className="table-box-categories"><p>Type </p></div>
                            <div className="table-box-categories"><p>Price</p></div>
                        </div>
                        {filterInventory.map((item, index) => (
                            <InventoryCard key={item.id} item={item} onInspect={() => handleOpenInspect(index)} />
                        ))}
                    </div>
                </div>
            </div>
            <AddProducts showModal={showModal} handleCloseModal={handleCloseModal} />
            {showInspectModal && (
                <ItemInspect
                    show={showInspectModal}
                    onClose={handleCloseInspect}
                    item={filterInventory[currentItemIndex]}
                    onNext={handleNextItem}
                    onPrev={handlePrevItem}
                />
            )}
        </>
    );
};

export default Items;
