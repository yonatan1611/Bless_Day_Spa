import { useEffect, useState } from 'react'
import { menuCategories as staticMenuCategories, type MenuCategory } from '../content/menu'

// Seeds synchronously with the bundled static menu (identical to today's
// behavior, zero loading flash), then refreshes from /api/menu in the
// background and swaps in live data once it resolves. Once the admin page
// is in use, the database is the source of truth; until then — or if the
// request fails — this is indistinguishable from the old static import.
let cachedCategories: MenuCategory[] | null = null

export const useMenu = () => {
  const [categories, setCategories] = useState<MenuCategory[]>(cachedCategories ?? staticMenuCategories)

  useEffect(() => {
    if (cachedCategories) return
    let cancelled = false

    fetch('/api/menu')
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { categories?: MenuCategory[] } | null) => {
        if (cancelled || !data?.categories?.length) return
        cachedCategories = data.categories
        setCategories(data.categories)
      })
      .catch(() => {
        // Network/API error — the static content already rendered, so
        // there's nothing to do.
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { categories }
}
