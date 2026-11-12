import { useEffect, useRef, useState } from 'react'
import Header from './Header.jsx'
import './MonteeMarches.css'

const FRAMES = 60
const base = import.meta.env.BASE_URL
const image = (i) => `${base}intro/${String(i + 1).padStart(3, '0')}.jpg`

const DUREE = 2000
const DUREE_RETOUR = 700
const FIN_MONTEE = 0.64
const NOIR = [0.6, 0.74]
const CERCLE = [0.76, 1]
const ZOOM = [0.12, 0.85]
const TOUCHES = ['ArrowDown', 'PageDown', ' ', 'Spacebar']

const borne = (v) => Math.min(1, Math.max(0, v))
const plage = (p, [a, b]) => borne((p - a) / (b - a))
const douceur = (x) => 0.5 - 0.5 * Math.cos(Math.PI * x)

export default function MonteeMarches() {
  const section = useRef(null)
  const canvas = useRef(null)
  const video = useRef(null)
  const passer = useRef(() => {})
  const [son, setSon] = useState(false)
  const [etat, setEtat] = useState('repos')

  useEffect(() => {
    const el = section.current
    const cv = canvas.current
    const ctx = cv.getContext('2d')
    const sansAnimation = window.matchMedia('(prefers-reduced-motion: reduce)')
    const images = Array.from({ length: FRAMES }, (_, i) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = image(i)
      img.decode?.().catch(() => {})
      return img
    })
    let actuelle = -1
    let frame = 0
    let anim = 0
    let enLecture = false
    let chargee = false
    let t = 0
    let mode = 'repos'
    let toucheY = null
    let debutLecture = 0
    let derniereRoue = 0
    let toucheEnLecture = false
    let remontee = 0

    const nouveauGeste = (maintenant) => maintenant - debutLecture > 250

    const changerMode = (m) => {
      mode = m
      setEtat(m)
      document.documentElement.style.overflow = m === 'lecture' || m === 'retour' ? 'hidden' : ''
    }

    const prete = (k) => images[k].complete && images[k].naturalWidth > 0

    const peindre = (img, alpha) => {
      const { width: w, height: h } = cv
      const echelle = Math.max(w / img.naturalWidth, h / img.naturalHeight)
      const dw = img.naturalWidth * echelle
      const dh = img.naturalHeight * echelle
      ctx.globalAlpha = alpha
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
    }

    const dessiner = (position, force = false) => {
      let k = Math.floor(position)
      while (k > 0 && !prete(k)) k--
      if (!prete(k)) return
      const suivante = Math.min(k + 1, FRAMES - 1)
      const fraction = suivante > k && prete(suivante) ? position - Math.floor(position) : 0
      const cle = k + Math.round(fraction * 20) / 20
      if (cle === actuelle && !force) return
      actuelle = cle
      peindre(images[k], 1)
      if (fraction > 0.02) peindre(images[suivante], fraction)
      ctx.globalAlpha = 1
    }

    const progression = () => {
      const r = el.getBoundingClientRect()
      return borne(-r.top / (r.height - window.innerHeight))
    }

    const enHaut = () => el.getBoundingClientRect().top >= -2

    const valeurs = {}
    const poser = (nom, v) => {
      if (valeurs[nom] === v) return
      valeurs[nom] = v
      el.style.setProperty(nom, v)
    }

    const maj = () => {
      const q = progression()
      const montee = douceur(borne(t / FIN_MONTEE))
      dessiner(montee * (FRAMES - 1))
      poser('--titre', (1 - borne(t / 0.08)).toFixed(3))
      poser('--fondu', plage(t, NOIR).toFixed(3))
      poser('--cercle', douceur(plage(t, CERCLE)).toFixed(3))
      poser('--approche', plage(q, ZOOM).toFixed(4))
      poser('--zoom', (1 + montee * 0.06).toFixed(4))
      const v = video.current
      if (!v) return
      if (t > 0.2 && !chargee) {
        chargee = true
        v.preload = 'auto'
        v.load()
      }
      if (t >= CERCLE[0] + 0.04 && !enLecture) {
        enLecture = true
        v.play().catch(() => {})
      } else if (t < CERCLE[0] && enLecture) {
        enLecture = false
        v.pause()
      }
    }

    const animer = (cible, duree, fin) => {
      cancelAnimationFrame(anim)
      const depart = t
      const debut = performance.now()
      const pas = (maintenant) => {
        const x = borne((maintenant - debut) / duree)
        t = depart + (cible - depart) * x
        maj()
        if (x < 1) anim = requestAnimationFrame(pas)
        else fin()
      }
      anim = requestAnimationFrame(pas)
    }

    const terminer = () => {
      cancelAnimationFrame(anim)
      t = 1
      maj()
      changerMode('fini')
    }

    const lancer = () => {
      if (mode !== 'repos') return
      if (sansAnimation.matches) {
        terminer()
        return
      }
      debutLecture = performance.now()
      changerMode('lecture')
      animer(1, DUREE * (1 - t), terminer)
    }

    const rembobiner = () => {
      if (mode !== 'fini') return
      changerMode('retour')
      animer(0, DUREE_RETOUR, () => changerMode('repos'))
    }

    passer.current = () => {
      if (mode === 'lecture') terminer()
    }

    const surRoue = (e) => {
      const maintenant = performance.now()
      const pause = maintenant - derniereRoue > 180
      derniereRoue = maintenant
      if (mode === 'lecture' || mode === 'retour') {
        e.preventDefault()
        if (mode === 'lecture' && e.deltaY > 0 && pause && nouveauGeste(maintenant)) terminer()
        return
      }
      if (!enHaut() || e.deltaY > 0) remontee = 0
      if (!enHaut()) return
      if (mode === 'repos' && e.deltaY > 0) {
        e.preventDefault()
        lancer()
      } else if (mode === 'fini' && e.deltaY < 0) {
        e.preventDefault()
        remontee += Math.abs(e.deltaY)
        if (remontee >= 120) {
          remontee = 0
          rembobiner()
        }
      }
    }

    const surToucheDebut = (e) => {
      toucheY = e.touches[0]?.clientY ?? null
      toucheEnLecture = mode === 'lecture' && nouveauGeste(performance.now())
    }

    const surToucheMouvement = (e) => {
      if (toucheY === null) return
      const dy = toucheY - (e.touches[0]?.clientY ?? toucheY)
      if (mode === 'lecture' || mode === 'retour') {
        e.preventDefault()
        return
      }
      if (!enHaut() || Math.abs(dy) < 12) return
      if (mode === 'repos' && dy > 0) {
        e.preventDefault()
        toucheY = null
        lancer()
      } else if (mode === 'fini' && dy < 0) {
        e.preventDefault()
        toucheY = null
        rembobiner()
      }
    }

    const surToucheFin = () => {
      if (mode === 'lecture' && toucheEnLecture) terminer()
      toucheEnLecture = false
      toucheY = null
    }

    const surClavier = (e) => {
      const cible = e.target
      if (cible instanceof HTMLElement && cible.closest('input, textarea, select, [contenteditable="true"]')) return
      if (mode === 'lecture' || mode === 'retour') {
        if (TOUCHES.includes(e.key) || e.key === 'Escape') {
          e.preventDefault()
          if (mode === 'lecture' && !e.repeat && (e.key === 'Escape' || nouveauGeste(performance.now()))) terminer()
        }
        return
      }
      if (mode === 'repos' && enHaut() && TOUCHES.includes(e.key)) {
        e.preventDefault()
        lancer()
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
      if (mode === 'repos' && !enHaut()) {
        t = 1
        changerMode('fini')
      }
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(maj)
    }

    images.forEach((img) => {
      img.addEventListener('load', () => {
        dessiner(douceur(borne(t / FIN_MONTEE)) * (FRAMES - 1), true)
      })
    })

    if (enHaut()) changerMode('repos')
    else {
      t = 1
      changerMode('fini')
    }

    redimensionner()
    window.addEventListener('scroll', auScroll, { passive: true })
    window.addEventListener('resize', redimensionner)
    window.addEventListener('wheel', surRoue, { passive: false })
    window.addEventListener('touchstart', surToucheDebut, { passive: true })
    window.addEventListener('touchmove', surToucheMouvement, { passive: false })
    window.addEventListener('touchend', surToucheFin, { passive: true })
    window.addEventListener('keydown', surClavier)
    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(anim)
      document.documentElement.style.overflow = ''
      window.removeEventListener('scroll', auScroll)
      window.removeEventListener('resize', redimensionner)
      window.removeEventListener('wheel', surRoue)
      window.removeEventListener('touchstart', surToucheDebut)
      window.removeEventListener('touchmove', surToucheMouvement)
      window.removeEventListener('touchend', surToucheFin)
      window.removeEventListener('keydown', surClavier)
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
    <section className="montee" ref={section} aria-label="Montée des marches" data-etat={etat}>
      <Header superpose />
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

        <button type="button" className="montee__passer" onClick={() => passer.current()} tabIndex={etat === 'lecture' ? 0 : -1}>
          Passer l’intro
        </button>
      </div>
    </section>
  )
}
