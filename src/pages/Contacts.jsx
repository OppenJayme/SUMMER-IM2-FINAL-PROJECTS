import Logo from '../styles/images/logo.png';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../components/Footer'
import '../styles/contacts.css';
import charles from '../styles/images/charles.jpg'
import ivan from '../styles/images/ivan.jpg';
import yousif from '../styles/images/yousif.jpg';
import reitz from '../styles/images/reitz.jpg';

const Contacts = () => {

    return (
        <div>
            <header>
                <div className="Logosect">
                    <img className="Logo" src={Logo} alt="stockwise-logo"/>
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
            <div className="contact-us-container">
                <div className='img-container'>
                    <img className='img-profile' src={charles}></img>
                    <div className="text-container">
                        <h1>CHARLES BENEDICT BOQUECOSA</h1>
                        <h2>FullStack dev</h2>
                    </div>
                </div>
                <div className='img-container'>
                    <img className='img-profile' src={reitz}></img>
                    <div className="text-container">
                        <h1>RIETZ DAVE ANDRIANO</h1>
                        <h2>FullStack dev</h2>
                    </div>
                </div>
                <div className='img-container'>
                    <img className='img-profile' src={ivan}></img>
                    <div className="text-container">
                        <h1>IVAN JAYME</h1>
                        <h2>FullStack dev</h2>
                    </div>
                </div>
                <div className='img-container'>
                    <img className='img-profile' src={yousif}></img>
                    <div className="text-container">
                        <h1>YOUSIF QUIRICO CEBALLOS</h1>
                        <h2>FullStack dev</h2>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Contacts;
