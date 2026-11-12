import { Link } from 'react-router-dom'
import { images } from '../images.js'
import './pages.css'
import './Engagement.css'

const etapes = [
  ['Choisir', 'Parcourez les pièces du défilé et filtrez par coupe, taille ou besoin d’accessibilité.'],
  ['Acheter', 'La pièce s’achète sur Vestiaire Collective, contrôlée et authentifiée avant l’envoi.'],
  ['Transmettre', 'La totalité des bénéfices est reversée aux associations partenaires du casting.'],
]

const associations = [
  {
    nom: 'Collectif 50/50',
    texte:
      'Il œuvre pour l’égalité entre les femmes et les hommes et pour la diversité dans le cinéma et l’audiovisuel, des plateaux jusqu’aux écrans.',
  },
  {
    nom: 'AAFA',
    texte:
      'Actrices et Acteurs de France Associés défend les artistes-interprètes et agit pour une meilleure représentation des femmes, de la diversité et des personnes en situation de handicap.',
  },
]

export default function Engagement() {
  return (
    <>
      <div className="page">
        <ol className="fil" aria-label="Fil d’Ariane">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li aria-current="page">Notre engagement</li>
        </ol>

        <header className="entete-page">
          <div>
            <p className="rubrique">Notre engagement</p>
            <h1 className="entete-page__titre anim-titre">
              <span className="entete-page__ligne">Habiller tout le monde</span>
              <span className="entete-page__accent">c’est ça, le vrai luxe</span>
            </h1>
          </div>
          <p className="entete-page__chapeau">
            Le Premier Rôle ne s’arrête pas au défilé. Les pièces continuent leur chemin, l’argent finance l’inclusion dans
            l’audiovisuel, et une conciergerie ouvre le dress code à tous les accrédités.
          </p>
        </header>
      </div>

      <div className="page-pleine">
        <section className="page-section page-section--noir" aria-label="En chiffres">
          <ul className="chiffres">
            <li>
              <span className="chiffres__valeur">100 %</span>
              <span className="chiffres__texte">des bénéfices reversés à l’inclusion dans l’audiovisuel</span>
            </li>
            <li>
              <span className="chiffres__valeur">0</span>
              <span className="chiffres__texte">pièce neuve produite pour le défilé d’ouverture</span>
            </li>
            <li>
              <span className="chiffres__valeur">12 jours</span>
              <span className="chiffres__texte">de pop-up solidaire sur la Croisette, pendant tout le festival</span>
            </li>
          </ul>
        </section>
      </div>

      <div className="page">
        <section className="page-section" id="acheter" aria-labelledby="acheter-titre">
          <h2 className="titre-section anim-titre" id="acheter-titre">
            <span>Comment ça marche</span> <em>en trois gestes</em>
          </h2>
          <ol className="gestes">
            {etapes.map(([titre, texte], i) => (
              <li className="geste" key={titre}>
                <span className="geste__numero">0{i + 1}</span>
                <h3 className="geste__titre">{titre}</h3>
                <p className="texte-courant">{texte}</p>
              </li>
            ))}
          </ol>
          <div className="actions actions--espace">
            <Link className="bouton" to="/pieces">
              <span className="bouton__libelle">Voir les pièces</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="page-section page-section--filet" id="associations" aria-labelledby="associations-titre">
          <h2 className="titre-section anim-titre" id="associations-titre">
            <span>Les associations</span> <em>partenaires</em>
          </h2>
          <div className="associations">
            {associations.map((a) => (
              <article className="association" key={a.nom}>
                <h3 className="association__nom">{a.nom}</h3>
                <p className="texte-courant">{a.texte}</p>
              </article>
            ))}
          </div>
          <p className="engagement__precision">
            Elles accompagnent aussi le casting : ce sont elles qui nous aident à rencontrer les professionnels invités à défiler.
          </p>
        </section>

        <section className="page-section page-section--filet bloc-image" aria-labelledby="popup-titre">
          <img className="bloc-image__photo anim-photo" src={images.popUp} alt="Le pop-up solidaire sur la Croisette, au coucher du soleil." loading="lazy" />
          <div className="bloc-image__texte">
            <p className="rubrique-petite">Sur la Croisette</p>
            <h2 className="bloc-image__titre anim-titre" id="popup-titre">
              Le pop-up solidaire
            </h2>
            <p className="texte-courant">
              Pendant toute la durée du festival, les pièces du défilé sont exposées et vendues dans une boutique éphémère face à
              la mer. On peut les essayer, rencontrer les participants lors de séances de dédicace et prolonger la rencontre avec
              leur travail.
            </p>
          </div>
        </section>

        <section className="page-section page-section--filet bloc-image bloc-image--inverse" id="conciergerie" aria-labelledby="conciergerie-titre">
          <img className="bloc-image__photo anim-photo" src={images.essayage} alt="Une couturière ajuste l’ourlet d’une robe rouge pendant un essayage." loading="lazy" />
          <div className="bloc-image__texte">
            <p className="rubrique-petite">Pour les accrédités</p>
            <h2 className="bloc-image__titre anim-titre" id="conciergerie-titre">
              La conciergerie inclusive
            </h2>
            <p className="texte-courant">
              Les maisons ne prêtent que des prototypes en taille 34 ou 36. La conciergerie, elle, habille tous les talents
              accrédités, sans distinction de morphologie, d’âge, de notoriété ou de handicap : sélection dans le catalogue de
              seconde main, essayages et retouches sur place.
            </p>
            <p className="texte-courant">
              Aucune équipe de film ne doit renoncer à monter les marches faute de tenue.
            </p>
          </div>
        </section>
      </div>

      <div className="page-pleine">
        <section className="page-section page-section--rouge engagement__final" aria-label="Signature">
          <p className="citation">Second-hand is the new Haute Couture</p>
          <div className="actions">
            <Link className="bouton bouton--clair" to="/le-casting">
              <span className="bouton__libelle">Rencontrer le casting</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link className="lien lien--clair" to="/le-projet">
              Lire le projet
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
