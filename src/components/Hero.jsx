import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import banniere from '../assets/affiches/banniere.webp'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from('.hero__ligne1, .hero__ligne2', {
        y: 120,
        opacity: 0,
        duration: 2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: heroRef.current, start: 'top 75%', once: true },
      })
    }, heroRef)

    return () => context.revert()
  }, [])

  return (
    <section ref={heroRef} className="hero" id="accueil" aria-labelledby="hero-titre">
      <h1 className="hero__titre" id="hero-titre">
        <span className="hero__ligne1">Le premier rôle </span>
        <span className="hero__ligne2">
          <em>à tous les corps</em>
        </span>
      </h1>

      <div className="hero__milieu">
        <p className="hero__intro">
          <span className="hero__signature">Festival de Cannes × Vestiaire Collective · 2027</span>
          Quatre professionnels du cinéma, trop rarement invités au premier plan, ouvrent le festival sur le tapis
          rouge. Leurs tenues sont entièrement composées de pièces de luxe de seconde main.
        </p>
        <img
          className="hero__photo"
          src={banniere}
          alt="Une personne en fauteuil roulant monte les marches du Palais par une rampe, sous les objectifs des photographes."
          width="1014"
          height="571"
        />
      </div>

      <div className="hero__bas">
        <div className="hero__actions">
          <Link className="bouton" to="/le-casting">
            <span className="bouton__libelle">Découvrir le casting</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link className="lien" to="/le-projet">
            Lire le projet
          </Link>
        </div>
      </div>
    </section>
  )
}
