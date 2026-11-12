import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import BandeDefilante from '../components/BandeDefilante.jsx'
import Defile from '../components/Defile.jsx'
import Looks from '../components/Looks.jsx'
import Manifeste from '../components/Manifeste.jsx'
import ShopTheLook from '../components/ShopTheLook.jsx'
import Pieces from '../components/Pieces.jsx'
import './pages.css'

export default function Accueil() {
  return (
    <>
      <Hero />
      <BandeDefilante />
      <Defile />
      <Looks />
      <Manifeste />
      <ShopTheLook />
      <Pieces />
      <div className="page-pleine">
        <section className="page-section page-section--noir" aria-labelledby="solidaire-titre">
          <h2 className="titre-section anim-titre" id="solidaire-titre">
            <span>Rien ne se perd</span> <em>tout se transmet</em>
          </h2>
          <ul className="chiffres">
            <li>
              <span className="chiffres__valeur">100 %</span>
              <span className="chiffres__texte">des bénéfices de la vente reversés à l’inclusion dans l’audiovisuel</span>
            </li>
            <li>
              <span className="chiffres__valeur">2</span>
              <span className="chiffres__texte">associations partenaires du casting : le Collectif 50/50 et l’AAFA</span>
            </li>
            <li>
              <span className="chiffres__valeur">1</span>
              <span className="chiffres__texte">pop-up solidaire sur la Croisette pendant toute la durée du festival</span>
            </li>
          </ul>
          <div className="actions actions--espace">
            <Link className="bouton" to="/engagement">
              <span className="bouton__libelle">Notre engagement</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
