import { Link } from 'react-router-dom';
import firstImg from '../styles/images/1.png';
import secondImg from '../styles/images/2.png';
import thirdImg from '../styles/images/3.png';
import fourthImg from '../styles/images/4.png';
import fifthImg from '../styles/images/5.png';

const LandingPageCard = () => {
    return (
      <div className="content">
        <h1>Ready to Create Changes?</h1>
        <h2>Streamline your inventory. Simplify your Life</h2>
        <div className="image-grid">
            <img className="firstimg" src={firstImg} alt="First" />
            <img className="secondimg" src={secondImg} alt="Second" />
            <img className="thirdimg" src={thirdImg} alt="Third" />
            <img className="fourthimg" src={fourthImg} alt="Fourth" />
            <img className="fifthimg" src={fifthImg} alt="Fifth" />
        </div>
        <Link to="/companyregister"><button className="BtnRegisterCompany">Register Company</button></Link> 
    </div>
    );
}

export default LandingPageCard;

