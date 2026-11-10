import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TITRES = '.defile__titre, .looks__titre, .manifeste__titre, .shop__titre, .pieces__titre, .footer__citation, .look__titre'
const PHOTOS = '.defile__photo, .look__photo, .shop__photo, .piece__vignette, .footer__photo'

export function useApparitions() {
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray(TITRES).forEach((titre) => {
        const lignes = titre.children.length ? Array.from(titre.children) : [titre]
        gsap.from(lignes, {
          yPercent: 60,
          opacity: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: titre, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray(PHOTOS).forEach((photo) => {
        gsap.fromTo(
          photo,
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.4,
            ease: 'power4.out',
            clearProps: 'clipPath,transform',
            scrollTrigger: { trigger: photo, start: 'top 90%', once: true },
          },
        )
      })

      gsap.utils.toArray('.look__numero').forEach((numero) => {
        gsap.from(numero, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: 0.35,
          ease: 'power3.out',
          scrollTrigger: { trigger: numero, start: 'top 92%', once: true },
        })
      })
    })

    const barre = ScrollTrigger.create({
      trigger: '.manifeste__titre',
      start: 'top 70%',
      once: true,
      onEnter: () => document.querySelector('.manifeste__titre')?.classList.add('est-visible'),
    })

    const rafraichir = () => ScrollTrigger.refresh()
    window.addEventListener('load', rafraichir)
    document.fonts?.ready.then(rafraichir)

    return () => {
      window.removeEventListener('load', rafraichir)
      barre.kill()
      mm.revert()
    }
  }, [])
}
