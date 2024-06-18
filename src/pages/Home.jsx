import {Link, NavLink} from "react-router-dom";
import "../styles/home.css";

const Home = () => {
    return (
            <header>
                <div className="Logosect">
                    <img className="Logo" src="logo.png" alt=""/>
                    <h2 className="Logotxt">StockWise Inventory</h2>
                </div>
                <nav className="Navbar">
                    <NavLink exact to="/" className="Navbar-active" activeClassName="Navbar-active">Home</NavLink>
                    <NavLink to="/contacts" className="Navbar-active" activeClassName="Navbar-active">Contacts</NavLink>
                    <NavLink to="/aboutus" className="Navbar-active" activeClassName="Navbar-active">About us</NavLink>
                    <button className="Login"> <Link to ="/login">Login</Link></button>
                    <button className="Register">Register</button>
                </nav>
            </header>
    );
};

export default Home;
