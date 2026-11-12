import photoDefile from '../assets/figma/photo-defile.webp'
import { Link } from 'react-router-dom'
import './Defile.css'

export default function Defile() {
  return (
    <section className="defile" id="defile" aria-labelledby="defile-titre">
      <figure className="defile__visuel">
        <img
          className="defile__photo"
          src={photoDefile}
          alt="Les quatre silhouettes montent les marches sous les flashs des photographes."
          width="823"
          height="463"
        />
        <figcaption className="defile__legende">La montée des marches, quelques minutes avant la première projection.</figcaption>
      </figure>

      <div className="defile__texte">
        <p className="rubrique">Le défilé d’ouverture</p>
        <h2 className="defile__titre" id="defile-titre">
          <span className="defile__titre1">Quatre silhouettes</span>
          <em className="defile__titre2">Zéro pièce neuve</em>
        </h2>
        <p className="defile__para defile__para--lettrine">
          Le soir de l’ouverture, quatre professionnels du cinéma montent les marches. Leurs métiers et leurs parcours, trop
          rarement visibles sur le tapis rouge, sont à découvrir.
        </p>
        <p className="defile__para defile__para--gris">
          Choisies avec eux en seconde main chez Vestiaire Collective, leurs tenues sont ajustées puis vendues au profit
          d’associations pour l’inclusion dans l’audiovisuel.
        </p>
        <Link className="lien" to="/le-projet#deroule">
          Le déroulé du projet →
        </Link>
      </div>
    </section>
  )
}
