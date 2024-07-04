import React, { useState } from "react";
import "../styles/ItemInventoryCard.css";
import supabase from "../client/database";

const AddProduct = ({ showModal, handleCloseModal }) => {
    const [supplierName, setSupplierName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [sale, setSales] = useState('');
    const [error, setError] = useState(null);

    const addProduct = async () => {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
            console.error(sessionError);
        }

        const user = sessionData?.session.user;

        if (user) {
            const { data: employeeData, error: employeeError } = await supabase
                .from('employee_t')
                .select('companyid, employeeid')
                .eq('employeeemail', user.email)
                .single();

        if (employeeError) throw employeeError;
        
        
        const { data: productData , error } = await supabase
        .from('product_t')
        .insert([
            {
                suppliername: supplierName,
                product_quantity: quantity,
                product_name: productName,
                category: category,
                product_price: price
            }
        ])
        .select('productid')
        .single();
        
        if (error) {
            setError('Nothing to insert into database. Try again');
            console.error(error);
            return;
        } 
        
        const companyID = employeeData.companyid;
        const employeeID = employeeData.employeeid;
        const productID = productData.productid;


        const {inventoryData, error: inventoryError} = await supabase
        .from('inventory_t')
        .insert([{
            companyid : companyID ,
            productid : productID ,
            employeeid : employeeID ,
            productSale : sale
        },
        ])
        .single();
        console.log(inventoryData);

        if(inventoryError) {
            setError('Trouble creating Inventory. Try again later')
            console.error(inventoryError)
            return;
        }

        setError('');
        handleCloseModal();
        }
    }

    if (!showModal) return null;

    return (
        <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h5 className="modal-title">Add Item</h5>
                    <button className="close-button" onClick={handleCloseModal}>×</button>
                </div>
                <div className="modal-body">
                    {error && <p className="error-message">{error}</p>}
                    <p>SUPPLIER NAME</p>
                    <input
                        name="suppliername"
                        className="input-container"
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                        required
                    />
                    <p>PRODUCT QUANTITY</p>
                    <input
                        name="quantity"
                        className="input-container"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                    <p>PRODUCT NAME</p>
                    <input
                        name="productname"
                        className="input-container"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                    <p>CATEGORY</p>
                    <input
                        name="category"
                        className="input-container"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <p>PRODUCT PRICE</p>
                    <input
                        name="price"
                        className="input-container"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                     <p>NO. PRODCUTS SOLD</p>
                    <input
                        name="sale"
                        className="input-container"
                        value={sale}
                        onChange={(e) => setSales(e.target.value)}
                        required
                    />
                </div>
                <div className="modal-footer">
                    <button className="button" onClick={handleCloseModal}>Close</button>
                    <button className="button primary" onClick={addProduct}>Save changes</button>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
