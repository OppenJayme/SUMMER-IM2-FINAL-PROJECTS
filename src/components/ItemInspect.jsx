import React, { useState} from 'react';
import "../styles/ItemInspect.css";
import supabase from '../client/database';
import UpdateModal from "../components/UpdateModal";


const ItemInspect = ({ show, onClose, item }) => {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showUpdateModal, setUpdateModal] = useState(false)
    const [ItemInspectError, setInspectError] = useState(false)



    const deleteInventory = async () => {
        setDeleteLoading(true)
        try {
            const {error: deleteInventoryError} = await supabase
            .from('inventory_t')
            .delete()
            .eq('productid', item.product_t.productid);
            
            if (deleteInventoryError) {
                console.log('Error deleting inventory:', deleteInventoryError);
                setInspectError('Error deleting inventory');
                setDeleteLoading(false);
                return;
            }

            const {error: deleteProductError} = await supabase
            .from('product_t')
            .delete()
            .eq('productid', item.product_t.productid);

            if (deleteProductError) {
                console.log('Error deleting product:', deleteProductError);
                setInspectError('Error deleting product');
                setDeleteLoading(false);
                return;
            }

            alert('Product and Inventory succesfully deleted')
            onClose();

        } catch (err) {
            console.err(err.message)
        } finally {
            setDeleteLoading(false);
        }
    }

    const openUpdate = () => {
        setUpdateModal(true);
    }
   
    if (!show) {
        return null;
    }

    if (showUpdateModal) {   
        return (
            <UpdateModal 
            show = {showUpdateModal}
            item = {item}
            onClose = {() => setUpdateModal(false)} 
            />
        )
    }
    return (
        <div className="inspect-modal-overlay">
            <div className="inspect-modal-content">
                <div className="inspect-modal-content_left">
                    <img src={item.product_t.image_path} alt="" />
                </div>

                <div className="inspect-modal-content_right">
                    <div className="close">
                            <i onClick={onClose} class="bi bi-x-lg"></i>
                    </div>
                        {ItemInspectError && <p>{ItemInspectError}</p>}
                        <h2>{item.product_t.product_name}</h2>
                        <p>Category: {item.product_t.category}</p>
                        <p>Quantity: {item.product_t.product_quantity}</p>
                        <p>Sold: {item.productSale}</p>
                        <p>Price: ${item.product_t.product_price}.00</p>
                        <p>Supplier: {item.product_t.suppliername}</p>
                        <p>Date Added: {item.product_t.dateadded}</p>
                    <div className="Btns">
                        <button className='Btnfirst' onClick={openUpdate}>Update</button>
                        <button className='Btnsecond' onClick={deleteInventory} disabled ={deleteLoading}>
                            {deleteLoading ? 'Deleting Product..' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemInspect;
