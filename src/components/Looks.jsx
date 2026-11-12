import { Link } from 'react-router-dom'
import { participants } from '../donnees.js'
import './Looks.css'

function Look({ personne }) {
  return (
    <Link className="look" to={`/le-casting/${personne.slug}`}>
      <div className="look__visuel">
        {personne.look.affiche ? (
          <img
            className="look__photo look__photo--affiche"
            src={personne.look.affiche}
            alt={`Affiche de la campagne Le Premier Rôle, look ${personne.numero}.`}
            width="1100"
            height="1556"
            loading="lazy"
          />
        ) : (
          <img
            className="look__photo"
            src={personne.look.photo}
            alt={`${personne.nom} porte le look ${personne.look.titre}.`}
            width="552"
            height="690"
            loading="lazy"
          />
        )}
        <span className="look__numero" aria-hidden="true">
          {personne.numero}
        </span>
      </div>
      {!personne.look.affiche && (
        <div className="look__infos">
          <span className="look__nom">
            {personne.nom}
            <span className="look__metier">{personne.metier}</span>
          </span>
        </div>
      )}
      <h3 className="look__titre">{personne.look.titre}</h3>
      <p className="look__texte">{personne.look.resume}</p>
      <span className="lien">Découvrir son histoire et son look →</span>
    </Link>
  )
}

export default function Looks() {
  return (
    <section className="looks" id="looks" aria-labelledby="looks-titre">
      <h2 className="looks__titre" id="looks-titre">
        <span className="looks__titre1">Les looks</span> <em className="looks__titre2">du défilé</em>
      </h2>
      <div className="looks__grille">
        {participants.slice(0, 3).map((personne, i) => (
          <div className={`looks__case looks__case--${i + 1}`} key={personne.slug}>
            <Look personne={personne} />
          </div>
        ))}
      </div>
    </section>
  )
}
