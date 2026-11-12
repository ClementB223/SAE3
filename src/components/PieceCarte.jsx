import { Link } from 'react-router-dom'
import { formatPrix } from '../donnees.js'
import { useSelection } from '../selection-contexte.js'
import { Coeur } from './PieceElements.jsx'
import './PieceCarte.css'

export function BoutonCoeur({ piece, className = 'piece__favori' }) {
  const { contient, basculer } = useSelection()
  const choisie = contient(piece.slug)
  return (
    <button
      type="button"
      className={className}
      aria-pressed={choisie}
      aria-label={`${choisie ? 'Retirer' : 'Ajouter'} « ${piece.nom} » ${choisie ? 'de' : 'à'} ma sélection`}
      title={choisie ? 'Retirer de ma sélection' : 'Ajouter à ma sélection'}
      onClick={() => basculer(piece.slug)}
    >
      <Coeur plein={choisie} />
    </button>
  )
}

export default function PieceCarte({ piece, titre = 'h3' }) {
  const Titre = titre

  return (
    <li className="piece">
      <Link className="piece__lien" to={`/pieces/${piece.slug}`}>
        <div className="piece__vignette">
          {piece.image ? (
            <img className="piece__image" src={piece.image} alt="" loading="lazy" />
          ) : null}
        </div>

        <div className="piece__textes">
          <span className="piece__marque">{piece.marque}</span>
          <Titre className="piece__nom">{piece.nom}</Titre>
        </div>

        <div className="piece__pied">
          <span className="piece__prix">{formatPrix(piece.prix)}</span>
          <span className="piece__voir">Voir la pièce →</span>
        </div>
      </Link>
      <BoutonCoeur piece={piece} />
    </li>
  )
}
