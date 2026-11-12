import { Link } from 'react-router-dom'
import './pages.css'
import './Projet.css'

const barrages = [
  { barre: 'Taille 36', reponse: 'toutes les tailles', note: '80 % des morphologies exclues des prototypes de défilé' },
  { barre: 'Hors de prix', reponse: 'la seconde main', note: 'Des accrédités renoncent aux marches faute de tenue de gala' },
  { barre: 'Par le côté', reponse: 'les 24 marches', note: 'Une entrée latérale pour les personnes à mobilité réduite' },
]

const programme = [
  ['Janvier', 'Le casting', 'Avec le Collectif 50/50 et l’AAFA'],
  ['Février', 'Les rencontres', 'Les personnes avant les tenues'],
  ['Avril', 'Les essayages', 'Seconde main, ajustée à chaque corps'],
  ['Soir d’ouverture', 'Le défilé', 'Sur les marches du Palais'],
  ['Pendant le festival', 'La vente solidaire', '100 % des bénéfices reversés'],
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
            <div className="projet-une__video">
              <video className="projet-une__lecteur" src="/video/projet-3d.mp4" controls playsInline preload="metadata" aria-label="Vidéo de présentation du projet" />
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
        <section className="programme" id="deroule" aria-labelledby="programme-titre">
          <div className="programme__entete">
            <p className="rubrique">Le déroulé</p>
            <h2 className="programme__titre" id="programme-titre">
              Du casting à la Croisette
            </h2>
          </div>
          <ol className="programme__liste">
            {programme.map(([quand, titre, texte]) => (
              <li className="programme__ligne" key={titre}>
                <span className="programme__quand">{quand}</span>
                <span className="programme__quoi">{titre}</span>
                <span className="programme__texte">{texte}</span>
              </li>
            ))}
          </ol>
          <div className="actions programme__fin">
            <Link className="bouton" to="/le-casting">
              <span className="bouton__libelle">Rencontrer le casting</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
