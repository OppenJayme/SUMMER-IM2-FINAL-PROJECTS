import "../styles/inventorycard.css";

const InventoryCard = ({ item , onInspect }) => {
    

 
    return (
        <div>
            <div className="inventory-card" onClick={onInspect}>
                <div className="table-box"><p>{item.product_t.product_name}</p></div>
                <div className="table-box"><p>{item.product_t.category}</p></div>
                <div className="table-box"><p>{item.product_t.product_quantity}</p></div>
                <div className="table-box"><p>{item.productSale} / {item.product_t.product_quantity}</p></div>
                <div className="table-box"><p>Type/high or Low</p></div>
                <div className="table-box"><p>{item.product_t.status}</p></div>
                <div className="table-box"><p>₱ {item.product_t.product_price}.00</p></div>
            </div>
           
        </div>
    );
};

export default InventoryCard;