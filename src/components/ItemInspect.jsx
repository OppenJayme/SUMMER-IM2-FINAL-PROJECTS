import React, { useState } from 'react';
import "../styles/ItemInspect.css";
import supabase from '../client/database';
import UpdateModal from "../components/UpdateModal";

const ItemInspect = ({ show, onClose, item }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showUpdateModal, setUpdateModal] = useState(false);
  const [ItemInspectError, setInspectError] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(item);

  const deleteInventory = async () => {
    setDeleteLoading(true);
    try {
      const { error: deleteInventoryError } = await supabase
        .from('inventory_t')
        .delete()
        .eq('productid', item.product_t.productid);

      if (deleteInventoryError) {
        console.log('Error deleting inventory:', deleteInventoryError);
        setInspectError('Error deleting inventory');
        setDeleteLoading(false);
        return;
      }

      const imagePath = item.product_t.image_path;
      const fileName = imagePath.split('/').pop();

      const { error: imageError } = await supabase
        .storage
        .from('Products Image')
        .remove([`Images/${fileName}`]);

      if (imageError) {
        console.log('Error deleting image:', imageError);
        setInspectError('Error deleting image');
        setDeleteLoading(false);
        return;
      }

      const { error: deleteProductError } = await supabase
        .from('product_t')
        .delete()
        .eq('productid', item.product_t.productid);

      if (deleteProductError) {
        console.log('Error deleting product:', deleteProductError);
        setInspectError('Error deleting product');
        setDeleteLoading(false);
        return;
      }

      alert('Product and Inventory successfully deleted');
      onClose();

    } catch (err) {
      console.error(err.message);
    } finally {
      setDeleteLoading(false);
    }
  }

  const openUpdate = () => {
    setUpdateModal(true);
  }

  const handleUpdate = (updatedItem) => {
    setUpdatedItem(updatedItem);
  }

  if (!show) {
    return null;
  }

  if (showUpdateModal) {
    return (
      <UpdateModal
        show={showUpdateModal}
        item={updatedItem}
        onClose={() => setUpdateModal(false)}
        onUpdate={handleUpdate}
      />
    )
  }
  return (
    <div className="inspect-modal-overlay">
      <div className="left-arrow">
        <i className="bi bi-caret-left-fill"></i>
      </div>
      <div className="inspect-modal-content">
        <div className="inspect-modal-content_left">
          <img src={updatedItem.product_t.image_path} alt="" />
        </div>

        <div className="inspect-modal-content_right">
          <div className="close">
            <i onClick={onClose} className="bi bi-x-lg"></i>
          </div>
          {ItemInspectError && <p>{ItemInspectError}</p>}
          <h2>{updatedItem.product_t.product_name}</h2>
          <p>Category: {updatedItem.product_t.category}</p>
          <p>Quantity: {updatedItem.product_t.product_quantity}</p>
          <p>Sold: {updatedItem.productSale}</p>
          <p>Price: ${updatedItem.product_t.product_price}.00</p>
          <p>Supplier: {updatedItem.product_t.suppliername}</p>
          <p>Date Added: {updatedItem.product_t.dateadded}</p>
          <div className="Btns">
            <button className='Btnfirst' onClick={openUpdate}>Update</button>
            <button className='Btnsecond' onClick={deleteInventory} disabled={deleteLoading}>
              {deleteLoading ? 'Deleting Product..' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
      <div className="right-arrow">
        <i className="bi bi-caret-right-fill"></i>
      </div>
    </div>
  );
};

export default ItemInspect;
