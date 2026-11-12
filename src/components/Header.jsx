import { useEffect, useId, useRef, useState } from 'react'
import logoNoir from '../assets/logo/logo-collab-noir.png'
import logoBlanc from '../assets/logo/logo-collab.png'
import iconeRecherche from '../assets/figma/recherche.svg'
import iconeCoeur from '../assets/figma/coeur.svg'
import './Header.css'

const liens = [
  { libelle: 'Accueil', href: '#accueil' },
  { libelle: 'Le défilé', href: '#defile' },
  { libelle: 'Les looks', href: '#looks' },
  { libelle: 'Notre engagement', href: '#engagement' },
]

const secondaires = [
  { libelle: 'Shop the look', href: '#shop' },
  { libelle: 'Les pièces', href: '#pieces' },
]

function useSectionActive() {
  const [actif, setActif] = useState('#accueil')

  useEffect(() => {
    const cibles = [...liens, ...secondaires].map((l) => document.querySelector(l.href)).filter(Boolean)
    const observateur = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((e) => {
          if (e.isIntersecting) setActif(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    cibles.forEach((c) => observateur.observe(c))
    return () => observateur.disconnect()
  }, [])

  return actif
}

export default function Header({ selection = 2, superpose = false }) {
  const actif = useSectionActive()
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
        <a className="header__logos" href="#accueil" aria-label="Festival de Cannes × Vestiaire Collective, accueil">
          <img className="header__logo" src={superpose ? logoBlanc : logoNoir} alt="" width="48" height="42" />
        </a>

        <nav className="header__nav" aria-label="Navigation principale">
          {liens.map(({ libelle, href }) => (
            <a key={href} href={href} className="header__lien" aria-current={href === actif ? 'true' : undefined}>
              {libelle}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button type="button" className="header__recherche" aria-label="Rechercher">
            <img src={iconeRecherche} alt="" width="44" height="44" />
          </button>
          <button type="button" className="header__selection" aria-label={`Ma sélection, ${selection} pièces`}>
            <img src={iconeCoeur} alt="" width="20" height="20" />
            <span className="header__selection-texte">Sélection ({selection})</span>
            <span className="header__selection-nombre" aria-hidden="true">
              {selection}
            </span>
          </button>
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
            {liens.map(({ libelle, href }, i) => (
              <li key={href} style={{ '--i': i }}>
                <a href={href} className="menu__lien" aria-current={href === actif ? 'true' : undefined} onClick={fermer}>
                  <span className="menu__numero">0{i + 1}</span>
                  {libelle}
                </a>
              </li>
            ))}
          </ul>
          <ul className="menu__secondaires">
            {secondaires.map(({ libelle, href }) => (
              <li key={href}>
                <a href={href} className="lien lien--clair" onClick={fermer}>
                  {libelle} →
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="menu__devise">Seconde main, premier rôle</p>
      </div>
    </header>
  )
}
