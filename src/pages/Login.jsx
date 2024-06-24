import { NavLink, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../styles/images/logo.png';
import Footer from '../components/Footer'
import "../styles/login.css"
import loginimg from "../styles/images/6.png"
import supabase from '../client/database';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    const {data: authData, error: authError} = await supabase.auth.signInWithPassword({
      email , 
      password,
    });

    if (authError && !authData) {
      setError('Authentication Error, Try again')
      console.log(authError);
      return;
    }

    const {data: userData, error: userError} = await supabase 
    .from('employee_t')
    .select('*')
    .eq('employeeemail', email)
    .single();

    if(userError || !userData) {
      setError('User not found');
      console.log(userError);
      await supabase.auth.signOut();
      return;
    }

    console.log("User logged in succesfully");
    navigate("/dashboard");
  };



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
        {error && <p>{error}</p>}
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
