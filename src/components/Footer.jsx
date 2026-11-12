import photoCloture from '../assets/figma/photo-defile.webp'
import logoBlanc from '../assets/logo/logo-collab.png'
import { Link } from 'react-router-dom'
import './Footer.css'

const colonnes = [
  {
    titre: 'Le projet',
    liens: [
      ['Le Premier Rôle', '/le-projet'],
      ['Ce qu’on fait tomber', '/le-projet#barrieres'],
      ['Le casting', '/le-casting'],
      ['Le défilé d’ouverture', '/le-projet#deroule'],
    ],
  },
  {
    titre: 'Acheter',
    liens: [
      ['Toutes les pièces', '/pieces'],
      ['Ma sélection', '/ma-selection'],
      ['Comment acheter', '/engagement#acheter'],
    ],
  },
  {
    titre: 'Engagement',
    liens: [
      ['Vente solidaire', '/engagement'],
      ['Les associations', '/engagement#associations'],
      ['La conciergerie', '/engagement#conciergerie'],
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__cloture">
        <img className="footer__photo" src={photoCloture} alt="" loading="lazy" />
        <div className="footer__phrase">
          <p className="footer__citation">Le premier rôle appartient à tous les corps</p>
        </div>
      </div>

      <div className="footer__contenu">
        <div className="footer__haut">
          <div className="footer__signature">
            <img className="footer__logo" src={logoBlanc} alt="Le Premier Rôle, Festival de Cannes × Vestiaire Collective" width="80" height="70" />
            <p className="footer__devise">Seconde main, premier rôle</p>
            <p className="footer__signature-texte">Le Premier Rôle · Festival de Cannes × Vestiaire Collective · 2027</p>
          </div>

          <nav className="footer__liens" aria-label="Plan du site">
            {colonnes.map((c) => (
              <div className="footer__colonne" key={c.titre}>
                <p className="footer__titre">{c.titre}</p>
                <ul>
                  {c.liens.map(([libelle, href]) => (
                    <li key={libelle}>
                      <Link to={href}>{libelle}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
