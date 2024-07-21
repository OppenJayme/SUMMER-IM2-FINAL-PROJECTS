import "../styles/inventorycard.css";

const InventoryCard = ({ item, onInspect }) => {
    const changeColorByStatus = (status) => {
        return status === 'low' ? { color: 'red' } : { color: 'green' };
    }

    return (
        <div>
            <div className="inventory-card" onClick={onInspect}>
                <div className="table-box0"><p>{item.product_t.product_name}</p></div>
                <div className="table-box1"><p>{item.product_t.category}</p></div>
                <div className="table-box2"><p className="centeredps">{item.product_t.product_quantity} {item.product_t.quantity_status === 'low' && (<i style={{ color: 'red', padding : '5px' }} className="bi bi-exclamation-triangle-fill"></i>)}</p></div>
                <div className="table-box3"><p>{item.productSale} / {item.product_t.initial_quantity}</p></div>
                <div className="table-box4"><p className="centeredps" style={changeColorByStatus(item.product_t.quantity_status)}>{item.product_t.quantity_status}</p></div>
                <div className="table-box5"><p className="centeredps">{item.product_t.status}</p></div>
                <div className="table-box6"><p>₱ {item.product_t.product_price}.00</p></div>
            </div>
        </div>
    );
};

export default InventoryCard;
