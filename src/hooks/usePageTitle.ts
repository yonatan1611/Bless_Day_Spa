import { useEffect } from 'react'

export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} — Bless Day Spa`
  }, [title])
}
