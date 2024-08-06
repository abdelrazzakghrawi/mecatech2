import  './Hover.css'
import icon from './assets/icon.png'
import meca from './assets/meca.png'
import pay from './assets/pay.png'
import avis from './assets/avis.png'

const Hover = () => {
  return (
    <div className='touss'>
         <div className='icon'>
        <h1> Découvrez un univers de possibilités : Explorez nos services complets</h1>
    </div>
    <div >
        <img className='imgg' src={icon} alt="" />
        <h2 className='h2' >1.</h2>

     <div id='span'> 
       
        <span >Rechercher des pièces du votre voiture</span>
    </div>   
 <span id='spanhover'>Lorem ipsum dolor sit, amet consectetur adipi
             Iure, facilis!</span>
    </div>
    
      <div >
      <img className='imgg1' src={meca} alt="" />
      <h2 className='h22' >2.</h2>


     <div id='span1'> 
       
        <span>Rechercher des mécaniques proche</span>
    </div>   
 <span id='spanhover1'>Lorem ipsum dolor sit, amet consectetur adipi
             Iure, facilis!</span>
    </div>
    <div >
    <img className='imgg2' src={pay} alt="" />
    <h2 className='h23' >3.</h2>


     <div id='span2'> 
       
        <span >Choisissez la date et l'heure</span>
    </div>   
 <span id='spanhover2'>Lorem ipsum dolor sit, amet consectetur adipi
             Iure, facilis!</span>
    </div>

    <div >
    <img className='imgg3' src={avis} alt="" />
    <h2 className='h24' >4.</h2>

     <div id='span3'> 
       
        <span >Proclamez votre bonheur</span>
    </div>   
 <span id='spanhover3'>Lorem ipsum dolor sit, amet consectetur adipi
             Iure, facilis!</span>
    </div>
</div>
  )
}

export default Hover