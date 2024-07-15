import React, { useState } from "react";
import "../styles/UpdateModal.css";

const UpdateModal = ({ show, item, onClose }) => {
  const [hovered, setHovered] = useState(false);

  if (!show) {
    return null;
  }

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleReplaceImage = () => {
    // Handle image replacement logic here
    console.log("Replace image clicked");
  };

  return (
    <div className="update-modal-overlay">
      <div className="update-modal-content">

        <div className="update-modal-content_left">
          <div className="image-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img src={item.product_t.image_path} alt="image" />
            {hovered && (
              <button className="replace-image-btn" onClick={handleReplaceImage}>Replace Image</button>
            )}
          </div>
        </div>

        <div className="update-modal-content_right">
          <div className="update-close">
            <i onClick={onClose} class="bi bi-arrow-right"></i>
          </div>

          <p>SUPPLIER NAME</p>
          <input
            name="suppliername"
            className="update-input-container"
            placeholder={item.product_t.suppliername}
          />

          <p>PRODUCT QUANTITY</p>
          <input
            name="quantity"
            className="update-input-container"
            placeholder={item.product_t.product_quantity}
          />

          <p>PRODUCT NAME</p>
          <input
            name="productname"
            className="update-input-container"
            placeholder={item.product_t.product_name}
          />

          <p>CATEGORY</p>
          <input
            name="category"
            className="update-input-container"
            placeholder={item.product_t.category}
          />

          <p>PRODUCT PRICE</p>
          <input
            name="price"
            className="update-input-container"
            placeholder={item.product_t.product_price}
          />

          <p>NO. PRODCUTS SOLD</p>
          <input
            name="sale"
            className="update-input-container"
            placeholder={item.productSale}
          />

          <div className="update-Btns">
            <button className="update-Btnfirst">Update</button>
            <button className="update-Btnsecond" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
