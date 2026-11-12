import { Link } from 'react-router-dom'
import { formatPrix, parSlug, participants, statuts } from '../donnees.js'
import { useSelection } from '../selection-contexte.js'
import './PieceCarte.css'

export function Coeur({ plein }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"
        fill={plein ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Statut({ valeur }) {
  return (
    <p className={`statut statut--${valeur}`}>
      <span className="statut__repere" aria-hidden="true" />
      {statuts[valeur]}
    </p>
  )
}

export default function PieceCarte({ piece, titre = 'h3' }) {
  const { contient, basculer } = useSelection()
  const vendue = piece.statut === 'vendue'
  const look = parSlug(participants, piece.look)
  const Titre = titre
  const choisie = contient(piece.slug)

  return (
    <li className={`piece${vendue ? ' piece--vendue' : ''}`}>
      <Link className="piece__lien" to={`/pieces/${piece.slug}`}>
        <div className="piece__vignette">
          {piece.image ? (
            <img className="piece__image" src={piece.image} alt="" loading="lazy" />
          ) : (
            <span className="piece__vide">Visuel à venir</span>
          )}
          <span className="piece__badge">Pièce unique</span>
        </div>
        <Statut valeur={piece.statut} />
        <div className="piece__textes">
          <span className="piece__marque">{piece.marque}</span>
          <Titre className="piece__nom">{piece.nom}</Titre>
          <span className="piece__details">
            {piece.etat} · {piece.taille} · Look « {look.look.titre} »
          </span>
        </div>
        <div className="piece__pied">
          {vendue ? (
            <del className="piece__prix">{formatPrix(piece.prix)}</del>
          ) : (
            <span className="piece__prix">{formatPrix(piece.prix)}</span>
          )}
          <span className="piece__voir">{vendue ? 'Pièces similaires →' : 'Voir la pièce →'}</span>
        </div>
      </Link>
      <button
        type="button"
        className="piece__favori"
        aria-pressed={choisie}
        aria-label={`${choisie ? 'Retirer' : 'Ajouter'} « ${piece.nom} » ${choisie ? 'de' : 'à'} ma sélection`}
        onClick={() => basculer(piece.slug)}
      >
        <Coeur plein={choisie} />
      </button>
    </li>
  )
}
