import './Manifeste.css'

const engagements = [
  {
    titre: 'Représenter autrement',
    texte:
      'Mettre en lumière des personnes trop rarement vues dans les univers du luxe et du tapis rouge, pour leur style et leur histoire, pas pour leur différence.',
  },
  {
    titre: 'Donner une seconde vie aux vêtements',
    texte: 'Une tenue de prestige n’a pas besoin d’être neuve. Chaque pièce du défilé existait déjà, et continue son chemin avec vous.',
  },
  {
    titre: 'Faire évoluer les codes du prestige',
    texte: 'Le style et l’élégance ne sont réservés à personne. Le tapis rouge non plus.',
    lien: 'Lire notre engagement →',
  },
]

export default function Manifeste() {
  return (
    <section className="manifeste" id="engagement" aria-labelledby="manifeste-titre">
      <div className="manifeste__contenu">
        <div className="filet filet--clair">
          <p className="rubrique rubrique--clair">Notre engagement</p>
        </div>

        <h2 className="manifeste__titre" id="manifeste-titre">
          <span className="manifeste__ligne">La mode n’a pas</span>
          <span className="manifeste__ligne manifeste__ligne--2">
            <span className="manifeste__barre">
              <span>de </span>
              <s>norme.</s>
            </span>
            <em className="manifeste__annotation">que des histoires.</em>
          </span>
        </h2>

        <ul className="manifeste__engagements">
          {engagements.map((e) => (
            <li className="manifeste__engagement" key={e.titre}>
              <h3 className="manifeste__intitule">{e.titre}</h3>
              <p className="manifeste__texte">{e.texte}</p>
              {e.lien && (
                <a className="lien lien--clair" href="#engagement">
                  {e.lien}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
