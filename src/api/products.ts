import { fetchJson } from './http'

const API_BASE = 'https://dummyjson.com'

export type Product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage?: number
  rating?: number
  stock?: number
  brand?: string
  category: string
  thumbnail: string
  images?: string[]
  tags?: string[]
  sku?: string
  weight?: number
  dimensions?: { width: number; height: number; depth: number }
  warrantyInformation?: string
  shippingInformation?: string
  availabilityStatus?: string
  returnPolicy?: string
  minimumOrderQuantity?: number
  reviews?: Array<{
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
  }>
  meta?: {
    createdAt?: string
    updatedAt?: string
    barcode?: string
    qrCode?: string
  }
}

export type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type GetProductsParams = {
  q?: string
  category?: string
  limit?: number
  skip?: number
}

export type Category = {
  slug: string
  name: string
  url: string
}

export async function getCategories(): Promise<Category[]> {
  return fetchJson<Category[]>(`${API_BASE}/products/categories`)
}

export async function getProduct(id: number | string): Promise<Product> {
  return fetchJson<Product>(`${API_BASE}/products/${id}`)
}

export async function getProducts(params: GetProductsParams): Promise<ProductsResponse> {
  const limit = params.limit ?? 20
  const skip = params.skip ?? 0

  const qp = new URLSearchParams()
  qp.set('limit', String(limit))
  qp.set('skip', String(skip))

  if (params.q?.trim()) {
    qp.set('q', params.q.trim())
    return fetchJson<ProductsResponse>(`${API_BASE}/products/search?${qp.toString()}`)
  }

  if (params.category?.trim()) {
    return fetchJson<ProductsResponse>(`${API_BASE}/products/category/${encodeURIComponent(params.category.trim())}?${qp.toString()}`)
  }

  return fetchJson<ProductsResponse>(`${API_BASE}/products?${qp.toString()}`)
}


