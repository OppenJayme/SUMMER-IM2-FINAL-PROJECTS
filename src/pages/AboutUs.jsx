import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import imgpic1 from '../styles/images/For-website-image-8.png';
import imgpic2 from '../styles/images/GettyImages-142227958_optimized.jpg';
import imgpic3 from '../styles/images/Web_150DPI-20190927_10th_Floor_Conference_Room_2_v1.jpg';
import "../styles/aboutus.css";

const About = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [imgpic1, imgpic2, imgpic3];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div>
            <Header/>
            <div className='content-container'>
                <div className="pic-container">
                    <div className="slideshow">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`slide ${currentSlide === index ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${slide})` }}
                            ></div>
                        ))}
                    </div>
                    <Link to="/companyregister"><button className="BtnRegister">Register Company</button>
                    </Link>
                </div>

                <div className="text-container">
                    <p>  StockWise stands at the forefront of Inventory Management Systems (IMS), dedicated to revolutionizing how businesses manage their inventory. 
                        With a keen focus on efficiency, precision, and profitability, StockWise offers a comprehensive suite of tools and features tailored to meet the 
                        diverse needs of businesses across industries. At StockWise, we are committed to excellence in every aspect of our platform. From user experience to 
                        functionality, we strive to deliver a seamless and intuitive inventory management solution that empowers businesses to thrive in today's competitive marketplace. 
                        Our cloud-based platform harnesses the power of cutting-edge technology to provide businesses with unparalleled flexibility, scalability, and accessibility. 
                        With StockWise, you can access your inventory data anytime, anywhere, from any device, ensuring that you stay connected and in control at all times. 
                        StockWise is equipped with a wide range of robust features designed to streamline and optimize every aspect of inventory control. 
                        From real-time inventory tracking to customizable stock alerts, our platform empowers businesses to make informed decisions, minimize stockouts, and maximize profitability.</p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;
