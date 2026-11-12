import { Link } from 'react-router-dom'
import { formatPrix, parSlug, pieces } from '../donnees.js'
import PieceCarte from '../components/PieceCarte.jsx'
import { useSelection } from '../selection-contexte.js'
import './pages.css'

export default function Selection() {
  const { slugs, vider } = useSelection()
  const choisies = slugs.map((s) => parSlug(pieces, s)).filter(Boolean)
  const achetables = choisies.filter((p) => p.statut !== 'vendue')
  const total = achetables.reduce((s, p) => s + p.prix, 0)
  const vendues = choisies.length - achetables.length

  return (
    <div className="page">
      <ol className="fil" aria-label="Fil d’Ariane">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li aria-current="page">Ma sélection</li>
      </ol>

      <header className="entete-page">
        <div>
          <p className="rubrique">Ma sélection</p>
          <h1 className="entete-page__titre anim-titre">
            <span className="entete-page__ligne">Ma sélection</span>
            <span className="entete-page__accent">
              {choisies.length} pièce{choisies.length > 1 ? 's' : ''} mise{choisies.length > 1 ? 's' : ''} de côté
            </span>
          </h1>
        </div>
        {choisies.length > 0 && (
          <div className="selection__resume">
            <p className="entete-page__chapeau" aria-live="polite">
              Total des pièces encore disponibles : <strong>{formatPrix(total)}</strong>, entièrement reversés aux associations
              partenaires.
              {vendues > 0 && ` ${vendues} pièce${vendues > 1 ? 's ont' : ' a'} déjà trouvé preneur.`}
            </p>
            <button type="button" className="lien selection__vider" onClick={vider}>
              Vider ma sélection
            </button>
          </div>
        )}
      </header>

      <section className="page-section page-section--filet" aria-label="Pièces sélectionnées">
        {choisies.length ? (
          <ul className="grille-pieces">
            {choisies.map((p) => (
              <PieceCarte piece={p} key={p.slug} />
            ))}
          </ul>
        ) : (
          <div className="vide">
            <p>Touchez le cœur d’une pièce pour la mettre de côté ici.</p>
            <Link className="bouton" to="/pieces">
              <span className="bouton__libelle">Voir les pièces</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
