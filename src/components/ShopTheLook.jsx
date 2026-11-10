import { useState } from 'react'
import photoNoe from '../assets/figma/photo-noe.jpg'
import pieceCostume from '../assets/figma/piece-costume.png'
import './ShopTheLook.css'

const pieces = [
  {
    numero: '01',
    marque: 'Saint Laurent',
    nom: 'Costume deux pièces ivoire',
    details: 'Très bon état · T. 50 IT · Disponible',
    prix: '420 €',
    etiquette: 'Costume ivoire — 420 €',
    vignette: pieceCostume,
    point: { x: 32.6, y: 44.3 },
  },
  {
    numero: '02',
    marque: 'Lanvin',
    nom: 'Lavallière en soie',
    details: 'Très bon état · TU · Disponible',
    prix: '95 €',
    etiquette: 'Lavallière en soie — 95 €',
    point: { x: 43.7, y: 28.4 },
  },
  {
    numero: '03',
    marque: 'J.M. Weston',
    nom: 'Mocassins en cuir verni',
    details: 'Bon état · P. 43 · Réservée',
    prix: '180 €',
    etiquette: 'Mocassins vernis — 180 €',
    point: { x: 68.7, y: 81.3 },
  },
]

export default function ShopTheLook() {
  const [actif, setActif] = useState(0)

  return (
    <section className="shop" id="shop" aria-labelledby="shop-titre">
      <div className="filet">
        <p className="rubrique rubrique--encre">Look 02 — Ivoire</p>
      </div>

      <div className="shop__corps">
        <figure className="shop__visuel">
          <div className="shop__cadre">
            <img className="shop__photo" src={photoNoe} alt="Noé porte le look Ivoire sur les marches." width="668" height="835" loading="lazy" />
            {pieces.map((p, i) => (
              <button
                type="button"
                key={p.numero}
                className={`point${i === actif ? ' point--actif' : ''}`}
                style={{ left: `${p.point.x}%`, top: `${p.point.y}%` }}
                onClick={() => setActif(i)}
                aria-pressed={i === actif}
                aria-label={p.etiquette}
              >
                <span className="point__pastille">{i + 1}</span>
                {i === actif && <span className="point__etiquette">{p.etiquette}</span>}
              </button>
            ))}
          </div>
          <figcaption className="shop__legende">Touchez un point pour voir la pièce, ou choisissez dans la liste.</figcaption>
        </figure>

        <div className="shop__detail">
          <h2 className="shop__titre" id="shop-titre">
            <span className="shop__titre1">Shop the look</span>
            <em className="shop__titre2">Ivoire, porté par Noé</em>
          </h2>
          <p className="shop__chapeau">
            Un costume ivoire, une lavallière fluide et des mocassins vernis. Chaque pièce est unique et vendue séparément : vous
            choisissez celles qui vous ressemblent.
          </p>

          <ul className="shop__liste">
            {pieces.map((p, i) => (
              <li key={p.numero} className={`ligne${i === actif ? ' ligne--active' : ''}`} onMouseEnter={() => setActif(i)}>
                <span className="ligne__numero">{p.numero}</span>
                <span className="ligne__vignette">{p.vignette && <img src={p.vignette} alt="" width="76" height="92" />}</span>
                <span className="ligne__textes">
                  <span className="ligne__marque">{p.marque}</span>
                  <span className="ligne__nom">{p.nom}</span>
                  <span className="ligne__details">{p.details}</span>
                </span>
                <span className="ligne__prix">
                  <span className="ligne__montant">{p.prix}</span>
                  <a className="lien" href="#pieces" onFocus={() => setActif(i)}>
                    Voir la pièce
                  </a>
                </span>
              </li>
            ))}
          </ul>

          <a className="bouton" href="#pieces">
            <span className="bouton__libelle">Explorer les pièces de ce look</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
