import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoNoir from '../assets/logo/logo-collab-noir.png'
import logoBlanc from '../assets/logo/logo-collab.png'
import iconeCoeur from '../assets/figma/coeur.svg'
import { useSelection } from '../selection-contexte.js'
import './Header.css'

const liens = [
  { libelle: 'Accueil', href: '/', fin: true },
  { libelle: 'Le projet', href: '/le-projet' },
  { libelle: 'Le casting', href: '/le-casting' },
  { libelle: 'Les pièces', href: '/pieces' },
  { libelle: 'Notre engagement', href: '/engagement' },
]

export default function Header({ superpose = false }) {
  const { slugs } = useSelection()
  const selection = slugs.length
  const idMenu = useId()
  const [ouvert, setOuvert] = useState(false)
  const bouton = useRef(null)
  const panneau = useRef(null)

  useEffect(() => {
    if (!ouvert) return
    const declencheur = bouton.current
    const precedent = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panneau.current?.querySelector('a')?.focus()
    const touche = (e) => {
      if (e.key === 'Escape') setOuvert(false)
    }
    const largeur = window.matchMedia('(min-width: 961px)')
    const fermer = () => largeur.matches && setOuvert(false)
    window.addEventListener('keydown', touche)
    largeur.addEventListener('change', fermer)
    return () => {
      document.body.style.overflow = precedent
      window.removeEventListener('keydown', touche)
      largeur.removeEventListener('change', fermer)
      declencheur?.focus()
    }
  }, [ouvert])

  const fermer = () => setOuvert(false)

  return (
    <header className={`header${superpose ? ' header--superpose' : ''}${ouvert ? ' header--ouvert' : ''}`}>
      <div className="header__barre">
        <Link className="header__logos" to="/" aria-label="Le Premier Rôle, Festival de Cannes × Vestiaire Collective, accueil">
          <img className="header__logo" src={superpose ? logoBlanc : logoNoir} alt="" width="48" height="42" />
        </Link>

        <nav className="header__nav" aria-label="Navigation principale">
          {liens.map(({ libelle, href, fin }) => (
            <NavLink key={href} to={href} end={fin} className="header__lien">
              {libelle}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <Link
            to="/ma-selection"
            className="header__selection"
            aria-label={`Ma sélection, ${selection} pièce${selection > 1 ? 's' : ''}`}
          >
            <img src={iconeCoeur} alt="" width="20" height="20" />
            <span className="header__selection-texte">Sélection ({selection})</span>
            <span className="header__selection-nombre" aria-hidden="true">
              {selection}
            </span>
          </Link>
          <button
            type="button"
            ref={bouton}
            className="header__burger"
            aria-expanded={ouvert}
            aria-controls={idMenu}
            aria-label={ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOuvert(!ouvert)}
          >
            <span className="header__burger-trait" />
            <span className="header__burger-trait" />
          </button>
        </div>
      </div>

      <div className="menu" id={idMenu} ref={panneau} hidden={!ouvert}>
        <nav className="menu__nav" aria-label="Menu">
          <ul className="menu__liste">
            {liens.map(({ libelle, href, fin }, i) => (
              <li key={href} style={{ '--i': i }}>
                <NavLink to={href} end={fin} className="menu__lien" onClick={fermer}>
                  {libelle}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="menu__secondaires">
            <li>
              <Link to="/ma-selection" className="lien lien--clair" onClick={fermer}>
                Ma sélection ({selection}) →
              </Link>
            </li>
            <li>
              <Link to="/pieces#recherche" className="lien lien--clair" onClick={fermer}>
                Rechercher une pièce →
              </Link>
            </li>
          </ul>
        </nav>
        <p className="menu__devise">Le premier rôle appartient à tous les corps</p>
      </div>
    </header>
  )
}
