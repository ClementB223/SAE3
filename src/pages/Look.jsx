import { Link, useParams } from 'react-router-dom'
import { formatPrix, parSlug, participants, piecesDuLook, prixDes, statuts } from '../donnees.js'
import PieceCarte from '../components/PieceCarte.jsx'
import Introuvable from './Introuvable.jsx'
import './pages.css'
import './Look.css'

export default function Look() {
  const { slug } = useParams()
  const p = parSlug(participants, slug)
  if (!p) return <Introuvable />

  const index = participants.indexOf(p)
  const precedent = participants[(index + participants.length - 1) % participants.length]
  const suivant = participants[(index + 1) % participants.length]
  const pieces = piecesDuLook(p.slug)
  const autres = participants.filter((x) => x !== p)

  return (
    <div className="page">
      <div className="look-page__haut">
        <ol className="fil" aria-label="Fil d’Ariane">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/le-casting">Le casting</Link>
          </li>
          <li aria-current="page">{p.nom}</li>
        </ol>
        <nav className="look-page__nav" aria-label="Looks voisins">
          <Link className="lien" to={`/le-casting/${precedent.slug}`}>
            ← {precedent.prenom}
          </Link>
          <Link className="lien" to={`/le-casting/${suivant.slug}`}>
            {suivant.prenom} →
          </Link>
        </nav>
      </div>

      <article className="look-page">
        <div className="look-page__visuel">
          <img className="look-page__photo anim-photo" src={p.look.affiche} alt={`Affiche de la campagne, ${p.nom}.`} />
        </div>

        <div className="look-page__infos">
          <header>
            <p className="rubrique-petite">
              {p.numero} · {p.metier}
            </p>
            <h1 className="look-page__titre anim-titre">
              <span className="look-page__nom">{p.nom}</span>
              <span className="look-page__look">« {p.look.titre} »</span>
            </h1>
          </header>

          <p className="citation look-page__citation">{p.message}</p>
          <p className="texte-courant">{p.presentation}</p>

          <dl className="look-page__faits">
            <div>
              <dt>Le style</dt>
              <dd>{p.look.style}</dd>
            </div>
          </dl>

          <section aria-labelledby="pieces-look">
            <h2 className="rubrique-petite" id="pieces-look">
              Les pièces du look · dès {formatPrix(prixDes(p.slug))}
            </h2>
            <ul className="look-page__liste">
              {pieces.map((piece, i) => (
                <li key={piece.slug}>
                  <Link className="look-page__ligne" to={`/pieces/${piece.slug}`}>
                    <span className="look-page__num">0{i + 1}</span>
                    <span className="look-page__vignette">{piece.image && <img src={piece.image} alt="" width="60" height="74" />}</span>
                    <span className="look-page__textes">
                      <span className="look-page__marque">{piece.marque}</span>
                      <span className="look-page__piece">{piece.nom}</span>
                      <span className="look-page__details">
                        {piece.taille} · {statuts[piece.statut]}
                      </span>
                    </span>
                    <span className="look-page__prix">{formatPrix(piece.prix)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="look-page__note">
              Chaque pièce est unique et vendue séparément. 100 % des bénéfices sont reversés à l’inclusion dans l’audiovisuel.
            </p>
          </section>
        </div>
      </article>

      <section className="page-section page-section--filet" aria-labelledby="pieces-titre">
        <h2 className="titre-section anim-titre" id="pieces-titre">
          <em>Les pièces</em> <span>du look</span>
        </h2>
        <ul className="grille-pieces grille-pieces--3">
          {pieces.map((piece) => (
            <PieceCarte piece={piece} key={piece.slug} />
          ))}
        </ul>
      </section>

      <section className="page-section page-section--filet" aria-labelledby="autres-titre">
        <h2 className="titre-section anim-titre" id="autres-titre">
          <em>Les autres</em> <span>premiers rôles</span>
        </h2>
        <ul className="autres-looks">
          {autres.map((a) => (
            <li key={a.slug}>
              <Link className="autre-look" to={`/le-casting/${a.slug}`}>
                <img className="autre-look__photo anim-photo" src={a.look.affiche} alt="" loading="lazy" />
                <span className="autre-look__metier">{a.metier}</span>
                <span className="autre-look__nom">{a.nom}</span>
                <span className="autre-look__titre">« {a.look.titre} »</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
