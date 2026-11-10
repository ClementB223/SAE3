import { useEffect, useRef } from 'react'
import rendu from '../assets/blender/tapis-rouge.jpg'
import './HeroTapisRouge.css'

const flashs = [
  { x: 6, y: 62, t: 2.1, d: 3.4 },
  { x: 12, y: 74, t: 2.9, d: 4.1 },
  { x: 18, y: 58, t: 3.6, d: 2.8 },
  { x: 3, y: 82, t: 4.4, d: 3.9 },
  { x: 94, y: 60, t: 2.3, d: 3.6 },
  { x: 88, y: 72, t: 3.2, d: 2.9 },
  { x: 82, y: 56, t: 4.0, d: 4.4 },
  { x: 97, y: 80, t: 2.7, d: 3.3 },
]

function Lettres({ texte, debut }) {
  return [...texte].map((lettre, i) => (
    <span className="intro__lettre" style={{ '--i': i, '--debut': `${debut}s` }} key={i} aria-hidden="true">
      {lettre === ' ' ? ' ' : lettre}
    </span>
  ))
}

export default function HeroTapisRouge() {
  const ref = useRef(null)

  useEffect(() => {
    const section = ref.current
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const bouger = (e) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = section.getBoundingClientRect()
        section.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
        section.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
      })
    }
    section.addEventListener('pointermove', bouger)
    return () => {
      cancelAnimationFrame(frame)
      section.removeEventListener('pointermove', bouger)
    }
  }, [])

  return (
    <section className="intro" ref={ref} aria-labelledby="intro-titre">
      <div className="intro__fond" aria-hidden="true">
        <img className="intro__rendu" src={rendu} alt="" width="1920" height="1080" />
      </div>

      <div className="intro__flashs" aria-hidden="true">
        {flashs.map((f, i) => (
          <span
            className="intro__flash"
            style={{ left: `${f.x}%`, top: `${f.y}%`, '--t': `${f.t}s`, '--d': `${f.d}s` }}
            key={i}
          />
        ))}
      </div>

      <div className="intro__vignette" aria-hidden="true" />

      <div className="intro__contenu">
        <p className="intro__surtitre">Festival de Cannes × Vestiaire Collective</p>
        <h1 className="intro__titre" id="intro-titre" aria-label="Le tapis rouge s’ouvre à tous.">
          <span className="intro__ligne">
            <Lettres texte="Le tapis rouge" debut={0.9} />
          </span>
          <span className="intro__ligne intro__ligne--2">
            <Lettres texte="S’ouvre" debut={1.5} />
            <em className="intro__serif" aria-hidden="true">à tous.</em>
          </span>
        </h1>
        <a className="intro__cta" href="#accueil">
          <span>Monter les marches</span>
          <span className="intro__trait" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
