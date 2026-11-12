import { Link } from 'react-router-dom'
import { participants, piecesDuLook, pieces } from '../donnees.js'
import PieceCarte from './PieceCarte.jsx'
import './Pieces.css'

const vedettes = participants.map((p) => piecesDuLook(p.slug)[0])

export default function Pieces() {
  return (
    <section className="pieces" id="pieces" aria-labelledby="pieces-titre">
      <div className="pieces__entete">
        <h2 className="pieces__titre" id="pieces-titre">
          <em className="pieces__titre1">Les pièces</em> <span className="pieces__titre2">du défilé</span>
        </h2>
        <p className="pieces__note">
          Chaque pièce portée sur les marches est unique et vendue séparément sur Vestiaire Collective.{' '}
          <strong>100 % des bénéfices sont reversés</strong> à des associations pour l’inclusion dans l’audiovisuel.
        </p>
      </div>

      <ul className="pieces__grille">
        {vedettes.map((p) => (
          <PieceCarte piece={p} key={p.slug} />
        ))}
      </ul>

      <div className="pieces__suite">
        <Link className="bouton" to="/pieces">
          <span className="bouton__libelle">Voir les {pieces.length} pièces</span>
          <span aria-hidden="true">→</span>
        </Link>
        <Link className="lien" to="/engagement">
          Où va l’argent ?
        </Link>
      </div>
    </section>
  )
}
