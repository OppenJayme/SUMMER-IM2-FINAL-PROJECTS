import "../styles/inventorycard.css"

const InventoryCard = ({ item }) => {
    return (
        <div className="inventory-card">
            <div className="table-box"><p> {item.product_t.product_name}</p></div>
            <div className="table-box"><p> {item.product_t.category}</p></div>
            <div className="table-box"><p> {item.product_t.product_quantity}</p></div>
            <div className="table-box"><p> {item.productSale} / {item.product_t.product_quantity}</p></div>
            <div className="table-box"><p>$ {item.product_t.product_price}.00</p></div>
        </div>
    );
};

export default InventoryCard;
