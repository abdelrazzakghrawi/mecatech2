// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import golf from "./assets/golf.png";
import Bmw from "./assets/Bmw.png";
import Bmw1 from "./assets/Bmw1.png";
import Audi from "./assets/Audi.png";
import Porche from "./assets/Porche.png";
import Porche1 from "./assets/Porche1.png";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import './Slider.css';

// import required modules
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

const Slider = () => {
  return (
    <div className='sw'>
      <div className='h1'>
        <h1>Découvrez notre sélection de pièces détachées pour votre voiture au meilleur prix</h1>
       <br />
        <hr className='hr'/>
      </div>
      <>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={false}
          navigation={true} // Ajouter navigation
          autoplay={{
            delay: 2500, // délai entre chaque slide (en millisecondes)
            disableOnInteraction: false, // autoplay continue même après interaction
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide className='swiper-slidee'>
            <img src={golf} />
            <div className='details'>
              <h4>PIÈCES DÉTACHÉES VOLKSWAGEN GOLF 6</h4>
              <p>Découvrez notre sélection de pièces détachées pour voiture Volkswagen Golf 6 au meilleur prix</p>
              <button className='butt3'>Voir Details</button>
            </div>
          </SwiperSlide>
          <SwiperSlide className='swiper-slidee'>
            <img src={Bmw} />
            <div className='details'>
              <h4>PIÈCES DÉTACHÉES VOLKSWAGEN GOLF 6</h4>
              <p>Découvrez notre sélection de pièces détachées pour voiture Volkswagen Golf 6 au meilleur prix</p>
              <button className='butt3'>Voir Details</button>
            </div>
          </SwiperSlide>
          <SwiperSlide className='swiper-slidee'>
            <img src={Bmw1} />
            <div className='details'>
              <h4>PIÈCES DÉTACHÉES VOLKSWAGEN GOLF 6</h4>
              <p>Découvrez notre sélection de pièces détachées pour voiture Volkswagen Golf 6 au meilleur prix</p>
              <button className='butt3'>Voir Details</button>
            </div>
          </SwiperSlide>
          <SwiperSlide className='swiper-slidee'>
            <img src={Audi} />
            <div className='details'>
              <h4>PIÈCES DÉTACHÉES VOLKSWAGEN GOLF 6</h4>
              <p>Découvrez notre sélection de pièces détachées pour voiture Volkswagen Golf 6 au meilleur prix</p>
              <button className='butt3'>Voir Details</button>
            </div>
          </SwiperSlide>
          <SwiperSlide className='swiper-slidee'>
            <img src={Porche} />
            <div className='details'>
              <h4>PIÈCES DÉTACHÉES VOLKSWAGEN GOLF 6</h4>
              <p>Découvrez notre sélection de pièces détachées pour voiture Volkswagen Golf 6 au meilleur prix</p>
              <button className='butt3'>Voir Details</button>
            </div>
          </SwiperSlide>
          <SwiperSlide className='swiper-slidee'>
            <img src={Porche1} />
            <div className='details'>
              <h4>PIÈCES DÉTACHÉES VOLKSWAGEN GOLF 6</h4>
              <p>Découvrez notre sélection de pièces détachées pour voiture Volkswagen Golf 6 au meilleur prix</p>
              <button className='butt3'>Voir Details</button>
            </div>
          </SwiperSlide>
          <SwiperSlide className='swiper-slidee'>
            <img src={golf} />
            <div className='details'>
              <h4>PIÈCES DÉTACHÉES VOLKSWAGEN GOLF 6</h4>
              <p>Découvrez notre sélection de pièces détachées pour voiture Volkswagen Golf 6 au meilleur prix</p>
              <button className='butt3'>Voir Details</button>
            </div>
          </SwiperSlide>
          <SwiperSlide className='swiper-slidee'>
            <img src={Bmw} />
            <div className='details'>
              <h4>PIÈCES DÉTACHÉES VOLKSWAGEN GOLF 6</h4>
              <p>Découvrez notre sélection de pièces détachées pour voiture Volkswagen Golf 6 au meilleur prix</p>
              <button className='butt3'>Voir Details</button>
            </div>
          </SwiperSlide>
        <SwiperSlide className='swiper-slidee'>
          <img src={Bmw1} />
        <div className='details'>
           <h4>PIÈCES DÉTACHÉES VOLKSWAGEN GOLF 6</h4>
          <p>Découvrez notre sélection de pièces détachées pour voiture Volkswagen Golf 6 au meilleur prix</p>
          <button className='butt3'>Voir Details</button> 
          </div>
        </SwiperSlide>
        <SwiperSlide className='swiper-slidee'>
          <img src={Audi} />
        <div className='details'>
           <h4>PIÈCES DÉTACHÉES VOLKSWAGEN GOLF 6</h4>
          <p>Découvrez notre sélection de pièces détachées pour voiture Volkswagen Golf 6 au meilleur prix</p>
          <button className='butt3'>Voir Details</button> 
          </div>
        </SwiperSlide>
        <SwiperSlide className='swiper-slidee'>
          <img src={Porche}/>
        <div className='details'>
           <h4>PIÈCES DÉTACHÉES VOLKSWAGEN GOLF 6</h4>
          <p>Découvrez notre sélection de pièces détachées pour voiture Volkswagen Golf 6 au meilleur prix</p>
          <button className='butt3'>Voir Details</button> 
          </div>
        </SwiperSlide>
        <SwiperSlide className='swiper-slidee'>
          <img src={Porche1} />
        <div className='details'>
           <h4>PIÈCES DÉTACHÉES VOLKSWAGEN GOLF 6</h4>
          <p>Découvrez notre sélection de pièces détachées pour voiture Volkswagen Golf 6 au meilleur prix</p>
          <button className='butt3'>Voir Details</button> 
          </div>
        </SwiperSlide>
      
      </Swiper>
    </>

    </div>
  )
}

export default Slider;
