import React, { useState, useEffect } from "react";
import "../styles/UpdateModal.css";
import supabase from "../client/database";

const UpdateModal = ({ show, item, onClose, onUpdate }) => {
  const [hovered, setHovered] = useState(false);
  const [supplierName, setSupplierName] = useState('');
  const [prodQuantity, setProdQuantity] = useState('');
  const [prodName, setProdName] = useState('');
  const [category, setCategory] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodSold, setProdSold] = useState('');
  const [error, setError] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);

  useEffect(() => {
    if (item) {
      setSupplierName(item.product_t.suppliername || '');
      setProdQuantity(item.product_t.product_quantity || '');
      setProdName(item.product_t.product_name || '');
      setCategory(item.product_t.category || '');
      setProdPrice(item.product_t.product_price || '');
      setProdSold(item.productSale || '');
    }
  }, [item]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getSession();
      if (userError) {
        console.log('Failed getting user Data:', userError);
        setError('Failed getting user Data');
        return;
      }
      const user = userData?.session.user;

      const { data: employeeData, error: employeeError } = await supabase
        .from('employee_t')
        .select('employeeid')
        .eq('employeeemail', user.email)
        .single();

      if (employeeError) {
        console.log('Failed to fetch employee data:', employeeError);
        setError('Failed to fetch employee data');
        return;
      }

      const fetchedEmployeeID = employeeData.employeeid;
      const oldProdId = item.product_t.productid;

      const oldImagePath = item.product_t.image_path;
      const oldFileName = oldImagePath.split('/').pop();

      if (newImage) {
        const { error: imageError } = await supabase.storage
          .from('Products Image')
          .update(`Images/${oldFileName}`, newImage, {
            cacheControl: '3600',
            upsert: true
          });

        if (imageError) {
          console.log('Error updating image:', imageError);
          setError('Error in updating image');
          return;
        }
      }
      const imagePath = newImage
        ? `https://gsnildikcufttbrexwwt.supabase.co/storage/v1/object/public/Products%20Image/Images/${oldFileName}`
        : item.product_t.image_path;


      const initialQuantity = parseFloat(item.product_t.initial_quantity);
      const newQuantity = parseFloat(prodQuantity) - parseFloat(prodSold);
      const quantityStatus = newQuantity < (initialQuantity * 0.10) ? 'low' : 'high';
      const {error: productUpdateError } = await supabase
        .from('product_t')
        .update({
          suppliername: supplierName || item.product_t.suppliername,
          product_quantity: newQuantity || item.product_t.product_quantity,
          product_name: prodName || item.product_t.product_name,
          category: category || item.product_t.category,
          product_price: prodPrice || item.product_t.product_price,
          dateadded: new Date().toISOString() || item.product_t.dateadded,
          image_path: imagePath,
          quantity_status: quantityStatus,
          initial_quantity: prodQuantity,
        })
        .eq('productid', oldProdId)
        .single();

      if (productUpdateError) {
        console.log('Failed to update product:', productUpdateError);
        setError('Failed to Update Product, try again later');
        return;
      }

      const inventoryID = item.inventoryid;
      const employeeID = fetchedEmployeeID;
      const { error: inventoryUpdateError } = await supabase
        .from('inventory_t')
        .update({
          employeeid: employeeID,
          inventorydate: new Date().toISOString(),
          productSale: prodSold,
        })
        .eq('inventoryid', inventoryID)
        .single();

      if (inventoryUpdateError) {
        console.log('Failed to Update Inventory:', inventoryUpdateError);
        setError('Failed to Update Inventory, try again later');
        return;
      }
      setError('');
      onUpdate({
        ...item,
        product_t: {
          ...item.product_t,
          suppliername: supplierName || item.product_t.suppliername,
          product_quantity: prodQuantity || item.product_t.product_quantity,
          product_name: prodName || item.product_t.product_name,
          category: category || item.product_t.category,
          product_price: prodPrice || item.product_t.product_price,
          image_path: imagePath,
        },
        productSale: prodSold,
      });
      onClose();
    } catch (err) {
      console.error(err.message);
      setError('Database Error')
      return;
    } finally {
      setLoading(false)
    }
  }

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
    setShowFileInput(true);
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0])
  }

  return (
    <div className="update-modal-overlay">
      <div className="update-modal-content">

        <div className="update-modal-content_left">
          <div className="image-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img src={newImage ? URL.createObjectURL(newImage) : item.product_t.image_path} alt="" />
            {hovered && (
              <button className="replace-image-btn" onClick={handleReplaceImage}>Replace Image</button>
            )}
            {showFileInput && (
              <input type="file" onChange={handleFileChange} />
            )}
          </div>
        </div>

        <div className="update-modal-content_right">

          <form onSubmit={handleUpdate}>
            {error && <p className="error-message">{error}</p>}
            <p>SUPPLIER NAME</p>
            <input
              name="suppliername"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className="update-input-container"
              placeholder={item.product_t.suppliername}
            />

            <p>PRODUCT QUANTITY</p>
            <input
              name="quantity"
              value={prodQuantity}
              onChange={(e) => setProdQuantity(e.target.value)}
              className="update-input-container"
              placeholder={item.product_t.product_quantity}
            />

            <p>PRODUCT NAME</p>
            <input
              name="productname"
              value={prodName}
              onChange={(e) => setProdName(e.target.value)}
              className="update-input-container"
              placeholder={item.product_t.product_name}
            />

            <p>CATEGORY</p>
            <input
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="update-input-container"
              placeholder={item.product_t.category}
            />

            <p>PRODUCT PRICE</p>
            <input
              name="price"
              value={prodPrice}
              className="update-input-container"
              onChange={(e) => setProdPrice(e.target.value)}
              placeholder={item.product_t.product_price}
            />

            <p>NO. PRODUCTS SOLD</p>
            <input
              name="sale"
              value={prodSold}
              onChange={(e) => setProdSold(e.target.value)}
              className="update-input-container"
              placeholder={item.productSale}
            />

            <div className="update-Btns">
              <button className="update-Btnfirst" type="submit">
                {loading ? 'Updating...' : 'Update'}
              </button>
              <button className="update-Btnsecond" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
