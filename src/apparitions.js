import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TITRES =
  '.defile__titre, .looks__titre, .manifeste__titre, .shop__titre, .pieces__titre, .footer__citation, .look__titre, .anim-titre'
const PHOTOS = '.defile__photo, .look__photo, .shop__photo, .piece__vignette, .footer__photo, .anim-photo'

export function useApparitions(cle) {
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray(TITRES).forEach((titre) => {
        const lignes = titre.children.length ? Array.from(titre.children) : [titre]
        gsap.from(lignes, {
          yPercent: 60,
          opacity: 0,
          duration: 0.9,
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
            duration: 1,
            ease: 'power4.out',
            clearProps: 'clipPath,transform',
            scrollTrigger: { trigger: photo, start: 'top 96%', once: true },
          },
        )
      })

      gsap.utils.toArray('.look__numero, .anim-numero').forEach((numero) => {
        gsap.from(numero, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: numero, start: 'top 92%', once: true },
        })
      })
    })

    const barres = gsap.utils.toArray('.manifeste__titre, .barrage').map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 75%',
        onEnter: () => el.classList.add('est-visible'),
        onLeaveBack: () => el.classList.remove('est-visible'),
      }),
    )

    const rafraichir = () => ScrollTrigger.refresh()
    window.addEventListener('load', rafraichir)
    document.fonts?.ready.then(rafraichir)

    return () => {
      window.removeEventListener('load', rafraichir)
      barres.forEach((b) => b.kill())
      mm.revert()
    }
  }, [cle])
}
