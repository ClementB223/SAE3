import { Link, useParams } from 'react-router-dom'
import { formatPrix, parSlug, participants, pieces, piecesDuLook } from '../donnees.js'
import PieceCarte from '../components/PieceCarte.jsx'
import Coeur from '../components/Coeur.jsx'
import { useSelection } from '../selection-contexte.js'
import Introuvable from './Introuvable.jsx'
import './pages.css'
import './Piece.css'

const raisons = [
  'Une pièce de luxe qui existait déjà : aucune ressource neuve pour la produire.',
  'Elle a déjà vécu une première histoire, elle continue avec vous.',
  'Contrôlée et authentifiée par Vestiaire Collective avant l’envoi.',
]

const lienVestiaire = (piece) =>
  `https://fr.vestiairecollective.com/search/?q=${encodeURIComponent(`${piece.marque} ${piece.nom}`)}`

export default function Piece() {
  const { slug } = useParams()
  const { contient, basculer } = useSelection()
  const piece = parSlug(pieces, slug)
  if (!piece) return <Introuvable />

  const personne = parSlug(participants, piece.look)
  const choisie = contient(piece.slug)
  const autres = (personne ? piecesDuLook(piece.look) : pieces.filter((p) => !p.look)).filter((p) => p !== piece).slice(0, 4)
  const caracteristiques = [
    ['État', piece.etat],
    ['Couleur', piece.couleur],
    ['Matière', piece.matiere],
    ['Coupe', piece.coupe],
    ['Vendue par', piece.vendeur],
  ]

  return (
    <div className="page">
      <ol className="fil" aria-label="Fil d’Ariane">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/pieces">Les pièces</Link>
        </li>
        <li aria-current="page">{piece.nom}</li>
      </ol>

      <article className="produit">
        <div className="produit__visuel">
          {piece.image ? <img src={piece.image} alt={`${piece.nom}, ${piece.marque}.`} /> : null}
        </div>

        <div className="produit__infos">
          <span className="produit__marque">{piece.marque}</span>
          <h1 className="produit__nom">{piece.nom}</h1>
          <p className="produit__prix">{formatPrix(piece.prix)}</p>

          <p className="produit__description">{piece.description}</p>

          <div className="produit__taille">
            <span>Taille</span>
            <strong>{piece.taille}</strong>
          </div>

          <div className="produit__actions">
            <a className="bouton produit__acheter" href={lienVestiaire(piece)} target="_blank" rel="noreferrer">
              <span className="bouton__libelle">Acheter sur Vestiaire Collective</span>
            </a>
            <button
              type="button"
              className="produit__coeur"
              aria-pressed={choisie}
              aria-label={`${choisie ? 'Retirer de' : 'Ajouter à'} ma sélection`}
              onClick={() => basculer(piece.slug)}
            >
              <Coeur plein={choisie} />
            </button>
          </div>

          <p className="produit__solidaire">100 % des bénéfices reversés à quatre associations pour l’inclusion dans l’audiovisuel</p>

          <div className="produit__details">
            <details open>
              <summary>Caractéristiques</summary>
              <dl className="produit__liste">
                {caracteristiques.map(([l, v]) => (
                  <div key={l}>
                    <dt>{l}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </details>
            {piece.adaptations.length > 0 && (
              <details>
                <summary>Accessibilité et confort</summary>
                <ul className="etiquettes">
                  {piece.adaptations.map((a) => (
                    <li className="etiquette" key={a}>
                      {a}
                    </li>
                  ))}
                </ul>
              </details>
            )}
            <details>
              <summary>Pourquoi la seconde main</summary>
              <ul className="produit__arguments">
                {raisons.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </details>
          </div>

          {personne && (
            <Link className="produit__porte" to={`/le-casting/${personne.slug}`}>
              Portée par <strong>{personne.nom}</strong> au défilé d’ouverture →
            </Link>
          )}
        </div>
      </article>

      {autres.length > 0 && (
        <section className="page-section page-section--filet" aria-labelledby="autres-pieces">
          <h2 className="titre-section anim-titre" id="autres-pieces">
            {personne ? (
              <>
                <em>Le reste</em> <span>du look</span>
              </>
            ) : (
              <>
                <em>D’autres</em> <span>pièces</span>
              </>
            )}
          </h2>
          <ul className="grille-pieces">
            {autres.map((p) => (
              <PieceCarte piece={p} key={p.slug} />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
