import { Link } from 'react-router-dom'
import { barrieres } from '../donnees.js'
import './Manifeste.css'

export default function Manifeste() {
  return (
    <section className="manifeste" id="engagement" aria-labelledby="manifeste-titre">
      <div className="manifeste__contenu">
        <div className="filet filet--clair">
          <p className="rubrique rubrique--clair">Pourquoi Le Premier Rôle</p>
        </div>

        <h2 className="manifeste__titre" id="manifeste-titre">
          <span className="manifeste__ligne">La mode n’a pas</span>
          <span className="manifeste__ligne manifeste__ligne--2">
            <span className="manifeste__barre">
              <span>de </span>
              <s>norme</s>
            </span>
            <em className="manifeste__annotation">que des histoires</em>
          </span>
        </h2>

        <p className="manifeste__intro">
          Le cinéma raconte la vie dans toute sa diversité. Pourtant, au pied des 24 marches, trois barrières tiennent encore
          à l’écart une partie de celles et ceux qui le font vivre.
        </p>

        <ul className="manifeste__engagements">
          {barrieres.map((b, i) => (
            <li className="manifeste__engagement" key={b.titre}>
              <span className="manifeste__chiffre">{b.chiffre}</span>
              <span className="manifeste__legende">{b.legende}</span>
              <h3 className="manifeste__intitule">{b.titre}</h3>
              <p className="manifeste__texte">{b.texte}</p>
              {i === barrieres.length - 1 && (
                <Link className="lien lien--clair" to="/le-projet#barrieres">
                  Comprendre les trois barrières →
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
