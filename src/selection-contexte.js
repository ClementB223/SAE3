import { createContext, useContext } from 'react'

export const ContexteSelection = createContext(null)

export function useSelection() {
  return useContext(ContexteSelection)
}
