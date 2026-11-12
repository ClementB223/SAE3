import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import Defile from '../components/Defile.jsx'
import Looks from '../components/Looks.jsx'
import Manifeste from '../components/Manifeste.jsx'
import ShopTheLook from '../components/ShopTheLook.jsx'
import Pieces from '../components/Pieces.jsx'
import './pages.css'

export default function Accueil() {
  return (
    <>
      <Hero />
      <Defile />
      <Looks />
      <Manifeste />
      <ShopTheLook />
      <Pieces />
    </>
  )
}
