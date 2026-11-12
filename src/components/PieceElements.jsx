import { statuts } from '../donnees.js'
import './PieceCarte.css'

export function Coeur({ plein }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"
        fill={plein ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Statut({ valeur }) {
  return (
    <p className={`statut statut--${valeur}`}>
      <span className="statut__repere" aria-hidden="true" />
      {statuts[valeur]}
    </p>
  )
}
