import pieceRobe from '../assets/figma/piece-robe.png'
import pieceCostume from '../assets/figma/piece-costume.png'
import piecePlumes from '../assets/figma/piece-plumes.png'
import pieceCombinaison from '../assets/figma/piece-combinaison.png'
import './Pieces.css'

const pieces = [
  {
    marque: 'Oscar de la Renta',
    nom: 'Robe drapée en jacquard',
    details: 'Très bon état · T. 36 · Look « Première Marche »',
    prix: '640 €',
    statut: 'disponible',
    image: pieceRobe,
  },
  {
    marque: 'Saint Laurent',
    nom: 'Costume deux pièces ivoire',
    details: 'Très bon état · T. 50 IT · Look « Ivoire »',
    prix: '420 €',
    statut: 'disponible',
    image: pieceCostume,
  },
  {
    marque: 'Valentino',
    nom: 'Robe-manteau en plumes',
    details: 'Bon état · T. 38 · Look « Plume Blanche »',
    prix: '980 €',
    statut: 'reservee',
    image: piecePlumes,
  },
  {
    marque: 'Givenchy',
    nom: 'Combinaison drapée à cape',
    details: 'Très bon état · T. 40 · Look « Minuit »',
    prix: '360 €',
    statut: 'vendue',
    image: pieceCombinaison,
  },
]

const libelles = { disponible: 'Disponible', reservee: 'Réservée', vendue: 'Vendue' }

export default function Pieces() {
  return (
    <section className="pieces" id="pieces" aria-labelledby="pieces-titre">
      <div className="pieces__entete">
        <h2 className="pieces__titre" id="pieces-titre">
          <em className="pieces__titre1">Les pièces</em> <span className="pieces__titre2">du défilé</span>
        </h2>
        <p className="pieces__note">
          Pièces uniques, proposées par la communauté Vestiaire Collective. L’achat se fait pièce par pièce, sur Vestiaire Collective.
        </p>
      </div>

      <ul className="pieces__grille">
        {pieces.map((p) => {
          const vendue = p.statut === 'vendue'
          return (
            <li className={`piece${vendue ? ' piece--vendue' : ''}`} key={p.nom}>
              <div className="piece__vignette">
                <img className="piece__image" src={p.image} alt="" loading="lazy" />
                <span className="piece__badge">Pièce unique</span>
              </div>
              <p className={`statut statut--${p.statut}`}>
                <span className="statut__repere" aria-hidden="true" />
                {libelles[p.statut]}
              </p>
              <div className="piece__textes">
                <span className="piece__marque">{p.marque}</span>
                <h3 className="piece__nom">{p.nom}</h3>
                <span className="piece__details">{p.details}</span>
              </div>
              <div className="piece__pied">
                {vendue ? (
                  <del className="piece__prix">{p.prix}</del>
                ) : (
                  <span className="piece__prix">{p.prix}</span>
                )}
                <a className="lien" href="#pieces">
                  {vendue ? 'Pièces similaires →' : 'Voir la pièce →'}
                </a>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
