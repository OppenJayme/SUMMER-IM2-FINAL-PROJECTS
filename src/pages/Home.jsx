import Header from "../components/Header";
import Footer from "../components/Footer";
import "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
import LandingPageCard from "../components/landingPageCard";

const Home = () => {
    return (
        <div>
            <Header/>
            <LandingPageCard />
            <Footer />
        </div>
    );
};

export default Home;
