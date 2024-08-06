import  { useState, useEffect } from 'react';
import './Slide.css';
import logo from "../Navbar/assets/Méca_tech.png"
import client from "./assets/client.png"



const testimonials = [
  {
    img: client,
    name: 'Maria Hamdane',
    stars: 5,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    img: client,
    name: 'Maria Hamdane',
    stars: 5,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },  {
    img: client,
    name: 'Maria Hamdane',
    stars: 5,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },  {
    img: client,
    name: 'Maria Hamdane',
    stars: 5,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },  {
    img: client,
    name: 'Maria Hamdane',
    stars: 5,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },  {
    img: client,
    name: 'Maria Hamdane',
    stars: 5,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },  {
    img: client,
    name: 'Maria Hamdane',
    stars: 5,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    img: client,
    name: 'Maria Hamdane',
    stars: 5,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },  {
    img: client,
    name: 'Maria Hamdane',
    stars: 5,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },
];

const LESAVIS = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? testimonials.length - 3 : currentIndex - 3;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === testimonials.length - 3 ? 0 : currentIndex + 3;
    setCurrentIndex(newIndex);
  };

  return (

       
    <div className="testimonilas">
    <div className="inner">
          <h1 className="titre">Les derniers avis des clients </h1>
          <div className="border"></div>
            <div className="row">
        <img className='imgavis'src={logo} alt="" />
      <button className="slider-button" onClick={goToPrevious}><i className="fa-solid fa-circle-arrow-left"></i></button>
      <div className="inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        <div className="row">
          {testimonials.map((testimonial, index) => (
            <div className="col" key={index}>
              <div className="testimonila">
                <img src={testimonial.img} alt={testimonial.name} />
                <div className="name">{testimonial.name}</div>
                <div className="stars">
                  {[...Array(5)].map((star, i) => (
                    <i
                      key={i}
                      className={`fa${i < testimonial.stars ? 's' : 'r'} fa-star`}
                      style={{ color: i < testimonial.stars ? 'green' : 'black' }}
                    ></i>
                  ))}
                </div>
                <p>{testimonial.review}</p>             

              </div>
              <button className='butt4'>Voir Details</button>
            </div>
          ))}
        </div>
      </div>

      <button className="slider-button" onClick={goToNext}><i className="fa-solid fa-circle-arrow-right"></i></button>
    </div>
    </div>
    </div>
  );
};

export default LESAVIS;
