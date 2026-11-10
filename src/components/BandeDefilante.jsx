import './BandeDefilante.css'

function Phrase() {
  return (
    <span className="bande__phrase">
      Seconde main <em>premier rôle</em> • La mode n’a pas de norme • Pièces uniques • Défilé d’ouverture •{' '}
    </span>
  )
}

export default function BandeDefilante() {
  return (
    <div className="bande">
      <p className="bande__texte" aria-label="Seconde main, premier rôle. La mode n’a pas de norme. Pièces uniques. Défilé d’ouverture.">
        <span className="bande__piste" aria-hidden="true">
          <Phrase />
          <Phrase />
          <Phrase />
          <Phrase />
        </span>
      </p>
    </div>
  )
}
