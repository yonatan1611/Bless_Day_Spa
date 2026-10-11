import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, ListTree } from 'lucide-react'
import { adminApi, type AdminUser, type MenuCategoryRecord } from '../../lib/adminApi'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { StatSkeleton } from '../../components/admin/ui/Skeleton'
import { EmptyState } from '../../components/admin/ui/EmptyState'
import { usePageTitle } from '../../hooks/usePageTitle'

const formatRelativeTime = (iso: string) => {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.round(diffMs / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} h ago`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days} d ago`
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

type RecentEntry = { kind: 'category' | 'item'; name: string; categoryTitle: string; updatedAt: string }

const buildRecentEntries = (categories: MenuCategoryRecord[]): RecentEntry[] => {
  const entries: RecentEntry[] = []
  for (const category of categories) {
    entries.push({ kind: 'category', name: category.title, categoryTitle: category.title, updatedAt: category.updatedAt })
    for (const item of category.items) {
      entries.push({ kind: 'item', name: item.name, categoryTitle: category.title, updatedAt: item.updatedAt })
    }
  }
  return entries.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 6)
}

type Stats = {
  categoryCount: number
  hiddenCategoryCount: number
  itemCount: number
  activeItemCount: number
  minPrice: number | null
  maxPrice: number | null
  missingPriceCount: number
}

const computeStats = (categories: MenuCategoryRecord[]): Stats => {
  const items = categories.flatMap((c) => c.items)
  const activeItems = items.filter((i) => i.isActive)
  const prices = activeItems.map((i) => i.priceEtb).filter((p): p is number => p != null)
  return {
    categoryCount: categories.length,
    hiddenCategoryCount: categories.filter((c) => !c.isActive).length,
    itemCount: items.length,
    activeItemCount: activeItems.length,
    minPrice: prices.length ? Math.min(...prices) : null,
    maxPrice: prices.length ? Math.max(...prices) : null,
    missingPriceCount: activeItems.filter((i) => i.priceEtb == null).length,
  }
}

const OverviewContent = () => {
  const [categories, setCategories] = useState<MenuCategoryRecord[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    adminApi
      .listCategories()
      .then((res) => setCategories(res.categories))
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load the overview.'))
  }, [])

  if (error) return <p className="adm-field__error">{error}</p>

  if (!categories) {
    return (
      <div className="adm-stats">
        <StatSkeleton /><StatSkeleton /><StatSkeleton />
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <EmptyState
        icon={<ListTree strokeWidth={1.5} aria-hidden="true" />}
        title="No menu categories yet"
        description="Add your first category (like Massage or Facials) to start building the menu."
        action={<Link to="/admin/menu" className="adm-btn adm-btn--primary">Go to Menu</Link>}
      />
    )
  }

  const stats = computeStats(categories)
  const recent = buildRecentEntries(categories)

  return (
    <>
      <div className="adm-stats">
        <div className="adm-stat">
          <p className="adm-stat__label">Categories</p>
          <p className="adm-stat__value">{stats.categoryCount}</p>
          {stats.hiddenCategoryCount > 0 && <p className="adm-stat__meta">{stats.hiddenCategoryCount} hidden</p>}
        </div>
        <div className="adm-stat">
          <p className="adm-stat__label">Menu items</p>
          <p className="adm-stat__value">{stats.itemCount}</p>
          <p className="adm-stat__meta">{stats.activeItemCount} active</p>
        </div>
        <div className="adm-stat adm-stat--feature">
          <p className="adm-stat__label">Price range</p>
          <p className="adm-stat__value">
            {stats.minPrice != null ? `${stats.minPrice}–${stats.maxPrice} ETB` : 'No priced items'}
          </p>
          <p className="adm-stat__meta">Across active items</p>
        </div>
        {stats.missingPriceCount > 0 && (
          <div className="adm-stat">
            <p className="adm-stat__label">Missing a price</p>
            <p className="adm-stat__value">{stats.missingPriceCount}</p>
            <p className="adm-stat__meta adm-stat__meta--warn">
              <AlertTriangle strokeWidth={2} size={12} style={{ verticalAlign: '-1px', marginRight: '0.25rem' }} aria-hidden="true" />
              Needs attention
            </p>
          </div>
        )}
      </div>

      <div className="adm-panel">
        <div className="adm-panel__header">
          <h2>Recently updated</h2>
          <Link to="/admin/menu" className="adm-btn adm-btn--sm adm-btn--ghost">
            Open menu <ArrowRight strokeWidth={2} size={14} aria-hidden="true" />
          </Link>
        </div>
        <ul className="adm-activity">
          {recent.map((entry, i) => (
            <li key={i}>
              <span className="adm-activity__name">
                {entry.name}
                {entry.kind === 'item' && <span style={{ color: 'var(--adm-text-muted)' }}> · {entry.categoryTitle}</span>}
              </span>
              <span className="adm-activity__meta">{formatRelativeTime(entry.updatedAt)}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export const AdminOverviewPage = ({ admin }: { admin: AdminUser }) => {
  usePageTitle('Overview')
  return (
    <AdminLayout admin={admin} title="Overview">
      <OverviewContent />
    </AdminLayout>
  )
}
