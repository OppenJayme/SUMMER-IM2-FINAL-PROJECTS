import img from "../styles/images/7.png"
import logoimg from "../styles/images/logo.png"
import '../styles/companyregister.css'
// import supabase from '../client/database';
// import {  useState} from 'react';
// import { useNavigate } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../components/Footer';

const CompReg = () => {
    return (
        <>
            <header>
                <div className="Logosect">
                    <img className="Logo" src={logoimg} alt="stockwise-logo"/>
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


                <div className="content-container" >
                    <div className="left-container">
                        <h1>SIGN UP YOUR COMPANY WITH US!</h1>
                            <form action="">
                                <div className="input-group">
                                    <div className="input-group1">
                                        <label htmlFor="companyName"><i class="bi bi-person-fill"></i> Company Name</label>
                                        <input className="inputBox" type="text" id="companyName"/>
                                    </div>

                                    <div className="input-group2">
                                        <label htmlFor="CompanyContact"><i class="bi bi-person-fill-up"></i> Contact Number</label>
                                        <input className="inputBox" type="text" id="CompanyContact"/>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <div className="input-group1">
                                        <label htmlFor="email"><i class="bi bi-envelope-at-fill"></i> Email</label>
                                        <input className="inputBox" type="email" id="email"/>
                                    </div>

                                    <div className="input-group2">
                                        <label htmlFor="contactNumber"><i class="bi bi-telephone-fill"></i> Contact Number</label>
                                        <input className="inputBox" type="text" id="contactNumber"/>
                                    </div>
                                </div>
                                <button className="BtnProceed" type="submit">Proceed</button>
                            </form>
                    </div>
                    <div className="right-container">
                        <img className="rightimg" src={img} alt="img" />
                    </div>
                </div>
            <Footer/>
        </>
    )
}

export default CompReg;
