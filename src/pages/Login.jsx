import { NavLink, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../styles/images/logo.png';
import Footer from '../components/Footer';
import "../styles/login.css";
import loginimg from "../styles/images/6.png";
import supabase from '../client/database';

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
          setError('Email not verified. Please confirm your email before logging in');
        } else {
          setError('Password does not match, please check your credentials and try again.');
        }
        console.error('Authentication error:', authError);
        setLoading(false);
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
        setLoading(false);
        return;
      }

      if (!userData.STATUS) {
        setError('Account restricted at the moment');
        setLoading(false);
        return;
      }

      console.log("User data fetched successfully:", userData);

      navigate("/dashboard");

    } catch (err) {
      console.error('Login error:', err.message);
      setError('Login failed, please try again later.');
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div className="login-main-container">
      <>
        <header>
          <div className="Logosect">
            <img className="Logo" src={Logo} alt="stockwise-logo" />
            <h2 className="Logotxt">StockWise</h2>
          </div>
          <nav className="Navbar">
            <NavLink exact to="/" className="Navbar-active" activeClassName="Navbar-active">Home</NavLink>
            <NavLink to="/contacts" className="Navbar-active" activeClassName="Navbar-active">Contacts</NavLink>
            <NavLink to="/aboutus" className="Navbar-active" activeClassName="Navbar-active">About us</NavLink>
          </nav>
          <div className="Login-Register">
            <Link to="/login"><button className="Login">Login</button></Link>
            <Link to="/registration"><button className="Register">Register</button></Link>
          </div>
        </header>

        <div className="login">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            {error && <p className='error-msg'>{error}</p>}
            <div className="input-container">
              <i className="bi bi-envelope"></i>
              <input className="input-login"
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Your business email"
              />
            </div>
            <div className="input-container">
              <i className="bi bi-lock-fill"></i>
              <input className="input-password"
                type="password"
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Your password"
              />
            </div>
            <p>No account? No problem <a href="/registration">Sign up here!</a></p>
            <button className="BtnSubmit" type="submit">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <img className="imgbackground" src={loginimg} alt="123" />
        </div>

        <Footer />
      </>
    </div>
  )
};

export default Login;
