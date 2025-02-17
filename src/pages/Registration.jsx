import firstImg from '../styles/images/Charles.jpg';
import secondImg from '../styles/images/Yousif.jpg';
import thirdImg from '../styles/images/Ivan.jpg';
import fourthImg from '../styles/images/Reitz.PNG';


import logoimg from "../styles/images/logo.png"
import '../styles/registration.css'
import supabase from '../client/database';
import {  useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

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
    const [loading, setLoading] = useState(false);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const maxRetries = 5;
      let success = false;
      setLoading(true)
  
      if (attempts < maxRetries && !success) {
        try {
          
          // Email verification checker
          const { data: existingEmployee, error: errorCheck } = await supabase
            .from('employee_t')
            .select('employeeemail')
            .eq('employeeemail', email);
          
          if (errorCheck) {
            throw errorCheck;
          }
          
          // If user already exists
          if (existingEmployee && existingEmployee.length > 0) {
            console.error('Email is already used');
            setLoading(false);
            alert('This email has already been used');
            return;
          }
  
          // Sign up user in Auth
          const { user, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
          });
  
          if (authError && !user) {
            console.error('Error signing up user:', authError);
            setLoading(false);
            throw authError || new Error('User not created');
          }
          

          // Insert user into the employee table
          const { data: insertData, error: insertError } = await supabase
            .from('employee_t')
            .insert([
              {
                fname: firstName,
                lname: lastName,
                employeeemail: email,
                employeecontact: contactNumber,
                employeepassword: password,
                companyid: companyID,
                date_created: new Date().toISOString(),
              },
            ])
            .single();
  
          if (insertError) {
            console.error('Error inserting user data:', insertError);
            setError('Error registering user')
            setLoading(false);
            throw insertError;
          }
  
          setError('');
          console.log('User registered successfully', insertData);
          navigate('/login');
          success = true;
  
        } catch (err) {
          if (err.message.includes("Email rate limit exceeded")) {
          setAttempts(prevAttempts => prevAttempts + 1);
          const backoffTime = Math.pow(2, attempts) * 1000;
          console.log(`Retrying signup in ${backoffTime / 1000} seconds...`);
          setError(`Too many requests. Retrying signup in ${backoffTime / 1000} seconds...`);
          await delay(backoffTime);
          setLoading(false);
        } else {
          setError('Registration Error, Try again');
          return;
        }
      }
    }
    setLoading(false);
      if (!success) {
        setError('Registration Error due to rate limit. Please try again later.');
      }
    };

    if (loading) {
      return <LoadingScreen/>
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
       <div className="register-container">
        <div className="left-register">
        <h1>BEGIN MANAGING YOUR COMPANY'S INVENTORY WITH STOCKWISE</h1>
        <div className="photos">
            <img class="first" src={firstImg} alt="Yousep.img" />
            <img class="second" src={secondImg} alt="Reitz.img" />
            <img class="third" src={thirdImg} alt="Charles.img" />
            <img class="fourth" src={fourthImg} alt="Ivan.img" />
        </div>
        <h2>We're here to help!</h2>
        </div>

           
        <div className="right-register">
        <h1>Registration</h1>

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
          <label htmlFor="companyID"><i class="bi bi-postcard-fill"></i>Enter Company NO.</label>
          <input className="inputBox" type="text" id="companyID" value={companyID} onChange={(e) => setCompanyID(e.target.value)} required/>
        </div>

        <div className="input-group2">
          <label htmlFor="employeePass"><i class="bi bi-lock-fill"></i> Password</label>
          <input className="inputBox" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
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
