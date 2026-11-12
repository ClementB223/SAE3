import { Link } from 'react-router-dom'
import './pages.css'

export default function Introuvable() {
  return (
    <div className="page">
      <header className="entete-page">
        <div>
          <p className="rubrique">Erreur 404</p>
          <h1 className="entete-page__titre">
            <span className="entete-page__ligne">Hors champ</span>
            <span className="entete-page__accent">cette page n’existe pas</span>
          </h1>
        </div>
        <div className="actions">
          <Link className="bouton" to="/">
            <span className="bouton__libelle">Retour à l’accueil</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>
    </div>
  )
}
