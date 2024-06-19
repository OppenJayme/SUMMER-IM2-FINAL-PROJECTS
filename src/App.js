import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import Contacts from "./pages/Contacts";
import About from "./pages/AboutUs";
import Login from "./pages/Login"

function App() {
  return (
    <Router>
      <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/aboutus" element={<About />}  />
                <Route path="/login"  element = {<Login/>}/>
    </Routes>
    </Router>
  );
}
export default App;
