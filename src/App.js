import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import Contacts from "./pages/Contacts";
import About from "./pages/AboutUs";
import Login from "./pages/Login"
import Register from "./pages/Registration"
import Dashboard from "./pages/Dashboard";
import CompReg from "./pages/CompanyRegister"
import Items from "./pages/Items"
import Transactions from "./pages/Transaction";
import ActLogs from "./pages/ActivityLogs";

function App() {
  return (
    <Router>
      <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/aboutus" element={<About />}  />
                <Route path="/login"  element = {<Login/>}/>
                <Route path="/registration"  element = {<Register/>}/>
                <Route path="/dashboard" element = {<Dashboard/>} />
                <Route path="/companyregister" element = {<CompReg/>} /> 
                <Route path="/items" element = {<Items/>} />
                <Route path="/transactions" element = {<Transactions/>} />
                <Route path = "/activitylogs" element = {<ActLogs/>} />
    </Routes>
    </Router>
  );
}
export default App;
