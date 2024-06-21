import Logo from '../styles/images/logo.png';
import Footer from '../components/Footer'
import { NavLink, Link } from 'react-router-dom';
import "../styles/login.css"
import loginimg from "../styles/images/6.png"

const Login = () => {
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
        <form>
          <div class="input-container">
            <i class="bi bi-envelope input-icon"></i>
            <input class="input-login" type="text" placeholder="Your business email"/>
          </div>
          <div class="input-container">
            <i class="bi bi-unlock input-icon"></i>
            <input class="input-password" type="password" placeholder="Your password"/>
          </div>
          <p>No account? No Problem <a href="">Sign up here!</a></p>
          <button class="BtnSubmit" type="submit">Login</button>
        </form>
        <img class="imgbackground" src={loginimg} alt="123"/>
      </div>

        <Footer/>
        </>
    )
}

// const { data, error } = await supabase.auth.signUp({
//   email: 'example@email.com',
//   password: 'example-password',
//   options: {
//     data: {
//       first_name: 'John',
//       age: 27,
//     },
//   },
// })

export default Login;
