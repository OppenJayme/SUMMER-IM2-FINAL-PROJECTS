import img from "../styles/images/7.png"
import logoimg from "../styles/images/logo.png"
import '../styles/companyregister.css'
import { useNavigate } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import supabase from '../client/database.js'
import { useState } from "react";

const CompReg = () => {
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyContact, setCompanyContact] = useState('');
    const [error, setError] = useState('');


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {data, error} = await supabase
        .from('company_t')
        .insert([
            {
                companyname: companyName,
                companyemail: companyEmail,
                companycontact: companyContact
            }
        ])
        .select()

        if (error) {
            setError('An error has occured. Please try again');
            console.log(error);
        } else {
            setError('');
            console.log('company registered successfully', data);
            navigate('/');
        }
    }

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
                            <form onSubmit={handleSubmit}>
                            {error && <p>{error}</p>}
                                <div className="input-group">
                                    <div className="input-group1">
                                        <label htmlFor="companyName"><i class="bi bi-person-fill"></i> Company Name</label>
                                        <input className="inputBox" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} id="companyName"/>
                                    </div>

                                    <div className="input-group2">
                                        <label htmlFor="CompanyContact"><i class="bi bi-person-fill-up"></i> Contact Number</label>
                                        <input className="inputBox" type="text" value={companyContact} onChange={(e) => setCompanyContact(e.target.value)} id="CompanyContact"/>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <div className="input-group1">
                                        <label htmlFor="email"><i class="bi bi-envelope-at-fill"></i> Email</label>
                                        <input className="inputBox" type="email" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} id="email"/>
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
