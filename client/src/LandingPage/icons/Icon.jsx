import './Icon.css'
import icon from './assets/icon.png'
import meca from './assets/meca.png'
import pay from './assets/pay.png'
import avis from './assets/avis.png'


const Icon = () => {
  return (
    <div >
    <div className='icon'>
        <h1> Découvrez un univers de possibilités : Explorez nos services complets</h1>
    </div>
   
        <img className='img' src={icon} alt="" />
        <div className='icon_img'>
        <h2 className='h2' >1.</h2>
    </div>
    <div className='span'> 
        <h3>Rechercher des pièces du votre voiture</h3>
    </div>


    <img className='img1' src={meca} alt="" />
        <div className='icon_img1'>
        <h2 className='h22' >2.</h2>
    </div>
    <div className='span3'> 
        <h3>Rechercher des pièces du votre voiture</h3>
    </div>
    <img className='img2' src={pay} alt="" />
        <div className='icon_img2'>
        <h2 className='h23' >3.</h2>
    </div>
    <div className='span4'> 
        <h3>Choisissez la date et l'heure</h3>
    </div>
    <img className='img3' src={avis} alt="" />
        <div className='icon_img3'>
        <h2 className='h24' >4.</h2>
    </div>
    <div className='span5'> 
        <h3>Proclamez votre  bonheur</h3>
    </div>
    </div>
  )
}

export default Icon