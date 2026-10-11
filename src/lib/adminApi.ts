// Thin fetch wrappers for the /api/admin/* routes — cookie-based session
// (credentials included on every call), JSON in and out, server error
// messages surfaced as thrown Errors so callers can show them directly.
export type AdminUser = { id: string; email: string; name: string | null; role: string }

export type MenuItemRecord = {
  id: string
  categoryId: string
  name: string
  priceEtb: number | null
  duration: string | null
  note: string | null
  sortOrder: number
  isActive: boolean
  updatedAt: string
}

export type MenuCategoryRecord = {
  id: string
  slug: string
  title: string
  tagline: string
  imageUrl: string
  altText: string
  sortOrder: number
  isActive: boolean
  items: MenuItemRecord[]
  updatedAt: string
}

class AdminApiError extends Error {}

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(path, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  // Guard against a non-JSON 200 (e.g. `vite dev` doesn't run the api/
  // functions at all and can fall through to serving something else) —
  // without this check, a malformed success response would be
  // indistinguishable from valid-but-empty data.
  const isJson = response.headers.get('content-type')?.includes('application/json')
  const body = isJson ? await response.json().catch(() => null) : null
  if (!response.ok || !isJson) {
    throw new AdminApiError(body?.error || `Request failed (${response.status}).`)
  }
  return body as T
}

export const adminApi = {
  me: () => request<AdminUser>('/api/admin/me'),
  login: (email: string, password: string) =>
    request<AdminUser>('/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => request<{ ok: true }>('/api/admin/logout', { method: 'POST' }),
  changePassword: (currentPassword: string, newPassword: string) =>
    request<{ ok: true }>('/api/admin/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  listCategories: () => request<{ categories: MenuCategoryRecord[] }>('/api/admin/categories'),
  createCategory: (data: { title: string; tagline: string; imageUrl: string; altText?: string; slug?: string }) =>
    request<{ category: MenuCategoryRecord }>('/api/admin/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateCategory: (id: string, data: Partial<Pick<MenuCategoryRecord, 'title' | 'tagline' | 'imageUrl' | 'altText' | 'sortOrder' | 'isActive'>>) =>
    request<{ category: MenuCategoryRecord }>(`/api/admin/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  deleteCategory: (id: string) => request<{ ok: true }>(`/api/admin/categories/${id}`, { method: 'DELETE' }),

  createItem: (data: { categoryId: string; name: string; priceEtb: number | null; duration?: string | null; note?: string | null }) =>
    request<{ item: MenuItemRecord }>('/api/admin/items', { method: 'POST', body: JSON.stringify(data) }),
  updateItem: (id: string, data: Partial<Pick<MenuItemRecord, 'name' | 'priceEtb' | 'duration' | 'note' | 'sortOrder' | 'isActive'>>) =>
    request<{ item: MenuItemRecord }>(`/api/admin/items/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteItem: (id: string) => request<{ ok: true }>(`/api/admin/items/${id}`, { method: 'DELETE' }),

  uploadImage: async (file: File): Promise<string> => {
    const { dataBase64, contentType } = await downscaleImage(file)
    const { url } = await request<{ url: string }>('/api/admin/upload', {
      method: 'POST',
      body: JSON.stringify({ filename: file.name, contentType, dataBase64 }),
    })
    return url
  },
}

// Downscales/recompresses in the browser before upload so a photo straight
// off a phone (often 4000px+, several MB) always lands comfortably under
// the server's 4MB request-body limit.
const downscaleImage = (file: File): Promise<{ dataBase64: string; contentType: string }> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      const MAX_DIMENSION = 1600
      const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        URL.revokeObjectURL(objectUrl)
        reject(new Error('Could not process the image.'))
        return
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(objectUrl)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.84)
      resolve({ dataBase64: dataUrl.split(',')[1], contentType: 'image/jpeg' })
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Could not read that image file.'))
    }
    img.src = objectUrl
  })
