import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, Search, ImagePlus, PackageOpen } from 'lucide-react'
import { adminApi, type AdminUser, type MenuCategoryRecord, type MenuItemRecord } from '../../lib/adminApi'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { useToast } from '../../components/admin/ui/Toast'
import { SlideOver } from '../../components/admin/ui/SlideOver'
import { ConfirmDialog } from '../../components/admin/ui/ConfirmDialog'
import { Badge } from '../../components/admin/ui/Badge'
import { EmptyState } from '../../components/admin/ui/EmptyState'
import { TableRowSkeleton } from '../../components/admin/ui/Skeleton'
import { TextField, TextAreaField } from '../../components/admin/ui/FormField'
import { usePageTitle } from '../../hooks/usePageTitle'

type DeleteTarget = { kind: 'category' | 'item'; id: string; name: string }

// ---- Category form (create/edit, with photo upload) -----------------------

const CategoryForm = ({
  open,
  initial,
  onClose,
  onSaved,
}: {
  open: boolean
  initial: MenuCategoryRecord | null
  onClose: () => void
  onSaved: () => void
}) => {
  const toast = useToast()
  const [title, setTitle] = useState('')
  const [tagline, setTagline] = useState('')
  const [altText, setAltText] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    setTitle(initial?.title ?? '')
    setTagline(initial?.tagline ?? '')
    setAltText(initial?.altText ?? '')
    setImageUrl(initial?.imageUrl ?? '')
    setError(null)
  }, [open, initial])

  const onPickFile = async (file: File) => {
    setUploading(true)
    setError(null)
    try {
      setImageUrl(await adminApi.uploadImage(file))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!imageUrl) {
      setError('Add a photo before saving.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      if (initial) {
        await adminApi.updateCategory(initial.id, { title, tagline, altText, imageUrl })
      } else {
        await adminApi.createCategory({ title, tagline, imageUrl, altText })
      }
      toast.success(initial ? 'Category updated.' : 'Category added.')
      onSaved()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save the category.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <SlideOver
      open={open}
      onClose={onClose}
      title={initial ? 'Edit category' : 'New category'}
      footer={
        <>
          <button type="button" className="adm-btn" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" form="category-form" className="adm-btn adm-btn--primary" disabled={saving || uploading}>
            {saving ? <span className="adm-spinner" aria-hidden="true" /> : null}
            {initial ? 'Save changes' : 'Add category'}
          </button>
        </>
      }
    >
      <form id="category-form" className="adm-form-grid" onSubmit={submit}>
        <div className="adm-form-section">
          <p className="adm-form-section__title">Details</p>
          <TextField label="Title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Hair &amp; Beauty" />
          <TextField label="Tagline" required value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="One line shown on the public menu" />
        </div>

        <div className="adm-form-section">
          <p className="adm-form-section__title">Photo</p>
          {imageUrl && (
            <img src={imageUrl} alt="" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
          )}
          <TextField label="Alt text" value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Defaults to the title" />
          <div>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onPickFile(file)
            }} />
            <button type="button" className="adm-btn" onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? <span className="adm-spinner" aria-hidden="true" /> : <ImagePlus strokeWidth={2} size={16} aria-hidden="true" />}
              {uploading ? 'Uploading…' : imageUrl ? 'Replace photo' : 'Upload photo'}
            </button>
          </div>
        </div>

        {error && <p className="adm-field__error">{error}</p>}
      </form>
    </SlideOver>
  )
}

// ---- Item form (create/edit) -----------------------------------------------

const ItemForm = ({
  open,
  categoryId,
  initial,
  onClose,
  onSaved,
}: {
  open: boolean
  categoryId: string | null
  initial: MenuItemRecord | null
  onClose: () => void
  onSaved: () => void
}) => {
  const toast = useToast()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [duration, setDuration] = useState('')
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setName(initial?.name ?? '')
    setPrice(initial?.priceEtb != null ? String(initial.priceEtb) : '')
    setDuration(initial?.duration ?? '')
    setNote(initial?.note ?? '')
    setError(null)
  }, [open, initial])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const priceEtb = price.trim() ? Number(price) : null
      if (initial) {
        await adminApi.updateItem(initial.id, { name, priceEtb, duration: duration || null, note: note || null })
      } else if (categoryId) {
        await adminApi.createItem({ categoryId, name, priceEtb, duration: duration || null, note: note || null })
      }
      toast.success(initial ? 'Item updated.' : 'Item added.')
      onSaved()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save the item.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <SlideOver
      open={open}
      onClose={onClose}
      title={initial ? 'Edit item' : 'New item'}
      footer={
        <>
          <button type="button" className="adm-btn" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" form="item-form" className="adm-btn adm-btn--primary" disabled={saving}>
            {saving ? <span className="adm-spinner" aria-hidden="true" /> : null}
            {initial ? 'Save changes' : 'Add item'}
          </button>
        </>
      }
    >
      <form id="item-form" className="adm-form-grid" onSubmit={submit}>
        <TextField label="Name" required value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Price (ETB)" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} hint="Leave blank if not priced yet." />
        <TextField label="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. About 45-50 min" />
        <TextAreaField label="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Shown to visitors who expand this item" />
        {error && <p className="adm-field__error">{error}</p>}
      </form>
    </SlideOver>
  )
}

// ---- Main page --------------------------------------------------------------

const MenuWorkspace = () => {
  const toast = useToast()
  const [categories, setCategories] = useState<MenuCategoryRecord[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const [categoryForm, setCategoryForm] = useState<{ open: boolean; editing: MenuCategoryRecord | null }>({ open: false, editing: null })
  const [itemForm, setItemForm] = useState<{ open: boolean; editing: MenuItemRecord | null }>({ open: false, editing: null })
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null)
  const [deleteBusy, setDeleteBusy] = useState(false)

  const load = async () => {
    try {
      const { categories } = await adminApi.listCategories()
      setCategories(categories)
      setSelectedId((current) => (current && categories.some((c) => c.id === current) ? current : (categories[0]?.id ?? null)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load the menu.')
    }
  }

  useEffect(() => {
    load()
  }, [])

  const selected = categories?.find((c) => c.id === selectedId) ?? null
  const filteredItems = useMemo(() => {
    if (!selected) return []
    const query = search.trim().toLowerCase()
    if (!query) return selected.items
    return selected.items.filter((item) => item.name.toLowerCase().includes(query))
  }, [selected, search])

  const toggleCategoryActive = async (category: MenuCategoryRecord) => {
    try {
      await adminApi.updateCategory(category.id, { isActive: !category.isActive })
      toast.success(category.isActive ? 'Category hidden.' : 'Category shown.')
      load()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not update the category.')
    }
  }

  const toggleItemActive = async (item: MenuItemRecord) => {
    try {
      await adminApi.updateItem(item.id, { isActive: !item.isActive })
      toast.success(item.isActive ? 'Item hidden.' : 'Item shown.')
      load()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not update the item.')
    }
  }

  const performDelete = async () => {
    if (!deleteTarget) return
    setDeleteBusy(true)
    try {
      if (deleteTarget.kind === 'category') await adminApi.deleteCategory(deleteTarget.id)
      else await adminApi.deleteItem(deleteTarget.id)
      toast.success(`${deleteTarget.kind === 'category' ? 'Category' : 'Item'} deleted.`)
      setDeleteTarget(null)
      load()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not delete.')
    } finally {
      setDeleteBusy(false)
    }
  }

  if (error) return <p className="adm-field__error">{error}</p>

  if (!categories) {
    return (
      <div className="adm-table-wrap">
        <table className="adm-table">
          <tbody><TableRowSkeleton /><TableRowSkeleton /><TableRowSkeleton /></tbody>
        </table>
      </div>
    )
  }

  return (
    <>
      <div className="adm-tabs" role="tablist" aria-label="Menu categories">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={category.id === selectedId}
            className={`adm-tab ${category.id === selectedId ? 'is-active' : ''}`}
            onClick={() => setSelectedId(category.id)}
          >
            {category.title}
            <span className="adm-tab__count">{category.items.length}</span>
          </button>
        ))}
        <button type="button" className="adm-tab adm-tab--add" onClick={() => setCategoryForm({ open: true, editing: null })}>
          <Plus strokeWidth={2} size={14} aria-hidden="true" />
          Add category
        </button>
      </div>

      <div>
        {selected ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h2 style={{ fontSize: 'var(--adm-fs-lg)', fontWeight: 600 }}>{selected.title}</h2>
                  <Badge tone={selected.isActive ? 'success' : 'neutral'}>{selected.isActive ? 'Visible' : 'Hidden'}</Badge>
                </div>
                <p className="adm-field__hint">{selected.tagline}</p>
              </div>
              <div className="adm-row-actions" style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                <button type="button" className="adm-btn adm-btn--icon adm-btn--ghost" onClick={() => setCategoryForm({ open: true, editing: selected })} aria-label="Edit category">
                  <Pencil strokeWidth={2} size={15} aria-hidden="true" />
                </button>
                <button type="button" className="adm-btn adm-btn--icon adm-btn--ghost" onClick={() => toggleCategoryActive(selected)} aria-label={selected.isActive ? 'Hide category' : 'Show category'}>
                  {selected.isActive ? <EyeOff strokeWidth={2} size={15} aria-hidden="true" /> : <Eye strokeWidth={2} size={15} aria-hidden="true" />}
                </button>
                <button
                  type="button"
                  className="adm-btn adm-btn--icon adm-btn--ghost"
                  onClick={() => setDeleteTarget({ kind: 'category', id: selected.id, name: selected.title })}
                  aria-label="Delete category"
                >
                  <Trash2 strokeWidth={2} size={15} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="adm-toolbar">
              <div className="adm-search">
                <Search strokeWidth={2} aria-hidden="true" />
                <input className="adm-input" placeholder="Search items" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <button type="button" className="adm-btn adm-btn--primary" onClick={() => setItemForm({ open: true, editing: null })}>
                <Plus strokeWidth={2} size={16} aria-hidden="true" />
                Add item
              </button>
            </div>

            {filteredItems.length === 0 ? (
              <EmptyState
                icon={<PackageOpen strokeWidth={1.5} aria-hidden="true" />}
                title={search ? 'No items match that search' : 'No items in this category yet'}
                description={search ? 'Try a different search term.' : 'Add the first treatment to this category.'}
                action={!search ? <button type="button" className="adm-btn adm-btn--primary" onClick={() => setItemForm({ open: true, editing: null })}>Add item</button> : undefined}
              />
            ) : (
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Duration</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id} className={item.isActive ? '' : 'is-inactive'}>
                        <td data-label="Name" className="adm-table__name">{item.name}</td>
                        <td data-label="Duration">{item.duration || '—'}</td>
                        <td data-label="Price" className="is-numeric">{item.priceEtb != null ? `${item.priceEtb} ETB` : '—'}</td>
                        <td data-label="Status"><Badge tone={item.isActive ? 'success' : 'neutral'}>{item.isActive ? 'Active' : 'Hidden'}</Badge></td>
                        <td>
                          <div className="adm-table__actions">
                            <button type="button" className="adm-btn adm-btn--icon adm-btn--sm adm-btn--ghost" onClick={() => setItemForm({ open: true, editing: item })} aria-label="Edit item">
                              <Pencil strokeWidth={2} size={14} aria-hidden="true" />
                            </button>
                            <button type="button" className="adm-btn adm-btn--icon adm-btn--sm adm-btn--ghost" onClick={() => toggleItemActive(item)} aria-label={item.isActive ? 'Hide item' : 'Show item'}>
                              {item.isActive ? <EyeOff strokeWidth={2} size={14} aria-hidden="true" /> : <Eye strokeWidth={2} size={14} aria-hidden="true" />}
                            </button>
                            <button
                              type="button"
                              className="adm-btn adm-btn--icon adm-btn--sm adm-btn--ghost"
                              onClick={() => setDeleteTarget({ kind: 'item', id: item.id, name: item.name })}
                              aria-label="Delete item"
                            >
                              <Trash2 strokeWidth={2} size={14} aria-hidden="true" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon={<PackageOpen strokeWidth={1.5} aria-hidden="true" />}
            title="No categories yet"
            description="Add a category like Massage or Facials to start building the menu."
            action={<button type="button" className="adm-btn adm-btn--primary" onClick={() => setCategoryForm({ open: true, editing: null })}>Add category</button>}
          />
        )}
      </div>

      <CategoryForm
        open={categoryForm.open}
        initial={categoryForm.editing}
        onClose={() => setCategoryForm({ open: false, editing: null })}
        onSaved={load}
      />
      <ItemForm
        open={itemForm.open}
        categoryId={selectedId}
        initial={itemForm.editing}
        onClose={() => setItemForm({ open: false, editing: null })}
        onSaved={load}
      />
      <ConfirmDialog
        open={deleteTarget != null}
        title={`Delete ${deleteTarget?.kind === 'category' ? 'category' : 'item'}?`}
        description={`"${deleteTarget?.name}" will be removed${deleteTarget?.kind === 'category' ? ' along with all of its items' : ''}. This can't be undone.`}
        busy={deleteBusy}
        onConfirm={performDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  )
}

export const AdminMenuPage = ({ admin }: { admin: AdminUser }) => {
  usePageTitle('Menu')
  return (
    <AdminLayout admin={admin} title="Menu">
      <MenuWorkspace />
    </AdminLayout>
  )
}
