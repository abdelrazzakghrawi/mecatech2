import './Footer.css'
import logo from './frontend_assets/logo.png'
import f from './frontend_assets/f.png'
import l from './frontend_assets/l.png'
import i from './frontend_assets/i.png'
import t from './frontend_assets/t.png'

const Footer = () => {
  return (
    <div className='footer2' id='footer2'>
        <div className="footer2_content">
                
                <div className="footer2_content_center">
                <h2>Mécanos dans votre ville</h2>
                <ul>
                    <li>Mécanos à Casablanca</li>
                    <li>Mécanos à Fes</li>
                    <li>Mécanos à Rabat</li>
                    <li>Mécanos à Agadir</li>
                    <li>Mécanos à Marrakesh</li>
                    <li>Mécanos à Tanger</li>
                    <li>Mécanos à Berkane</li>

                </ul>
            </div> 
           
           
  
            
            <div className="footer2_content_centerr">
                <h2>Entretien par modèles</h2>
                <ul>
                    <li>Entretien BMW</li>
                    <li>Entretien Mercedes</li>
                    <li>Entretien Seat</li>
                    <li>Entretien Toyota</li>
                    <li>Entretien Nissan</li>
                    <li>Entretien Fiat</li>

                </ul>
            </div>
            <div className="footer2_content_left">
                <h2>Remplacement et réparation</h2>
                <ul>
                    <li>Remplacement filtre à huile</li>
                    <li>Remplacement filtre à air</li>
                   <li>Remplacement filtre à habitacle</li>
                    <li>Remplacement filtre à carburant</li>
                   <li>Remplacement bougies</li>
                   <li>Remplacement amortisseurs</li>
                   <li>Remplacement embrayage</li>
                   <li>Remplacement freins à disques</li>
                   <li>Remplacement plaquettes de freins</li>

                </ul>
            </div>
        </div>
        <img src={logo} alt="" className="logoo" />
        <hr />
        <div className="footer2_social_icons">
                    <img className="f2"src={f} alt="" />
                    <img className="i2"src={i} alt="" />
                    <img className="t2" src={t} alt="" />
                    <img className="l2" src={l} alt="" />
                </div>
       
        <p className="footer2_copyright">© 2024 Meca Tech. Tous droits réservés.</p>
         
    </div>
  )
}

export default Footer