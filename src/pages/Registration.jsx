import '../styles/registration.css'
import supabase from '../client/database';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Register = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [companyID, setCompanyID] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const { data, error } = await supabase
        .from('employee_t')
        .insert([
        {  fname: firstName,
            lname: lastName,
            employeeemail: email,
            employeecontact: contactNumber,
            companyid: companyID},
        ])
        .select()
        
        if (error) {
            setError('An error has occured. Please try again');
            console.log(error)
        } else {
            setError('');
            console.log('user registered succesfully', data)
            navigate('/login');
        }
    };

    return (
      <>
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
       <div className="register-container">
        <div className="left-register">
        <h1>BEGIN MANAGING YOUR COMPANY'S INVENTORY WITH STOCKWISE</h1>
        <div className="photos">
            <div className="photo">Photo 1</div>
            <div className="photo">Photo 2</div>
            <div className="photo">Photo 3</div>
            <div className="photo">Photo 4</div>
        </div>
        <h2>We're here to help!</h2>
        </div>
        <div className="right-register">
        <h1>Registration</h1>
        <form onSubmit={handleSubmit}>
      <div className="input-group">
        <div className="input-group1">
          <label htmlFor="firstName">First Name</label>
          <input
            className="inputBox"
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="input-group2">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="inputBox"
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="input-group">
        <div className="input-group3">
          <label htmlFor="email">Email</label>
          <input
            className="inputBox"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group2">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            className="inputBox"
            type="tel"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="input-group">
        <div className="input-group1">
          <label htmlFor="companyID">Company ID</label>
          <input
            className="inputBox"
            type="text"
            id="companyID"
            value={companyID}
            onChange={(e) => setCompanyID(e.target.value)}
            required
          />
        </div>
      </div>
      <button className="BtnSignup" type="submit">Sign Up</button>
      {error && <p>{error}</p>}
    </form>
        </div>
    </div>
    <Footer/>
      </>
           
    )
}

export default Register;
