import photoElodie from '../assets/figma/photo-elodie.jpg'
import photoNoe from '../assets/figma/photo-noe.jpg'
import photoSora from '../assets/figma/photo-sora.jpg'
import photoAbde from '../assets/figma/photo-abde.jpg'
import './Looks.css'

const looks = [
  {
    numero: '01',
    nom: 'Élodie Costa',
    resume: '3 pièces · dès 120 €',
    titre: 'Première Marche',
    texte: 'Robe drapée en jacquard rouge, volume sculptural et traîne en cascade.',
    photo: photoElodie,
  },
  {
    numero: '02',
    nom: 'Noé Delmas',
    resume: '3 pièces · dès 95 €',
    titre: 'Ivoire',
    texte: 'Costume ivoire, lavallière en soie et mocassins vernis : le tailleur, version lumière.',
    photo: photoNoe,
  },
  {
    numero: '03',
    nom: 'Sora Lefèvre',
    resume: '3 pièces · dès 140 €',
    titre: 'Plume Blanche',
    texte: 'Robe-manteau entièrement en plumes ivoire, sandales fines, silhouette de soirée absolue.',
    photo: photoSora,
  },
  {
    numero: '04',
    nom: 'Abde Maziane',
    resume: '4 pièces · dès 110 €',
    titre: 'Minuit',
    texte: 'Combinaison drapée à cape, ceinture en cuir et derbies noirs : une ligne, une ombre.',
    photo: photoAbde,
  },
]

function Look({ look }) {
  return (
    <a className="look" href="#shop">
      <div className="look__visuel">
        <img className="look__photo" src={look.photo} alt={`${look.nom} porte le look ${look.titre}.`} width="552" height="690" loading="lazy" />
        <span className="look__numero" aria-hidden="true">
          {look.numero}
        </span>
      </div>
      <div className="look__infos">
        <span className="look__nom">{look.nom}</span>
        <span className="look__resume">{look.resume}</span>
      </div>
      <h3 className="look__titre">{look.titre}</h3>
      <p className="look__texte">{look.texte}</p>
      <span className="lien">Voir &amp; acheter le look →</span>
    </a>
  )
}

export default function Looks() {
  return (
    <section className="looks" id="looks" aria-labelledby="looks-titre">
      <div className="filet looks__filet">
        <a className="lien" href="#pieces">
          Tous les looks →
        </a>
      </div>
      <h2 className="looks__titre" id="looks-titre">
        <span className="looks__titre1">Les looks</span> <em className="looks__titre2">du défilé</em>
      </h2>
      <div className="looks__grille">
        {looks.map((look, i) => (
          <div className={`looks__case looks__case--${i + 1}`} key={look.numero}>
            <Look look={look} />
          </div>
        ))}
      </div>
    </section>
  )
}
