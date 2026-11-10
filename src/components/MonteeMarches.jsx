import { useEffect, useRef, useState } from 'react'
import './MonteeMarches.css'

const FRAMES = 60
const base = import.meta.env.BASE_URL
const image = (i) => `${base}intro/${String(i + 1).padStart(3, '0')}.jpg`

const FIN_MONTEE = 0.528
const NOIR = [0.512, 0.592]
const CERCLE = [0.6, 0.75]
const ZOOM = [0.78, 0.975]

const borne = (v) => Math.min(1, Math.max(0, v))
const plage = (p, [a, b]) => borne((p - a) / (b - a))

export default function MonteeMarches() {
  const section = useRef(null)
  const canvas = useRef(null)
  const video = useRef(null)
  const [son, setSon] = useState(false)

  useEffect(() => {
    const el = section.current
    const cv = canvas.current
    const ctx = cv.getContext('2d')
    const images = Array.from({ length: FRAMES }, (_, i) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = image(i)
      return img
    })
    let actuelle = -1
    let frame = 0
    let enLecture = false
    let chargee = false

    const dessiner = (i, force = false) => {
      let k = i
      while (k > 0 && !(images[k].complete && images[k].naturalWidth)) k--
      const img = images[k]
      if (!img.complete || !img.naturalWidth) return
      if (k === actuelle && !force) return
      actuelle = k
      const { width: w, height: h } = cv
      const echelle = Math.max(w / img.naturalWidth, h / img.naturalHeight)
      const dw = img.naturalWidth * echelle
      const dh = img.naturalHeight * echelle
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
    }

    const progression = () => {
      const r = el.getBoundingClientRect()
      return borne(-r.top / (r.height - window.innerHeight))
    }

    const maj = () => {
      const p = progression()
      dessiner(Math.round(borne(p / FIN_MONTEE) * (FRAMES - 1)))
      el.style.setProperty('--p', p.toFixed(4))
      el.style.setProperty('--titre', (1 - borne(p / 0.096)).toFixed(3))
      el.style.setProperty('--fondu', plage(p, NOIR).toFixed(3))
      el.style.setProperty('--cercle', plage(p, CERCLE).toFixed(3))
      el.style.setProperty('--approche', plage(p, ZOOM).toFixed(4))
      el.style.setProperty('--zoom', (1 + borne(p / FIN_MONTEE) * 0.06).toFixed(4))
      const v = video.current
      if (!v) return
      if (p > NOIR[0] - 0.2 && !chargee) {
        chargee = true
        v.preload = 'auto'
        v.load()
      }
      if (p >= CERCLE[0] + 0.02 && !enLecture) {
        enLecture = true
        v.play().catch(() => {})
      } else if (p < CERCLE[0] && enLecture) {
        enLecture = false
        v.pause()
      }
    }

    const redimensionner = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(cv.clientWidth * dpr)
      cv.height = Math.round(cv.clientHeight * dpr)
      dessiner(Math.max(actuelle, 0), true)
      maj()
    }

    const auScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(maj)
    }

    images[0].onload = () => dessiner(0, true)
    images.forEach((img) => {
      img.addEventListener('load', () => {
        if (actuelle < 0) dessiner(0, true)
      })
    })

    redimensionner()
    window.addEventListener('scroll', auScroll, { passive: true })
    window.addEventListener('resize', redimensionner)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', auScroll)
      window.removeEventListener('resize', redimensionner)
    }
  }, [])

  const basculerSon = () => {
    const v = video.current
    if (!v) return
    v.muted = !v.muted
    if (!v.muted) v.play().catch(() => {})
    setSon(!v.muted)
  }

  return (
    <section className="montee" ref={section} aria-label="Montée des marches">
      <div className="montee__scene">
        <canvas className="montee__canvas" ref={canvas} aria-hidden="true" />
        <div className="montee__vignette" aria-hidden="true" />

        <div className="montee__accroche">
          <p className="montee__indice">
            <span>Faites défiler pour monter les marches</span>
            <span className="montee__trait" aria-hidden="true" />
          </p>
        </div>

        <div className="montee__noir" aria-hidden="true" />

        <div className="montee__salle">
          <div className="salle__plan">
            <img className="salle__image" src={`${base}intro/salle.jpg`} alt="" width="1920" height="1080" />
            <div className="salle__ecran">
              <video
                ref={video}
                className="salle__video"
                src={`${base}video/wild-summon.mp4`}
                muted
                playsInline
                preload="none"
                aria-label="Bande-annonce de Wild Summon, sélection Palme d’or du court métrage"
              />
            </div>
          </div>
          <button type="button" className="salle__son" onClick={basculerSon} aria-pressed={son}>
            {son ? 'Couper le son' : 'Activer le son'}
          </button>
        </div>
      </div>
    </section>
  )
}
