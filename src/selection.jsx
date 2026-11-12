import { useCallback, useEffect, useMemo, useState } from 'react'
import { ContexteSelection } from './selection-contexte.js'
import { pieces } from './donnees.js'

const CLE = 'premier-role-selection'
const valides = new Set(pieces.map((p) => p.slug))

const nettoyer = (liste) => (Array.isArray(liste) ? [...new Set(liste)].filter((s) => valides.has(s)) : [])

const lire = () => {
  try {
    const brut = window.localStorage.getItem(CLE)
    return nettoyer(brut ? JSON.parse(brut) : [])
  } catch {
    return []
  }
}

export function SelectionProvider({ children }) {
  const [slugs, setSlugs] = useState(lire)

  useEffect(() => {
    try {
      window.localStorage.setItem(CLE, JSON.stringify(slugs))
    } catch {
      return
    }
  }, [slugs])

  useEffect(() => {
    const synchroniser = (e) => {
      if (e.key === CLE) setSlugs(lire())
    }
    window.addEventListener('storage', synchroniser)
    return () => window.removeEventListener('storage', synchroniser)
  }, [])

  const basculer = useCallback((slug) => {
    if (!valides.has(slug)) return
    setSlugs((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]))
  }, [])

  const vider = useCallback(() => setSlugs([]), [])

  const valeur = useMemo(() => ({ slugs, basculer, vider, contient: (slug) => slugs.includes(slug) }), [slugs, basculer, vider])

  return <ContexteSelection.Provider value={valeur}>{children}</ContexteSelection.Provider>
}
