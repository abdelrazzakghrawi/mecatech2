import './App.css'
import Navbar from "./LandingPage/Navbar/Navbar"
import Slider from "./LandingPage/slider/Slider"
import Hover from "./LandingPage/icons/Hover"
import LESAVIS from "./LandingPage/Avis client/LESAVIS"
import Footer from "./LandingPage/Footer/Footer"



const App = () => {
  return (
    <div>
     <Navbar/>
<Slider/>
<Hover/>
<LESAVIS/>
<Footer/>
    </div>
    
  )
}

export default App
