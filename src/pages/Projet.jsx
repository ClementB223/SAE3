import { Link } from 'react-router-dom'
import { images } from '../images.js'
import './pages.css'
import './Projet.css'

const barrages = [
  { barre: 'Taille 36', reponse: 'toutes les tailles', note: '80 % des morphologies exclues des prototypes de défilé' },
  { barre: 'Hors de prix', reponse: 'la seconde main', note: 'Des accrédités renoncent aux marches faute de tenue de gala' },
  { barre: 'Par le côté', reponse: 'les 24 marches', note: 'Une entrée latérale pour les personnes à mobilité réduite' },
]

const actes = [
  ['Le casting', 'des métiers que l’on voit trop peu'],
  ['La rencontre', 'les personnes avant les tenues'],
  ['Les essayages', 'des pièces de seconde main, ajustées'],
  ['Le défilé', 'l’ouverture du festival'],
  ['La vente', '100 % des bénéfices reversés'],
]

export default function Projet() {
  return (
    <>
      <div className="page">
        <ol className="fil" aria-label="Fil d’Ariane">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li aria-current="page">Le projet</li>
        </ol>

        <section className="projet-une" aria-labelledby="projet-titre">
          <h1 className="projet-une__titre" id="projet-titre">
            <span className="projet-une__ligne1">Le premier rôle</span>
            <em className="projet-une__ligne2">appartient à tous les corps</em>
          </h1>
          <div className="projet-une__milieu">
            <p className="projet-une__chapeau">
              Faire du tapis rouge le reflet de la vraie vie, en habillant des professionnels du cinéma de toutes morphologies avec
              des pièces de luxe de seconde main.
            </p>
            <div className="projet-une__video" role="img" aria-label="Emplacement de la vidéo de présentation, bientôt disponible">
              <img className="projet-une__fond" src={images.photoDefile} alt="" />
              <span className="projet-une__lecture" aria-hidden="true" />
              <span className="projet-une__mention">Le projet en vidéo · bientôt</span>
            </div>
          </div>
        </section>

        <section className="barrages" id="barrieres" aria-labelledby="barrages-titre">
          <p className="rubrique" id="barrages-titre">
            Ce qu’on fait tomber
          </p>
          <ul className="barrages__liste">
            {barrages.map((b) => (
              <li className="barrage" key={b.barre}>
                <span className="barrage__ligne">
                  <s className="barrage__barre">{b.barre}</s>
                  <em className="barrage__reponse">{b.reponse}</em>
                </span>
                <span className="barrage__note">{b.note}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="generique" id="deroule" aria-labelledby="generique-titre">
        <p className="generique__surtitre" id="generique-titre">
          Le déroulé
        </p>
        <ol className="generique__liste">
          {actes.map(([titre, texte], i) => (
            <li className="generique__acte" key={titre}>
              <span className="generique__numero">Acte {i + 1}</span>
              <span className="generique__titre">{titre}</span>
              <span className="generique__texte">{texte}</span>
            </li>
          ))}
        </ol>
        <div className="generique__fin">
          <Link className="bouton bouton--clair" to="/le-casting">
            <span className="bouton__libelle">Rencontrer le casting</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
