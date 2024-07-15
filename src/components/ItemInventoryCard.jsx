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
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const handleFile = (e) => {
        setImage(e.target.files[0]);
    }

    const addImage = async (file) => {
        const {data: imageData, error} = await supabase.storage
        .from('Products Image')
        .upload(`Images/${file.name}`, file ,{
            cacheControl: '3600',
            upsert: false
        });

            if (error || !imageData) {
                console.error("Error uploading image:", error.message);
                throw error;
            } 
            
        const {data: { publicUrl }} = supabase.storage
        .from('Products Image')
        .getPublicUrl(`Images/{file.name}`);

        return publicUrl;
    }

    const addProduct = async () => {
        setImageLoading(true);

        try {
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

        let imagePath = null;
        if (image) {
            imagePath = await addImage(image);
            console.log(imagePath)
        }
        
        
        const { data: productData , error } = await supabase
        .from('product_t')
        .insert([
            {
                suppliername: supplierName,
                product_quantity: quantity,
                product_name: productName,
                category: category,
                product_price: price,
                image_path: 'https://gsnildikcufttbrexwwt.supabase.co/storage/v1/object/public/Products%20Image/Images/' + image.name
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


        const {error: inventoryError} = await supabase
        .from('inventory_t')
        .insert([{
            companyid : companyID ,
            productid : productID ,
            employeeid : employeeID ,
            productSale : sale, 
            inventorydate: new Date().toISOString(),
        },
        ])
        .single();

        if(inventoryError) {
            setError('Trouble creating Inventory. Try again later')
            console.error(inventoryError)
            return;
        }

        setError('');
        handleCloseModal();
        }

        } catch (err) {
            setError(err.message)
            console.error(err.message)
            return;
        } finally {
            setImageLoading(false);
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
                    <input name="suppliername"
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

                    <p>ITEM IMAGE</p>
                    <input
                        name="sale"
                        className="img-input-container"
                        type="file"
                        onChange={handleFile}
                        required
                    />

                </div>

                <div className="modal-footer">
                    <button className="firstBtn" onClick={handleCloseModal}>Close</button>
                    <button className="secondBtn" onClick={addProduct} disabled={imageLoading}>
                        {imageLoading ? 'Saving' : 'Save Product'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
