import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import InventoryCard from "../components/ItemInvnetoryCard";
import "../styles/items.css";
import supabase from "../client/database";
const Items = () => {
    const [inventory, setInventory] = useState(null)
    const [error, setError] = useState(null);


    useEffect (() => {
        const fetchInventory = async () => {

            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) {
                    console.error(sessionError);
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

            const {data: inventoryData, error} = await supabase 
                .from('inventory_t')
                .select('*, product_t(product_name, category, product_quantity, product_price)')
                .eq('companyid', companyID)

                if(error) {
                    setError('Could not fetch database. Please try again later')
                    console.error(error)
                    setInventory(null);
                }
                if (inventoryData) {
                    setInventory(inventoryData)
                    setError(null);
                }
            }

        }
        fetchInventory();
    }, [])
    return (
        <>
        <SideNav/>
        <div className="item_content">
            <div className="item_content_container">

                <div className="search-container">
                    <i class="bi bi-search"></i>
                    
                    <div className="search_box_container">
                        <input className="search-box" type="text" placeholder="Search"/>
                        <i class="bi bi-plus-square-fill"></i>
                    </div>
                    
                </div>
<<<<<<< HEAD
                {error && <h1>{error}</h1>}
                <InventoryCard key = {inventory} inventory={inventory}/>
=======
<<<<<<< HEAD
                
=======
                <InventoryCard/>
>>>>>>> 4639192d7000deb55ae6eb0f1c73d67bd8b4a0e6
>>>>>>> fa1b1d7571d13f2e9b7ec155240f7f97c0bf362d
            </div>
        </div>
        </>
    );
}   
export default  Items;
