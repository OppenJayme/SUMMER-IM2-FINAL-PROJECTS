import { BrowserRouter, Link , Routes, Route} from "react-router-dom"
import "../styles/home.css"
import Contacts from "./Contacts"
import About from "./AboutUs"


const Home = () => {
    return (
        <BrowserRouter>
        <header>
             <div className="Logosect">
                 <img className="Logo" src="logo.png" alt=""/>
                 <h2 className="Logotxt">StockWise</h2>
             </div>
             <nav className="Navbar">
                 <Link className="Navbar-active" to="/">Home</Link>
                 <Link to = "/contacts">Contacts</Link>
                 <Link to = "/aboutus">About us</Link>
                 <button className="Login">Login</button>
                 <button className="Register">Register</button>
             </nav>
         </header>
         <Routes>
        <Route path="/create" element={<Contacts />} />
        <Route path="/aboutus" element={<About />} />
         </Routes>
        </BrowserRouter>
    )
}
export  default Home;

