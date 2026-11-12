import { useCallback, useEffect, useMemo, useState } from 'react'
import { ContexteSelection } from './selection-contexte.js'

const CLE = 'premier-role-selection'

const lire = () => {
  try {
    const brut = window.localStorage.getItem(CLE)
    const liste = brut ? JSON.parse(brut) : null
    return Array.isArray(liste) ? liste : ['costume-deux-pieces-ivoire', 'lavalliere-soie-ivoire']
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

  const basculer = useCallback((slug) => {
    setSlugs((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]))
  }, [])

  const valeur = useMemo(() => ({ slugs, basculer, contient: (slug) => slugs.includes(slug) }), [slugs, basculer])

  return <ContexteSelection.Provider value={valeur}>{children}</ContexteSelection.Provider>
}
