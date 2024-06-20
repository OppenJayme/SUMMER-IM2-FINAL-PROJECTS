import Footer from '../components/Footer'
import { NavLink, Link } from 'react-router-dom';

const About = () => {

    return (
        <div>
        <header>
                <div className="Logosect">
                    <img className="Logo" src="logo.png" alt="stockwise-logo"/>
                    <h2 className="Logotxt">StockWise</h2>
                </div>
                <nav className="Navbar">
                    <NavLink exact to="/" className="Navbar-active" activeClassName="Navbar-active">Home</NavLink>
                    <NavLink to="/contacts" className="Navbar-active" activeClassName="Navbar-active">Contacts</NavLink>
                    <NavLink to="/aboutus" className="Navbar-active" activeClassName="Navbar-active">About us</NavLink>
                </nav>
                <div className="Login-Register">
                    <Link to ="/login"><button className="Login">Login</button></Link>
                    <Link to = "/registration"><button className="Register">Register</button></Link>
                </div>
            </header>
        <Footer/>
    </div>
    )
}

export default About;
