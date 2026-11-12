import { useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MonteeMarches from './components/MonteeMarches.jsx'
import Accueil from './pages/Accueil.jsx'
import Projet from './pages/Projet.jsx'
import Casting from './pages/Casting.jsx'
import Look from './pages/Look.jsx'
import Catalogue from './pages/Catalogue.jsx'
import Piece from './pages/Piece.jsx'
import Engagement from './pages/Engagement.jsx'
import Selection from './pages/Selection.jsx'
import Introuvable from './pages/Introuvable.jsx'
import { SelectionProvider } from './selection.jsx'
import { useApparitions } from './apparitions.js'

function Disposition() {
  const { pathname, hash } = useLocation()
  const accueil = pathname === '/'
  useApparitions(pathname)

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <a className="evitement" href="#contenu">
        Aller au contenu
      </a>
      {accueil && <MonteeMarches />}
      <Header />
      <main id="contenu">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <SelectionProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Disposition />}>
            <Route index element={<Accueil />} />
            <Route path="le-projet" element={<Projet />} />
            <Route path="le-casting" element={<Casting />} />
            <Route path="le-casting/:slug" element={<Look />} />
            <Route path="pieces" element={<Catalogue />} />
            <Route path="pieces/:slug" element={<Piece />} />
            <Route path="engagement" element={<Engagement />} />
            <Route path="ma-selection" element={<Selection />} />
            <Route path="*" element={<Introuvable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SelectionProvider>
  )
}

export default App
