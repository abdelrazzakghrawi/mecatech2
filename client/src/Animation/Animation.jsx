import { useEffect } from 'react';
import './Animation.css'; // Make sure to create and import a corresponding CSS file
import logo1 from "./assets/Domarin.gif"
const Animation = () => {
  useEffect(() => {
    const intro = document.querySelector('.intro');
    const logooo = document.querySelector('.logoooo');
    const logoooospans = document.querySelectorAll('.logoooo-parts');

    setTimeout(() => {
      logoooospans.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add('activeanime');
        }, (index + 1) * 100);
      });

      setTimeout(() => {
        logoooospans.forEach((span, index) => {
          setTimeout(() => {
            span.classList.remove('activeanime');
            span.classList.add('fade');
          }, (index + 1) * 50);
        });
      }, 2000);

      setTimeout(() => {
        intro.style.top = '-100vh';
      }, 2500);
    }, 500);
  }, []);

  return (
    <div>

   
    <div className="intro">
      
      <h1 className="logooopo">
        <img src={logo1} alt="Logo" />
        <span className="logoooo-parts">M</span>
        <span className="logoooo-parts">E</span>
        <span className="logoooo-parts">C</span>
        <span className="logoooo-parts">A</span>
        <span className="logoooo-parts"></span>
        <span className="logoooo-parts">T</span>
        <span className="logoooo-parts">E</span>
        <span className="logoooo-parts">C</span>
        <span className="logoooo-parts">H</span>
      </h1>
      <p className="hrrr"></p>
    </div>
    <div className="">
      
    </div>
    </div>
  );
};

export default Animation;
