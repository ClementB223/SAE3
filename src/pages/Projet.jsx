import { Link } from 'react-router-dom'
import { barrieres } from '../donnees.js'
import { images } from '../images.js'
import './pages.css'
import './Projet.css'

const etapes = [
  {
    titre: 'Le casting',
    texte:
      'Avec le Collectif 50/50 et l’AAFA, nous invitons des professionnels du cinéma aux profils habituellement peu représentés : techniciens, comédiens, monteurs, de tous les corps, âges, identités et origines.',
  },
  {
    titre: 'La rencontre',
    texte:
      'Avant de découvrir leur tenue, le public découvre qui ils sont : ce qu’ils créent, ce qui les anime, leur première émotion de cinéma. Chacun prend la parole avec ses mots et dit comment il souhaite être vu.',
  },
  {
    titre: 'Les essayages',
    texte:
      'Les tenues sont choisies avec les participants dans le catalogue de seconde main de Vestiaire Collective, selon leurs envies et leurs besoins, puis ajustées. Un vêtement doit permettre de se sentir à l’aise, de bouger et de se reconnaître.',
    image: 'essayage',
  },
  {
    titre: 'Le défilé d’ouverture',
    texte:
      'Les participants entrent dans la lumière. Chaque passage porte un nom, un métier, une personnalité. La tenue accompagne la personne et lui laisse toute sa place.',
    image: 'coulisses',
  },
  {
    titre: 'La vente solidaire',
    texte:
      'Après le défilé, les pièces sont proposées dans un pop-up sur la Croisette et en ligne. La totalité des bénéfices est reversée à des associations œuvrant pour l’inclusion dans l’audiovisuel.',
    image: 'popUp',
  },
]

const campagne = [
  {
    format: 'Spot · 30 s à 1 min',
    titre: 'L’invitation',
    texte:
      'Leslie reçoit son invitation au Festival. La joie, puis la panique devant le dressing : rien n’est pensé pour elle. Jusqu’à une notification qui redonne espoir. Diffusé sur les écrans géants de la Croisette.',
  },
  {
    format: 'Motion design',
    titre: 'Le zip',
    texte:
      'Un crépitement de flashs coupé par une fermeture éclair qui bloque. Le zip finit par s’ouvrir et révèle un écran doré : le tapis rouge s’ouvre à tous les corps.',
  },
  {
    format: 'Réseaux sociaux',
    titre: 'Je vais au ciné habillé comme ça',
    texte:
      'Des créateurs de contenu montent les marches en full seconde main et détaillent leur tenue, pièce par pièce, sur Instagram et TikTok.',
  },
]

export default function Projet() {
  return (
    <>
      <div className="page">
        <ol className="fil" aria-label="Fil d’Ariane">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li aria-current="page">Le projet</li>
        </ol>

        <header className="entete-page">
          <div>
            <p className="rubrique">Le projet</p>
            <h1 className="entete-page__titre anim-titre">
              <span className="entete-page__ligne">Le premier rôle</span>
              <span className="entete-page__accent">appartient à tous les corps</span>
            </h1>
          </div>
          <p className="entete-page__chapeau">
            Rendre le tapis rouge enfin inclusif en habillant les professionnels du cinéma de toutes morphologies avec des pièces
            de seconde main, pour prouver que le style appartient à tout le monde.
          </p>
        </header>

        <section className="page-section page-section--filet recit" aria-labelledby="recit-titre">
          <div className="recit__gauche">
            <p className="rubrique-petite" id="recit-titre">
              Notre histoire
            </p>
            <p className="citation recit__question">« Est-ce que cet univers a aussi été pensé pour moi ? »</p>
          </div>
          <div className="recit__droite">
            <p className="texte-courant">
              Le cinéma raconte la vie dans toute sa diversité. Il nous fait découvrir des visages, des parcours et des expériences
              différentes des nôtres. À l’écran, chaque personne peut devenir le centre d’une histoire.
            </p>
            <p className="texte-courant">
              Cette diversité existe aussi derrière les films : chez les acteurs, les réalisateurs, les techniciens et toutes les
              personnes qui font vivre le cinéma. Pourtant, lorsqu’arrive le moment de célébrer leur travail sur le tapis rouge,
              certaines peinent encore à y trouver leur place.
            </p>
            <p className="texte-courant">
              Trouver une tenue dans laquelle on se reconnaît, adaptée à sa morphologie, à son handicap ou à ses moyens peut devenir
              un obstacle. La préparation d’une soirée de célébration se transforme alors en une question plus intime.
            </p>
            <p className="texte-courant recit__fort">
              Le Premier Rôle naît de cette question et porte une ambition : faire du tapis rouge le reflet de la vraie vie.
            </p>
          </div>
        </section>
      </div>

      <div className="page-pleine">
        <section className="page-section page-section--rouge" id="barrieres" aria-labelledby="barrieres-titre">
          <h2 className="titre-section anim-titre" id="barrieres-titre">
            <span>Trois barrières</span> <em>au pied des marches</em>
          </h2>
          <ol className="barrieres">
            {barrieres.map((b) => (
              <li className="barriere" key={b.numero}>
                <span className="barriere__numero">{b.numero}</span>
                <div className="barriere__chiffre">
                  <span className="chiffres__valeur">{b.chiffre}</span>
                  <span className="chiffres__texte">{b.legende}</span>
                </div>
                <div>
                  <h3 className="barriere__titre">{b.titre}</h3>
                  <p className="texte-courant">{b.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="page">
        <section className="page-section rencontre" aria-labelledby="rencontre-titre">
          <h2 className="titre-section anim-titre" id="rencontre-titre">
            <span>Cannes</span> <em>×</em> <span>Vestiaire Collective</span>
          </h2>
          <div className="rencontre__colonnes">
            <article className="rencontre__carte">
              <p className="rubrique-petite">Le Festival de Cannes</p>
              <h3 className="rencontre__titre">Le glamour mondial, l’exigence du cinéma d’auteur</h3>
              <p className="texte-courant">
                Le tapis rouge, les 24 marches et la Palme d’or sont des symboles connus dans le monde entier. Le Festival s’engage
                à ce que ce rituel ressemble enfin à celles et ceux qui font le cinéma, sans rien perdre de son prestige.
              </p>
            </article>
            <article className="rencontre__carte">
              <p className="rubrique-petite">Vestiaire Collective</p>
              <h3 className="rencontre__titre">Second-hand is the new Haute Couture</h3>
              <p className="texte-courant">
                Des millions de pièces de luxe et d’archives, toutes les époques, toutes les coupes, toutes les tailles. Là où les
                prototypes s’arrêtent au 36, le luxe circulaire peut habiller tous les corps, et combat la tenue portée une seule
                fois devant les photographes.
              </p>
            </article>
          </div>
          <p className="citation rencontre__phrase">Sur la Croisette, le vrai luxe, c’est d’habiller tout le monde</p>
        </section>

        <section className="page-section page-section--filet" id="deroule" aria-labelledby="deroule-titre">
          <h2 className="titre-section anim-titre" id="deroule-titre">
            <span>Le déroulé</span> <em>en cinq temps</em>
          </h2>
          <ol className="etapes">
            {etapes.map((e, i) => (
              <li className={`etape${e.image ? ' etape--image' : ''}`} key={e.titre}>
                <span className="etape__numero">0{i + 1}</span>
                <div className="etape__texte">
                  <h3 className="etape__titre">{e.titre}</h3>
                  <p className="texte-courant">{e.texte}</p>
                </div>
                {e.image && <img className="etape__image anim-photo" src={images[e.image]} alt="" loading="lazy" />}
              </li>
            ))}
          </ol>
        </section>

        <section className="page-section page-section--filet" aria-labelledby="campagne-titre">
          <h2 className="titre-section anim-titre" id="campagne-titre">
            <span>La campagne</span> <em>autour du défilé</em>
          </h2>
          <ul className="campagne">
            {campagne.map((c) => (
              <li className="campagne__carte" key={c.titre}>
                <p className="rubrique-petite">{c.format}</p>
                <h3 className="campagne__titre">{c.titre}</h3>
                <p className="texte-courant">{c.texte}</p>
              </li>
            ))}
          </ul>
          <div className="actions actions--espace">
            <Link className="bouton" to="/le-casting">
              <span className="bouton__libelle">Rencontrer le casting</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link className="lien" to="/engagement">
              Notre engagement
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
