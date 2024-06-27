import SideNav from "../components/SideNav";
import "../styles/items.css";
const Items = () => {
    return (
        <>
        <SideNav/>
        <div className="items-text">ITEMS</div>
         <div className="search-container">
                <input className="search-box" type="text" placeholder="Search"/>
            </div>
        </>
    );
}   
export default  Items;
