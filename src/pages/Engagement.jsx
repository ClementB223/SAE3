import { Link } from 'react-router-dom'
import { images } from '../images.js'
import './pages.css'
import './Engagement.css'

const chapitres = [
  {
    id: 'constat',
    titre: 'Le constat',
    textes: [
      'Sur les marches de Cannes, le luxe ne parle qu’à un seul corps. Les pièces de défilé sont pensées pour une taille 36, des silhouettes debout et des morphologies qui se ressemblent toutes. Celles et ceux qui sortent de ce cadre doivent faire sans, ou ne pas venir.',
      'Le cinéma raconte pourtant toutes les histoires. Il serait temps que le tapis rouge, lui aussi, accueille tous les corps qui les portent à l’écran.',
    ],
  },
  {
    id: 'seconde-main',
    titre: 'Le choix de la seconde main',
    textes: [
      'Chaque pièce du défilé existe déjà. Elle a été portée, aimée, puis confiée à Vestiaire Collective par celles et ceux qui l’ont achetée. Nous ne faisons rien fabriquer : nous faisons circuler.',
      'Ce choix nous permet de proposer des coupes et des tailles que les collections neuves oublient, du 38 au 52, et d’adapter certaines pièces aux besoins de chacun : taille élastique, fermetures faciles, pantalons pensés pour la position assise.',
      'Chaque pièce est contrôlée et authentifiée par les équipes de Vestiaire Collective avant d’être remise en vente.',
    ],
  },
  {
    id: 'associations',
    titre: 'Où va l’argent',
    textes: [
      'Après le défilé, toutes les pièces sont mises en vente sur Vestiaire Collective. La totalité des bénéfices est reversée à quatre associations qui travaillent, toute l’année, à ouvrir le cinéma à celles et ceux qu’il laisse encore de côté.',
    ],
    associations: [
      {
        nom: 'Collectif 50/50',
        texte:
          'Il agit pour l’égalité et la diversité dans le cinéma et l’audiovisuel. Votre achat finance des formations pour des techniciennes et des techniciens encore trop peu représentés sur les plateaux.',
      },
      {
        nom: 'AAFA',
        texte:
          'Actrices et Acteurs de France Associés défend tous les profils d’interprètes. Votre achat finance des castings ouverts à tous les corps, tous les âges et toutes les situations de handicap.',
      },
      {
        nom: 'Divé+',
        texte:
          'Elle accompagne la diversité et l’inclusion dans l’audiovisuel, devant et derrière la caméra. Votre achat finance l’accompagnement de jeunes talents vers les métiers du cinéma.',
      },
      {
        nom: 'Ciné-ma différence',
        texte:
          'Elle organise des séances de cinéma adaptées aux personnes en situation de handicap. Votre achat finance de nouvelles séances, partout en France.',
      },
    ],
  },
  {
    id: 'conciergerie',
    titre: 'Après le défilé',
    textes: [
      'Après le 11 mai, les tenues du défilé partent dans un pop-up store à Paris et en ligne sur le site de Vestiaire Collective. On y essaie les pièces, on y rencontre celles et ceux qui les ont portées, et on peut repartir avec.',
      'Pendant le festival, une conciergerie inclusive accueille sur la Croisette chaque accrédité qui n’a pas trouvé sa tenue. Sélection, essayage et retouches y sont faits sur place et sans frais, pour que personne ne renonce à monter les marches faute d’une tenue à sa taille.',
    ],
  },
]

const promesses = [
  'Aucune pièce neuve fabriquée pour le défilé.',
  'Toutes les tailles, du 38 au 52, et des pièces adaptées aux corps en situation de handicap.',
  '100 % des bénéfices reversés à quatre associations pour l’inclusion dans l’audiovisuel.',
  'Des égéries choisies pour ce qu’elles portent à l’écran, pas pour leur taille.',
  'Une conciergerie gratuite ouverte à tous les accrédités du festival.',
]

export default function Engagement() {
  return (
    <div className="page">
      <ol className="fil" aria-label="Fil d’Ariane">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li aria-current="page">Notre engagement</li>
      </ol>

      <header className="engage-tete">
        <p className="rubrique">Notre engagement</p>
        <h1 className="engage-tete__titre anim-titre">
          <span>Habiller tout le monde</span>
          <em>c’est ça, le vrai luxe</em>
        </h1>
      </header>

      <section className="engage-manifeste" aria-label="Manifeste">
        <p className="engage-manifeste__texte">
          Le Premier Rôle est né d’une conviction simple : le luxe n’a de sens que s’il peut être porté par tout le monde. Pour
          l’ouverture du Festival de Cannes, le 11 mai 2027, Vestiaire Collective habille trois égéries et des participants de toutes les
          morphologies, uniquement avec des pièces de seconde main.
        </p>
        <div className="engage-manifeste__colonnes">
          <p>
            Pas de collection capsule, pas de pièces fabriquées pour l’occasion. Des vêtements qui ont déjà une histoire, choisis
            pour leur coupe et ajustés à celles et ceux qui les portent.
          </p>
          <p>
            Après le défilé, tout est remis en vente. Ce qui a brillé sur les marches finance celles et ceux qui feront le
            cinéma de demain.
          </p>
        </div>
      </section>

      <figure className="engage-photo">
        <img className="anim-photo" src={images.coulisses} alt="Des participants de tous les âges et de toutes les morphologies se préparent en coulisses." loading="lazy" />
        <figcaption>En coulisses, avant la montée des marches.</figcaption>
      </figure>

      <div className="chapitres">
        {chapitres.map((c) => (
          <section className="chapitre" id={c.id} key={c.id} aria-labelledby={`${c.id}-titre`}>
            <div className="chapitre__tete">
              <h2 className="chapitre__titre" id={`${c.id}-titre`}>
                {c.titre}
              </h2>
            </div>
            <div className="chapitre__corps">
              {c.textes.map((t) => (
                <p key={t}>{t}</p>
              ))}
              {c.associations && (
                <ul className="chapitre__assos">
                  {c.associations.map((a) => (
                    <li key={a.nom}>
                      <span className="chapitre__asso">{a.nom}</span>
                      <p>{a.texte}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>

      <section className="promesses" id="acheter" aria-labelledby="promesses-titre">
        <h2 className="promesses__titre" id="promesses-titre">
          Nos engagements
        </h2>
        <ol className="promesses__liste">
          {promesses.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
      </section>

      <section className="engage-fin" aria-label="Aller plus loin">
        <p className="engage-fin__texte">Chaque achat prolonge le défilé.</p>
        <div className="actions">
          <Link className="bouton" to="/pieces">
            <span className="bouton__libelle">Voir les pièces</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link className="lien" to="/le-casting">
            Découvrir le casting →
          </Link>
        </div>
      </section>
    </div>
  )
}
