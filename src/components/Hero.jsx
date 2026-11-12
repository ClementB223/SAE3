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
        <div className="hero__gauche">
        <p className="hero__intro">
          <span className="hero__signature">Festival de Cannes × Vestiaire Collective · 11 mai 2027</span>
          Trois égéries ouvrent le festival sur le tapis rouge, dans des tenues entièrement composées de pièces de luxe de
          seconde main.
        </p>
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
        <img
          className="hero__photo"
          src={banniere}
          alt="Une personne en fauteuil roulant monte les marches du Palais par une rampe, sous les objectifs des photographes."
          width="1014"
          height="571"
        />
      </div>
    </section>
  )
}
