import { Link } from 'react-router-dom'
import { formatPrix, participants, piecesDuLook, prixDes } from '../donnees.js'
import './Looks.css'

function Look({ personne }) {
  const nombre = piecesDuLook(personne.slug).length
  return (
    <Link className="look" to={`/le-casting/${personne.slug}`}>
      <div className="look__visuel">
        <img
          className="look__photo"
          src={personne.look.photo}
          alt={`${personne.nom} porte le look ${personne.look.titre}.`}
          width="552"
          height="690"
          loading="lazy"
        />
        <span className="look__numero" aria-hidden="true">
          {personne.numero}
        </span>
      </div>
      <div className="look__infos">
        <span className="look__nom">
          {personne.nom}
          <span className="look__metier">{personne.metier}</span>
        </span>
        <span className="look__resume">
          {nombre} pièces · dès {formatPrix(prixDes(personne.slug))}
        </span>
      </div>
      <h3 className="look__titre">{personne.look.titre}</h3>
      <p className="look__texte">« {personne.citation} »</p>
      <span className="lien">Découvrir son histoire et son look →</span>
    </Link>
  )
}

export default function Looks() {
  return (
    <section className="looks" id="looks" aria-labelledby="looks-titre">
      <div className="filet looks__filet">
        <Link className="lien" to="/le-casting">
          Tout le casting →
        </Link>
      </div>
      <h2 className="looks__titre" id="looks-titre">
        <span className="looks__titre1">Les looks</span> <em className="looks__titre2">du défilé</em>
      </h2>
      <div className="looks__grille">
        {[0, 1].map((colonne) => (
          <div className="looks__colonne" key={colonne}>
            {participants.map((personne, i) =>
              i % 2 === colonne ? (
                <div className={`looks__case looks__case--${i + 1}`} key={personne.slug}>
                  <Look personne={personne} />
                </div>
              ) : null,
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
