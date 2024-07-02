import Logo from '../styles/images/logo.png';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../components/Footer'
import '../styles/contacts.css';
import charles from '../styles/images/Charles.jpg'
import ivan from '../styles/images/Ivan.jpg';
import yousif from '../styles/images/Yousif.jpg';
import reitz from '../styles/images/Reitz.PNG';

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
                    <img className='img-profile' src={charles} alt='charles-pic' />
                    <div className="text-container">
                        <h1>Yousif Qurico Ceballos</h1>
                        <h2>FullStack developer</h2>
                        <span><i class="bi bi-envelope"></i>yousifceballos@gmail.com</span>
                    </div>
                </div>
                <div className='img-container'>
                    <img className='img-profile' src={reitz}alt='reitz-pic' />
                    <div className="text-container">
                        <h1>Reitz Div Andriano</h1>
                        <h2>FullStack developer</h2>
                        <span><i class="bi bi-envelope"></i>reitzdave.andriano@gmail.com</span>
                    </div>
                </div>
                <div className='img-container'>
                    <img className='img-profile' src={ivan} alt='ivan-pic' />
                    <div className="text-container">
                        <h1>Ivan Jayme</h1>
                        <h2>FullStack developer</h2>
                        <span><i class="bi bi-envelope"></i>jaymekyerivan@gmail.com</span>
                    </div>
                </div>
                <div className='img-container'>
                    <img className='img-profile' src={yousif} alt='yousif-pic'/>
                    <div className="text-container">
                        <h1> Chales Benedict Boquecosa</h1>
                        <h2>FullStack developer</h2>
                        <span><i class="bi bi-envelope"></i>charlesbenedictboquecosa@gmail.com</span>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Contacts;
