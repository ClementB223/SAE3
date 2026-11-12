import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatPrix, parSlug, participants, pieces, piecesDuLook } from '../donnees.js'
import PieceCarte, { Coeur, Statut } from '../components/PieceCarte.jsx'
import { useSelection } from '../selection-contexte.js'
import Introuvable from './Introuvable.jsx'
import './pages.css'
import './Piece.css'

const arguments_ = [
  'Une pièce de luxe qui existait déjà : aucune ressource neuve pour la produire.',
  'Contre la tenue portée une seule fois : elle a déjà vécu, elle continue avec vous.',
  'Contrôlée et authentifiée par Vestiaire Collective avant l’envoi.',
]

export default function Piece() {
  const { slug } = useParams()
  const dialogue = useRef(null)
  const { contient, basculer } = useSelection()
  const piece = parSlug(pieces, slug)
  if (!piece) return <Introuvable />

  const personne = parSlug(participants, piece.look)
  const vendue = piece.statut === 'vendue'
  const choisie = contient(piece.slug)
  const autres = piecesDuLook(piece.look).filter((p) => p !== piece)
  const caracteristiques = [
    ['Taille', piece.taille],
    ['État', piece.etat],
    ['Couleur', piece.couleur],
    ['Matière', piece.matiere],
    ['Coupe', piece.coupe],
    ['Vendue par', piece.vendeur],
  ]

  return (
    <div className="page">
      <ol className="fil" aria-label="Fil d’Ariane">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/pieces">Les pièces</Link>
        </li>
        <li aria-current="page">{piece.nom}</li>
      </ol>

      <article className="fiche">
        <div className="fiche__galerie">
          <div className={`fiche__vignette${vendue ? ' fiche__vignette--vendue' : ''}`}>
            {piece.image ? <img src={piece.image} alt={`${piece.nom}, ${piece.marque}.`} /> : <span>Visuel à venir</span>}
          </div>
          <figure className="fiche__porte">
            <img src={personne.look.photo} alt={`${personne.nom} porte cette pièce sur les marches.`} loading="lazy" />
            <figcaption>Portée par {personne.prenom} le soir de l’ouverture</figcaption>
          </figure>
        </div>

        <div className="fiche__infos">
          <p className="fiche__badge">Portée au défilé d’ouverture</p>
          <div>
            <p className="fiche__marque">{piece.marque}</p>
            <h1 className="fiche__nom">{piece.nom}</h1>
          </div>
          <div className="fiche__prix-statut">
            {vendue ? <del className="fiche__prix">{formatPrix(piece.prix)}</del> : <p className="fiche__prix">{formatPrix(piece.prix)}</p>}
            <Statut valeur={piece.statut} />
          </div>

          <dl className="fiche__caracteristiques">
            {caracteristiques.map(([l, v]) => (
              <div key={l}>
                <dt>{l}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          {piece.adaptations.length > 0 && (
            <div>
              <p className="rubrique-petite">Accessibilité et confort</p>
              <ul className="etiquettes">
                {piece.adaptations.map((a) => (
                  <li className="etiquette" key={a}>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="fiche__actions">
            <button type="button" className="bouton fiche__acheter" disabled={vendue} onClick={() => dialogue.current?.showModal()}>
              <span className="bouton__libelle">{vendue ? 'Pièce vendue' : 'Acheter sur Vestiaire Collective'}</span>
              {!vendue && <span aria-hidden="true">→</span>}
            </button>
            <button
              type="button"
              className="fiche__favori"
              aria-pressed={choisie}
              aria-label={`${choisie ? 'Retirer de' : 'Ajouter à'} ma sélection`}
              onClick={() => basculer(piece.slug)}
            >
              <Coeur plein={choisie} />
            </button>
          </div>
          <p className="fiche__note">
            100 % des bénéfices de cette vente sont reversés au Collectif 50/50 et à l’AAFA.{' '}
            <Link to="/engagement#acheter">Comment ça marche</Link>
          </p>

          <section>
            <h2 className="rubrique-petite">Description</h2>
            <p className="texte-courant">{piece.description}</p>
          </section>

          <section>
            <h2 className="rubrique-petite">Pourquoi la seconde main</h2>
            <ul className="fiche__arguments">
              {arguments_.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>

          <Link className="fiche__personne" to={`/le-casting/${personne.slug}`}>
            <img src={personne.look.portrait ?? personne.look.photo} alt="" loading="lazy" />
            <span>
              <span className="rubrique-petite">Portée par</span>
              <span className="fiche__personne-nom">{personne.nom}</span>
              <span className="fiche__personne-metier">
                {personne.metier} · look « {personne.look.titre} »
              </span>
              <span className="lien">Découvrir son histoire →</span>
            </span>
          </Link>
        </div>
      </article>

      {autres.length > 0 && (
        <section className="page-section page-section--filet" aria-labelledby="autres-pieces">
          <h2 className="titre-section anim-titre" id="autres-pieces">
            <em>Le reste</em> <span>du look</span>
          </h2>
          <ul className="grille-pieces">
            {autres.map((p) => (
              <PieceCarte piece={p} key={p.slug} />
            ))}
          </ul>
        </section>
      )}

      <dialog className="achat" ref={dialogue} aria-labelledby="achat-titre" onClick={(e) => e.target === dialogue.current && dialogue.current.close()}>
        <div className="achat__fenetre">
          <div className="achat__haut">
            <p className="rubrique-petite">Achat de démonstration</p>
            <button type="button" className="achat__fermer" aria-label="Fermer" onClick={() => dialogue.current?.close()}>
              ×
            </button>
          </div>
          <h2 className="achat__titre" id="achat-titre">
            Vous seriez maintenant redirigé vers Vestiaire Collective
          </h2>
          <div className="achat__recap">
            <span className="achat__vignette">{piece.image && <img src={piece.image} alt="" />}</span>
            <span className="achat__textes">
              <span className="fiche__marque">{piece.marque}</span>
              <span className="achat__nom">{piece.nom}</span>
            </span>
            <span className="achat__prix">{formatPrix(piece.prix)}</span>
          </div>
          <p className="texte-courant">
            Le Premier Rôle est un projet étudiant fictif : aucune commande n’est passée. Dans la vraie collaboration, l’achat se fait
            sur la plateforme Vestiaire Collective et la totalité des bénéfices est reversée aux associations partenaires.
          </p>
          <div className="actions">
            <button type="button" className="bouton" onClick={() => dialogue.current?.close()}>
              <span className="bouton__libelle">Retour à la pièce</span>
            </button>
            <Link className="lien" to="/engagement">
              Où va l’argent ?
            </Link>
          </div>
        </div>
      </dialog>
    </div>
  )
}
