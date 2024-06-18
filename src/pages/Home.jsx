import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import "../styles/home.css";
import Contacts from "./Contacts";
import About from "./AboutUs";

const Home = () => {
    return (
        <BrowserRouter>
            <header>
                <div className="Logosect">
                    <img className="Logo" src="logo.png" alt=""/>
                    <h2 className="Logotxt">StockWise</h2>
                </div>
                <nav className="Navbar">
                    <NavLink exact to="/" className="Navbar-active" activeClassName="Navbar-active">Home</NavLink>
                    <NavLink to="/contacts" className="Navbar-active" activeClassName="Navbar-active">Contacts</NavLink>
                    <NavLink to="/aboutus" className="Navbar-active" activeClassName="Navbar-active">About us</NavLink>
                    <button className="Login">Login</button>
                    <button className="Register">Register</button>
                </nav>
            </header>
            <Routes>
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/aboutus" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Home;
