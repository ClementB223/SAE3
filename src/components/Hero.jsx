import photoGroupe from '../assets/figma/photo-groupe.jpg'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="accueil" aria-labelledby="hero-titre">
      <h1 className="hero__titre" id="hero-titre">
        <span className="hero__ligne1">Le tapis rouge </span>
        <span className="hero__ligne2">
          S’ouvre <em>à tous.</em>
        </span>
      </h1>

      <div className="hero__milieu">
        <p className="hero__intro">
          Quatre personnes que l’on voit trop rarement sur les marches. Quatre tenues
          entièrement composées de pièces de seconde main, à retrouver ici, une par une.
        </p>
        <img
          className="hero__photo"
          src={photoGroupe}
          alt="Élodie, Noé, Sora et Abde posent sur les marches rouges du Palais."
          width="1014"
          height="571"
        />
      </div>

      <div className="hero__bas">
        <div className="hero__actions">
          <a className="bouton" href="#looks">
            <span className="bouton__libelle">Découvrir les looks</span>
            <span aria-hidden="true">→</span>
          </a>
          <a className="lien" href="#defile">Explorer le défilé</a>
        </div>
        <p className="hero__legende">
          Élodie, Noé, Sora et Abde sur les marches du Palais, le soir de l’ouverture.
        </p>
      </div>
    </section>
  )
}
