import photoCloture from '../assets/figma/photo-defile.jpg'
import logoBlanc from '../assets/logo/logo-collab.png'
import './Footer.css'

const colonnes = [
  { titre: 'Le projet', liens: [['Le défilé', '#defile'], ['Les looks', '#looks'], ['Notre engagement', '#engagement'], ['Shop the look', '#shop']] },
  { titre: 'Acheter', liens: [['Toutes les pièces', '#pieces'], ['Ma sélection', '#pieces'], ['Comment acheter', '#pieces']] },
  { titre: 'Informations', liens: [['Crédits photo', '#'], ['Accessibilité', '#'], ['Mentions du projet', '#']] },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__cloture">
        <img className="footer__photo" src={photoCloture} alt="" loading="lazy" />
        <div className="footer__phrase">
          <p className="footer__citation">Le tapis rouge s’ouvre à tous.</p>
          <p className="footer__credit">Élodie, Noé, Sora et Abde, le soir de l’ouverture.</p>
        </div>
      </div>

      <div className="footer__contenu">
        <div className="footer__haut">
          <div className="footer__signature">
            <img className="footer__logo" src={logoBlanc} alt="Festival de Cannes × Vestiaire Collective" width="80" height="70" />
            <p className="footer__devise">Seconde main, premier rôle.</p>
          </div>

          <nav className="footer__liens" aria-label="Plan du site">
            {colonnes.map((c) => (
              <div className="footer__colonne" key={c.titre}>
                <p className="footer__titre">{c.titre}</p>
                <ul>
                  {c.liens.map(([libelle, href]) => (
                    <li key={libelle}>
                      <a href={href}>{libelle}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="footer__mentions">
          Projet étudiant fictif — BUT MMI 3. Ni produit ni approuvé par le Festival de Cannes ou Vestiaire Collective. Défilé,
          participants, pièces et prix imaginés pour l’exercice ; les marques citées servent d’exemple. Visuels de travail du projet.
        </p>
      </div>
    </footer>
  )
}
