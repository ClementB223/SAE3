import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import MonteeMarches from './components/MonteeMarches.jsx'
import BandeDefilante from './components/BandeDefilante.jsx'
import Defile from './components/Defile.jsx'
import Looks from './components/Looks.jsx'
import Manifeste from './components/Manifeste.jsx'
import ShopTheLook from './components/ShopTheLook.jsx'
import Pieces from './components/Pieces.jsx'
import Footer from './components/Footer.jsx'
import { useApparitions } from './apparitions.js'

function App() {
  useApparitions()

  return (
    <>
      <MonteeMarches />
      <Header />
      <main>
        <Hero />
        <BandeDefilante />
        <Defile />
        <Looks />
        <Manifeste />
        <ShopTheLook />
        <Pieces />
      </main>
      <Footer />
    </>
  )
}

export default App
