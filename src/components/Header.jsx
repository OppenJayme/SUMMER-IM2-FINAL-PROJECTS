import Logo from '../styles/images/logo.png';
import { Link, NavLink } from "react-router-dom";
import "../styles/home.css";
const Header = () => {
    return (
        <header>
                <div className="Logosect">
                    <img className="Logo" src={Logo} alt="stockwise-logo" />
                    <h2 className="Logotxt">StockWise</h2>
                </div>
                <nav className="Navbar">
                    <NavLink
                        exact
                        to="/"
                        className={({ isActive }) => isActive ? "Navbar-active" : ""}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/contacts"
                        className={({ isActive }) => isActive ? "Navbar-active" : ""}
                    >
                        Contacts
                    </NavLink>
                    <NavLink
                        to="/aboutus"
                        className={({ isActive }) => isActive ? "Navbar-active" : ""}
                    >
                        About us
                    </NavLink>
                </nav>
                <div className="Login-Register">
                    <Link to="/login"><button className="Login">Login</button></Link>
                    <Link to="/registration"><button className="Register">Register</button></Link>
                </div>
            </header>
    )
}

export default Header;