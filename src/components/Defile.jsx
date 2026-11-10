import photoDefile from '../assets/figma/photo-defile.webp'
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
        <p className="rubrique">Le défilé</p>
        <h2 className="defile__titre" id="defile-titre">
          <span className="defile__titre1">Quatre silhouettes.</span>
          <em className="defile__titre2">Zéro pièce neuve.</em>
        </h2>
        <p className="defile__para defile__para--lettrine">
          Le soir de l’ouverture, avant les premières projections, quatre silhouettes montent les marches. Pas d’égéries, pas de
          tenues prêtées : des personnes aux parcours, aux corps et aux histoires variés, habillées de pièces qui ont déjà vécu.
        </p>
        <p className="defile__para defile__para--gris">
          Chaque vêtement porté ce soir-là vient de la communauté Vestiaire Collective. Après le défilé, il retrouve sa place sur la
          plateforme, prêt pour une nouvelle histoire.
        </p>
        <a className="lien" href="#looks">
          Explorer le défilé →
        </a>
      </div>
    </section>
  )
}
