import "../styles/UpdateModal.css";


const UpdateModal = ({show, item, onClose}) => {


    if (!show) {
        return null;
    }

    console.log(item);
    return (
        <div className="update-modal-overlay">
            <div className="update-modal-content">

                <div className="update-modal-content_left">
                    <img src={item.product_t.image_path} alt="" />
                </div>

                <div className="update-modal-content_right">
                    <div className="update-close">
                            <i onClick={onClose} class="bi bi-x-lg"></i>
                    </div>

                    <p>SUPPLIER NAME</p>
                        <input name="suppliername" className="update-input-container" placeholder={item.product_t.suppliername} required/>

                    <p>PRODUCT QUANTITY</p>
                        <input name="quantity" className="update-input-container" placeholder={item.product_t.product_quantity}  required/>

                    <p>PRODUCT NAME</p>
                        <input name="productname" className="update-input-container" placeholder={item.product_t.product_name}  required/>
                
                    <p>CATEGORY</p>
                        <input name="category" className="update-input-container" placeholder={item.product_t.category}  required/>

                    <p>PRODUCT PRICE</p>
                        <input name="price" className="update-input-container" placeholder={item.product_t.product_price}  required/>

                    <p>NO. PRODCUTS SOLD</p>
                        <input name="sale" className="update-input-container" placeholder={item.productSale}  required/>

                    <p>ITEM IMAGE</p>
                        <input name="sale" className="update-img-input-container" type="file"required/>
                        
                    <div className="update-Btns">
                        <button className='update-Btnfirst'>Update</button>
                        <button className='update-Btnsecond' onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateModal;
