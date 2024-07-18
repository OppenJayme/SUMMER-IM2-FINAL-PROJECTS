import Footer from '../components/Footer'
import '../styles/contacts.css';
import charles from '../styles/images/Charles.jpg'
import ivan from '../styles/images/Ivan.jpg';
import yousif from '../styles/images/Yousif.jpg';
import reitz from '../styles/images/Reitz.PNG';
import Header from '../components/Header';

const Contacts = () => {

    return (
        <div>
           <Header/>
            <div className="contact-us-container">
                <div className='img-container'>
                    <img className='img-profile' src={charles} alt='charles-pic' />
                    <div className="text-container">
                        <h1>Yousif Qurico Ceballos</h1>
                        <h2>FullStack developer</h2>
                        <span><i class="bi bi-envelope"></i>yousifceballos@gmail.com</span>
                    </div>
                </div>
                <div className='img-container'>
                    <img className='img-profile' src={reitz}alt='reitz-pic' />
                    <div className="text-container">
                        <h1>Reitz Dave Andriano</h1>
                        <h2>FullStack developer</h2>
                        <span><i class="bi bi-envelope"></i>reitzdave.andriano@gmail.com</span>
                    </div>
                </div>
                <div className='img-container'>
                    <img className='img-profile' src={ivan} alt='ivan-pic' />
                    <div className="text-container">
                        <h1>Ivan Jayme</h1>
                        <h2>FullStack developer</h2>
                        <span><i class="bi bi-envelope"></i>jaymekyerivan@gmail.com</span>
                    </div>
                </div>
                <div className='img-container'>
                    <img className='img-profile' src={yousif} alt='yousif-pic'/>
                    <div className="text-container">
                        <h1> Chales Benedict Boquecosa</h1>
                        <h2>FullStack developer</h2>
                        <span><i class="bi bi-envelope"></i>charlesbenedictboquecosa@gmail.com</span>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Contacts;
