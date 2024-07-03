import SideNav from "../components/SideNav";
import "../styles/items.css";
const Items = () => {
    return (
        <>
        <SideNav/>
        <div className="item_content">
            <div className="item_content_container">
                <div className="search-container">
                    <i class="bi bi-search"></i>
                    
                    <div className="search_box_container">
                        <input className="search-box" type="text" placeholder="Search"/>
                        <i class="bi bi-plus-square-fill"></i>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    );
}   
export default  Items;
