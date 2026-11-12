import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrix, parSlug, participants, piecesDuLook, statuts } from '../donnees.js'
import './ShopTheLook.css'

const personne = parSlug(participants, 'noe-delmas')
const points = [
  { x: 32.6, y: 44.3, court: 'Costume ivoire' },
  { x: 43.7, y: 28.4, court: 'Lavallière en soie' },
  { x: 68.7, y: 81.3, court: 'Mocassins vernis' },
]
const pieces = piecesDuLook(personne.slug).map((p, i) => ({ ...p, ...points[i], numero: `0${i + 1}` }))

export default function ShopTheLook() {
  const [actif, setActif] = useState(0)

  return (
    <section className="shop" id="shop" aria-labelledby="shop-titre">
      <div className="filet">
        <p className="rubrique rubrique--encre">
          Look {personne.numero} — {personne.look.titre}
        </p>
      </div>

      <div className="shop__corps">
        <figure className="shop__visuel">
          <div className="shop__cadre">
            <img
              className="shop__photo"
              src={personne.look.photo}
              alt={`${personne.prenom} porte le look ${personne.look.titre} sur les marches.`}
              width="668"
              height="835"
              loading="lazy"
            />
            {pieces.map((p, i) => (
              <button
                type="button"
                key={p.slug}
                className={`point${i === actif ? ' point--actif' : ''}`}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                onClick={() => setActif(i)}
                aria-pressed={i === actif}
                aria-label={`${p.court}, ${formatPrix(p.prix)}`}
              >
                <span className="point__pastille">{i + 1}</span>
                {i === actif && (
                  <span className="point__etiquette">
                    {p.court} — {formatPrix(p.prix)}
                  </span>
                )}
              </button>
            ))}
          </div>
          <figcaption className="shop__legende">Touchez un point pour voir la pièce, ou choisissez dans la liste.</figcaption>
        </figure>

        <div className="shop__detail">
          <h2 className="shop__titre" id="shop-titre">
            <span className="shop__titre1">Shop the look</span>
            <em className="shop__titre2">
              {personne.look.titre}, porté par {personne.prenom}
            </em>
          </h2>
          <p className="shop__chapeau">{personne.look.style}</p>

          <ul className="shop__liste">
            {pieces.map((p, i) => (
              <li key={p.slug} className={`ligne${i === actif ? ' ligne--active' : ''}`} onMouseEnter={() => setActif(i)}>
                <span className="ligne__numero">{p.numero}</span>
                <span className="ligne__vignette">{p.image && <img src={p.image} alt="" width="76" height="92" />}</span>
                <span className="ligne__textes">
                  <span className="ligne__marque">{p.marque}</span>
                  <span className="ligne__nom">{p.nom}</span>
                  <span className="ligne__details">
                    {p.etat} · {p.taille} · {statuts[p.statut]}
                  </span>
                </span>
                <span className="ligne__prix">
                  <span className="ligne__montant">{formatPrix(p.prix)}</span>
                  <Link className="lien" to={`/pieces/${p.slug}`} onFocus={() => setActif(i)}>
                    Voir la pièce
                  </Link>
                </span>
              </li>
            ))}
          </ul>

          <Link className="bouton" to={`/le-casting/${personne.slug}`}>
            <span className="bouton__libelle">L’histoire de {personne.prenom}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
