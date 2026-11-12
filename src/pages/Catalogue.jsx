import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { participants, pieces } from '../donnees.js'
import PieceCarte from '../components/PieceCarte.jsx'
import './pages.css'
import './Catalogue.css'

const categories = ['Vêtements', 'Chaussures', 'Accessoires']
const besoinsGroupes = {
  'Fermetures faciles': ['Boutons faciles', 'Fermeture latérale facile', 'Fermoir facile', 'Se noue sans fermoir'],
  'Taille souple': ['Taille ajustable', 'Taille élastique', 'Taille unique', 'Coupe ample', 'Manches ajustables'],
  'Position assise': ['Pensé pour la position assise'],
  'Talon bas ou plat': ['Talon bas', 'Talon plat', 'Bride réglable'],
}
const adaptations = Object.keys(besoinsGroupes)

const silhouettes = {
  'Jusqu’au 42': [0, 42],
  '44 à 48': [44, 48],
  '50 et plus': [50, 99],
}

const vaA = (piece, silhouette) => {
  if (piece.taille === 'TU') return true
  const t = piece.taille.match(/^T\. (\d+)/)
  if (!t) return false
  const [min, max] = silhouettes[silhouette]
  return Number(t[1]) >= min && Number(t[1]) <= max
}

const normaliser = (t) =>
  t
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

function Puces({ legende, options, valeur, changer }) {
  return (
    <fieldset className="filtre">
      <legend className="filtre__legende">{legende}</legend>
      <div className="filtre__puces">
        {['Tout', ...options].map((o) => {
          const choisi = o === 'Tout' ? valeur === '' : valeur === o
          return (
            <button type="button" key={o} className="puce" aria-pressed={choisi} onClick={() => changer(o === 'Tout' ? '' : o)}>
              {o}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function Catalogue() {
  const [recherche, setRecherche] = useState('')
  const [categorie, setCategorie] = useState('')
  const [look, setLook] = useState('')
  const [silhouette, setSilhouette] = useState('')
  const [besoins, setBesoins] = useState([])
  const champ = useRef(null)
  const { hash, key } = useLocation()
  const [filtresOuverts, setFiltresOuverts] = useState(hash === '#recherche')

  useEffect(() => {
    if (hash === '#recherche') champ.current?.focus({ preventScroll: true })
  }, [hash, key])

  const resultats = useMemo(() => {
    const q = normaliser(recherche.trim())
    return pieces.filter((p) => {
      if (q && !normaliser(`${p.marque} ${p.nom} ${p.couleur} ${p.matiere}`).includes(q)) return false
      if (categorie && p.categorie !== categorie) return false
      if (silhouette && !vaA(p, silhouette)) return false
      if (look && p.look !== look) return false
      if (besoins.some((b) => !besoinsGroupes[b].some((a) => p.adaptations.includes(a)))) return false
      return true
    })
  }, [recherche, categorie, look, silhouette, besoins])

  const actifs = recherche || categorie || look || silhouette || besoins.length
  const nbFiltres = [categorie, look, silhouette].filter(Boolean).length + besoins.length + (recherche ? 1 : 0)
  const reinitialiser = () => {
    setRecherche('')
    setCategorie('')
    setSilhouette('')
    setLook('')
    setBesoins([])
  }
  const basculerBesoin = (b) => setBesoins((l) => (l.includes(b) ? l.filter((x) => x !== b) : [...l, b]))

  return (
    <div className="page">
      <ol className="fil" aria-label="Fil d’Ariane">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li aria-current="page">Les pièces</li>
      </ol>

      <header className="entete-page">
        <div>
          <p className="rubrique">La vente solidaire</p>
          <h1 className="entete-page__titre anim-titre">
            <span className="entete-page__ligne">Les pièces</span>
            <span className="entete-page__accent">du défilé</span>
          </h1>
        </div>
        <p className="entete-page__chapeau">
          {pieces.length} pièces de seconde main, du 38 au 52 : celles portées sur les marches et toute la vente solidaire. Filtrez par
          besoin d’accessibilité : 100 % des bénéfices sont reversés à l’inclusion dans l’audiovisuel.
        </p>
      </header>

      <div className="catalogue">
        <button
          type="button"
          className="catalogue__ouvrir"
          aria-expanded={filtresOuverts}
          aria-controls="filtres"
          onClick={() => setFiltresOuverts((o) => !o)}
        >
          <span>Filtrer{nbFiltres ? ` (${nbFiltres})` : ''}</span>
          <span aria-hidden="true">{filtresOuverts ? '−' : '+'}</span>
        </button>
        <aside id="filtres" className={`catalogue__filtres${filtresOuverts ? ' catalogue__filtres--ouverts' : ''}`} aria-label="Filtres">
          <div className="filtre">
            <label className="filtre__legende" htmlFor="recherche">
              Rechercher
            </label>
            <input
              id="recherche"
              ref={champ}
              className="champ"
              type="search"
              placeholder="Marque, pièce, couleur…"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
          </div>

          <Puces legende="Catégorie" options={categories} valeur={categorie} changer={setCategorie} />

          <Puces legende="Morphologie · ma taille" options={Object.keys(silhouettes)} valeur={silhouette} changer={setSilhouette} />

          <div className="filtre">
            <label className="filtre__legende" htmlFor="look">
              Look
            </label>
            <select id="look" className="champ" value={look} onChange={(e) => setLook(e.target.value)}>
              <option value="">Tous les looks</option>
              {participants.map((p) => (
                <option value={p.slug} key={p.slug}>
                  {p.look.titre} — {p.prenom}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="filtre">
            <legend className="filtre__legende">Accessibilité et confort</legend>
            {adaptations.map((a) => (
              <label className="case" key={a}>
                <input type="checkbox" checked={besoins.includes(a)} onChange={() => basculerBesoin(a)} />
                <span>{a}</span>
              </label>
            ))}
          </fieldset>

          {actifs ? (
            <button type="button" className="lien catalogue__reinit" onClick={reinitialiser}>
              Réinitialiser les filtres
            </button>
          ) : null}
        </aside>

        <section className="catalogue__resultats" aria-labelledby="resultats">
          <p className="catalogue__compte" id="resultats" aria-live="polite">
            {resultats.length} pièce{resultats.length > 1 ? 's' : ''}
          </p>
          {resultats.length ? (
            <ul className="grille-pieces grille-pieces--3">
              {resultats.map((p) => (
                <PieceCarte piece={p} key={p.slug} />
              ))}
            </ul>
          ) : (
            <div className="vide">
              <p>Aucune pièce ne correspond à ces critères pour le moment.</p>
              <button type="button" className="bouton" onClick={reinitialiser}>
                <span className="bouton__libelle">Voir toutes les pièces</span>
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
