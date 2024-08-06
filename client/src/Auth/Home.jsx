import Navbar from "../components/Navbar";
import Slider from "../LandingPage/slider/Slider"
import Hover from "../LandingPage/icons/Hover"
import LESAVIS from "../LandingPage/Avis client/LESAVIS"
import Footer from "../LandingPage/Footer/Footer"
import { SearchProvider } from "../searchService/searchComponent/context/SearchContext";
const Home = () => {
  return (
   
    
   
    <div>
    <SearchProvider>
      <Navbar/>
      <Slider/>
      <Hover/>
      <LESAVIS/>  
      <Footer/>
    </SearchProvider>
    
    
    </div>
  );
};

export default Home;