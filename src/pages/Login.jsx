import { NavLink, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../styles/images/logo.png';
import Footer from '../components/Footer'
import "../styles/login.css"
import loginimg from "../styles/images/6.png"
import supabase from '../client/database';
import LoadingScreen from '../components/LoadingScreen';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const { user, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        if (authError.message === "Email not confirmed") {
          setError('Email not verified. Please Confirm your email before logging in');
        } else {  
          setError('Password does not match , please check your credentials and try again.');
        }
        console.error('Authentication error:', authError);
        return;
      }

      console.log("User logged in successfully:", user);

      const { data: userData, error: userError } = await supabase
        .from('employee_t')
        .select('*')
        .eq('employeeemail', email)
        .single();

      if (userError || !userData) {
        setError('User data not found');
        console.error('User data error:', userError);
        return;
      }

      console.log("User data fetched successfully:", userData);

      navigate("/dashboard");

    } catch (err) {
      console.error('Login error:', err.message);
      setError('Login failed, please try again later.');
    }
    
    setLoading(false)
  };


  if (loading) {
    return <LoadingScreen/>
  }

    return (
        <>
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

        <div class="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        {error && <p className='error-msg'>{error}</p>}
          <div class="input-container">
            <i class="bi bi-envelope"></i>
            <input class="input-login"  
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Your business email"
            />
          </div>
          <div class="input-container">
            <i class="bi bi-lock-fill"></i>
            <input class="input-password" 
            type="password" 
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Your password"/>
          </div>
          <p>No account? No Problem <a href="/registration">Sign up here!</a></p>
          <button class="BtnSubmit" type="submit">Login</button>
        </form>
        <img class="imgbackground" src={loginimg} alt="123"/>
      </div>

        <Footer/>
        </>
    )
}


export default Login;
