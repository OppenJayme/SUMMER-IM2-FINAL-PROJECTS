
import Logo from '../styles/images/logo.png';
import Footer from '../components/Footer'
import { NavLink, Link } from 'react-router-dom';
import "../styles/aboutus.css"

const About = () => {
    return (
        <div>
            <header>
                <div className="Logosect">
                    <img className="Logo" src={Logo} alt="stockwise-logo"/>
                    <h2 className="Logotxt">StockWise</h2>
                </div>
                <nav className="Navbar">
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'Navbar-active' : '')}>Home</NavLink>
                    <NavLink to="/contacts" className={({ isActive }) => (isActive ? 'Navbar-active' : '')}>Contacts</NavLink>
                    <NavLink to="/aboutus" className={({ isActive }) => (isActive ? 'Navbar-active' : '')}>About us</NavLink>
                </nav>
                <div className="Login-Register">
                    <Link to="/login"><button className="Login">Login</button></Link>
                    <Link to="/registration"><button className="Register">Register</button></Link>
                </div>
            </header>
        
                <div class="pic-container">
                    {/* <div class="slideshow">
                        <div class="slide active" style="background-image: url('./pictures/GettyImages-142227958_optimized.jpg');"></div>
                        <div class="slide" style="background-image: url('./pictures/For-website-image-8.png');"></div>
                        <div class="slide" style="background-image: url('./pictures/Web_150DPI-20190927_10th_Floor_Conference_Room_2_v1.jpg');"></div>
                    </div> */}
                </div>
                
                <button href="#register" class="BtnRegister">Register Company</button>
                <div class="text-container">
                    <h1>ABOUT US</h1>
                    <p>StockWise stands at the forefront of Inventory Management Systems IMS, dedicated to revolutionizing how businesses manage their inventory. With a keen focus on efficiency, precision, and profitability, StockWise offers a comprehensive suite of tools and features tailored to meet the diverse needs of businesses across industries. At StockWise, we are committed to excellence in every aspect of our platform. From user experience to functionality, we strive to deliver a seamless and intuitive inventory management solution that empowers businesses to thrive in today's competitive marketplace. Our cloud-based platform harnesses the power of cutting-edge technology to provide businesses with unparalleled flexibility, scalability, and accessibility. With StockWise, you can access your inventory data anytime, anywhere, from any device, ensuring that you stay connected and in control at all times. StockWise is equipped with a wide range of robust features designed to streamline and optimize every aspect of inventory control. From real-time inventory tracking to customizable stock alerts, our platform empowers businesses to make informed decisions, minimize stockouts, and maximize profitability.</p>
                </div>
                
            <Footer/>
        </div>
    )
}

export default About;
