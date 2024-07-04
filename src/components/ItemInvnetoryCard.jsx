import "../styles/inventorycard.css"

const InventoryCard = ({ item }) => {
    return (
        <div className="inventory-card">
            <h2>{item.product_t.product_name}</h2>
            <p>Category: {item.product_t.category}</p>
            <p>Quantity: {item.product_t.product_quantity}</p>
            <p>Sold: {item.productSale}/ {item.product_t.product_quantity}</p>
            <p>Price: ${item.product_t.product_price}</p>
        </div>
    );
};

export default InventoryCard;
