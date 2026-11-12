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
          alt="Des silhouettes montent les marches sous les flashs des photographes."
          width="823"
          height="463"
        />
      </figure>

      <div className="defile__texte">
        <p className="rubrique">Le défilé d’ouverture</p>
        <h2 className="defile__titre" id="defile-titre">
          <span className="defile__titre1">Trois égéries</span>
          <em className="defile__titre2">Zéro pièce neuve</em>
        </h2>
        <p className="defile__para defile__para--lettrine">
          Le soir de l’ouverture, le 11 mai 2027, Winnie Harlow, Abdé Maziane et Peter Dinklage montent les marches. La mode, la scène et la
          haute couture s’ouvrent à tous.
        </p>
        <p className="defile__para defile__para--gris">
          Leurs tenues sont choisies en seconde main chez Vestiaire Collective, ajustées, puis vendues au profit d’associations
          pour l’inclusion dans l’audiovisuel.
        </p>
        <Link className="lien" to="/le-projet#deroule">
          Le déroulé du projet →
        </Link>
      </div>
    </section>
  )
}
