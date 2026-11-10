import logoCollab from '../assets/logo/logo-collab.png'
import iconeRecherche from '../assets/figma/recherche.svg'
import iconeCoeur from '../assets/figma/coeur.svg'
import './Header.css'

const liens = [
  { libelle: 'Accueil', href: '#accueil' },
  { libelle: 'Le défilé', href: '#defile' },
  { libelle: 'Les looks', href: '#looks' },
  { libelle: 'Notre engagement', href: '#engagement' },
]

export default function Header({ actif = 'Accueil', selection = 2, superpose = false }) {
  return (
    <header className={superpose ? 'header header--superpose' : 'header'}>
      <div className="header__barre">
        <a className="header__logos" href="#accueil" aria-label="Festival de Cannes × Vestiaire Collective, accueil">
          <img className="header__logo" src={logoCollab} alt="" width="48" height="42" />
        </a>

        <nav className="header__nav" aria-label="Navigation principale">
          {liens.map(({ libelle, href }) => (
            <a
              key={libelle}
              href={href}
              className="header__lien"
              aria-current={libelle === actif ? 'page' : undefined}
            >
              {libelle}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button type="button" className="header__recherche" aria-label="Rechercher">
            <img src={iconeRecherche} alt="" width="44" height="44" />
          </button>
          <button type="button" className="header__selection">
            <img src={iconeCoeur} alt="" width="20" height="20" />
            <span>Sélection ({selection})</span>
          </button>
        </div>
      </div>
    </header>
  )
}
