import logoimg from "../styles/images/logo.png"
import '../styles/registration.css'
import supabase from '../client/database';
import {  useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Register = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const [companyID, setCompanyID] = useState('');
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const maxRetries = 5;
        let success = false;

        if (attempts < maxRetries && !success) {
          try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
              email: email,
              password: password,
          });
          if (authError && !authData) {
            throw authError;
          }

          const { data, error } = await supabase
          .from('employee_t')
          .insert([
          {  fname: firstName,
              lname: lastName,
              employeeemail: email,
              employeecontact: contactNumber,
              employeePassword: password,
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

        } catch (err) {
          if (err.message.includes("Email rate limit exceeded")) {
            setAttempts(attempts => attempts + 1);
            const backoffTime = Math.pow(2, attempts) * 1000; // Exponential backoff
            console.log(`Retrying signup in ${backoffTime / 1000} seconds...`);
            await delay(backoffTime);
        } else {
            setError('Registration Error, Try again');
            console.log(err);
            return;
        }
          }
    }
    if (!success) {
      setError('Registration Error due to rate limit. Please try again later.');
  }

       
};

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
          <label htmlFor="employeePass">Password</label>
          <input
            className="inputBox"
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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



/* 
<-----------Double Check lang ni nga Code Kay sakto ang CSS ani-------------->
<form onSubmit={handleSubmit}>

      <div className="input-group">
        <div className="input-group1">
          <label htmlFor="firstName"><i class="bi bi-person-fill"></i> First Name</label>
          <input className="inputBox" type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
        </div>

        <div className="input-group2">
          <label htmlFor="lastName"><i class="bi bi-person-fill-up"></i> Last Name</label>
          <input className="inputBox" type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
        </div>
      </div>

      <div className="input-group">
        <div className="input-group1">
          <label htmlFor="email"><i class="bi bi-envelope-at-fill"></i> Email</label>
          <input className="inputBox" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>

        <div className="input-group2">
          <label htmlFor="contactNumber"><i class="bi bi-telephone-fill"></i> Contact Number</label>
          <input className="inputBox" type="tel" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required/>
        </div>
      </div>

      <div className="input-group">
        <div className="input-group1">
          <label htmlFor="companyID"><i class="bi bi-postcard-fill"></i> Company ID</label>
          <input className="inputBox" type="text" id="companyID" value={companyID} onChange={(e) => setCompanyID(e.target.value)} required/>
        </div>

        <div className="input-group2">
          <label htmlFor="employeePass"><i class="bi bi-lock-fill"></i> Password</label>
          <input className="inputBox" type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
      </div>

      <button className="BtnSignup" type="submit">Sign Up</button>
      {error && <p>{error}</p>}
    </form> 
<-----------Double Check lang ni nga Code-------------->
*/

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
