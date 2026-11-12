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

      <header className="entete-page entete-page--compacte">
        <div>
          <p className="rubrique">Le casting</p>
          <h1 className="entete-page__titre anim-titre">
            <span className="entete-page__ligne">Trois égéries</span>
            <span className="entete-page__accent">pour ouvrir le festival</span>
          </h1>
        </div>
        <p className="entete-page__chapeau">
          La mode, la scène et la haute couture s’ouvrent à tous. Trois égéries montent les marches du défilé d’ouverture, dans
          des tenues entièrement composées de pièces de seconde main.
        </p>
      </header>

      <ol className="casting">
        {participants.map((p, i) => (
          <li className={`portrait${i % 2 ? ' portrait--inverse' : ''}`} key={p.slug}>
            <div className="portrait__visuel">
              <img className="portrait__image anim-photo" src={p.look.portrait} alt={`Portrait de ${p.nom}.`} loading="lazy" />
            </div>
            <div className="portrait__texte">
              <p className="rubrique-petite">
                {p.numero} · {p.metier}
              </p>
              <h2 className="portrait__nom">{p.nom}</h2>
              <p className="citation portrait__citation">{p.message}</p>
              <p className="texte-courant">{p.presentation}</p>
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
