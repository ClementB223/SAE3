
import { Link } from 'react-router-dom'
import { formatPrix } from '../donnees.js'
import './PieceCarte.css'

export default function PieceCarte({ piece, titre = 'h3' }) {
  const Titre = titre

  return (
    <li className="piece">
      <Link className="piece__lien" to={`/pieces/${piece.slug}`}>
        <div className="piece__vignette">
          {piece.image ? (
            <img
              className="piece__image"
              src={piece.image}
              alt=""
              loading="lazy"
            />
          ) : (
            <span className="piece__vide">Visuel à venir</span>
          )}
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
    </li>
  )
}
