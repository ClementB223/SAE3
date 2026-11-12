import { Link } from 'react-router-dom'
import { participants } from '../donnees.js'
import './pages.css'
import './Casting.css'

export default function Casting() {
  return (
    <div className="page">
      <ol className="fil" aria-label="Fil d’Ariane">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li aria-current="page">Le casting</li>
      </ol>

      <header className="entete-page">
        <div>
          <p className="rubrique">Le casting</p>
          <h1 className="entete-page__titre anim-titre">
            <span className="entete-page__ligne">Quatre premiers rôles</span>
            <span className="entete-page__accent">avant les tenues, les personnes</span>
          </h1>
        </div>
        <p className="entete-page__chapeau">
          Une scripte, un chef opérateur, une monteuse, un·e comédien·ne. Des métiers que l’on voit rarement sous les flashs, des
          corps et des parcours que le tapis rouge montre trop peu. Leur talent et leur histoire sont le cœur du défilé.
        </p>
      </header>

      <ol className="casting">
        {participants.map((p, i) => (
          <li className={`portrait${i % 2 ? ' portrait--inverse' : ''}`} key={p.slug}>
            <div className="portrait__visuel">
              {p.look.portrait ? (
                <img className="portrait__image anim-photo" src={p.look.portrait} alt={`${p.nom}, ${p.metier.toLowerCase()}, au travail.`} loading="lazy" />
              ) : (
                <img className="portrait__image anim-photo" src={p.look.photo} alt={`${p.nom} sur les marches.`} loading="lazy" />
              )}
              <span className="portrait__numero anim-numero" aria-hidden="true">
                {p.numero}
              </span>
            </div>
            <div className="portrait__texte">
              <p className="rubrique-petite">
                {p.metier} · {p.age} ans · {p.ville}
              </p>
              <h2 className="portrait__nom">{p.nom}</h2>
              <p className="citation portrait__citation">« {p.citation} »</p>
              <p className="texte-courant">{p.histoire}</p>
              <dl className="portrait__faits">
                <div>
                  <dt>Sa première émotion de cinéma</dt>
                  <dd>{p.emotion}</dd>
                </div>
                <div>
                  <dt>La barrière franchie</dt>
                  <dd>{p.barriere}</dd>
                </div>
              </dl>
              <Link className="bouton" to={`/le-casting/${p.slug}`}>
                <span className="bouton__libelle">Son look « {p.look.titre} »</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
