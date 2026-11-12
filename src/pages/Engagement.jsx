import { Link } from 'react-router-dom'
import { images } from '../images.js'
import './pages.css'
import './Engagement.css'

export default function Engagement() {
  return (
    <div className="page">
      <ol className="fil" aria-label="Fil d’Ariane">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li aria-current="page">Notre engagement</li>
      </ol>

      <section className="engage-une" aria-labelledby="engage-titre">
        <h1 className="engage-une__titre" id="engage-titre">
          <span className="engage-une__ligne1">Habiller tout le monde</span>
          <em className="engage-une__ligne2">c’est ça, le vrai luxe</em>
        </h1>
        <img className="engage-une__photo" src={images.coulisses} alt="Des participants de tous les âges et de toutes les morphologies se préparent en coulisses." />
      </section>

      <section className="argent" id="acheter" aria-labelledby="argent-titre">
        <h2 className="argent__titre" id="argent-titre">
          <span className="argent__chiffre">100 %</span>
          <span className="argent__phrase">des bénéfices de la vente sont reversés à l’inclusion dans l’audiovisuel</span>
        </h2>
        <p className="argent__parcours">
          Vous choisissez une pièce du défilé <span aria-hidden="true">→</span> vous l’achetez sur Vestiaire Collective{' '}
          <span aria-hidden="true">→</span> l’argent part aux associations
        </p>
        <Link className="bouton" to="/pieces">
          <span className="bouton__libelle">Voir les pièces</span>
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="assos" id="associations" aria-labelledby="assos-titre">
        <p className="rubrique" id="assos-titre">
          Les associations
        </p>
        <ul className="assos__liste">
          <li>
            <span className="assos__nom">Collectif 50/50</span>
            <span className="assos__texte">L’égalité et la diversité dans le cinéma</span>
          </li>
          <li>
            <span className="assos__nom">AAFA</span>
            <span className="assos__texte">Les actrices et acteurs, de tous les profils</span>
          </li>
        </ul>
      </section>

      <section className="diptyque" id="conciergerie" aria-label="Sur la Croisette">
        <figure className="diptyque__volet">
          <img className="anim-photo" src={images.popUp} alt="" loading="lazy" />
          <figcaption>
            <span className="diptyque__titre">Le pop-up solidaire</span>
            <span className="diptyque__texte">Sur la Croisette, pendant tout le festival</span>
          </figcaption>
        </figure>
        <figure className="diptyque__volet diptyque__volet--decale">
          <img className="anim-photo" src={images.essayage} alt="" loading="lazy" />
          <figcaption>
            <span className="diptyque__titre">La conciergerie inclusive</span>
            <span className="diptyque__texte">Une tenue pour chaque accrédité, quelle que soit sa taille</span>
          </figcaption>
        </figure>
      </section>
    </div>
  )
}
