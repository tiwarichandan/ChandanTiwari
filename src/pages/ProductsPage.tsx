import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import type { Category, Product } from '../api/products'
import { getCategories, getProducts } from '../api/products'
import { Input } from '../components/Input'
import { Pagination } from '../components/Pagination'
import { ProductCard } from '../components/ProductCard'
import { Dropdown } from '../components/Dropdown'
import { ErrorState, Loading } from '../components/Status'
import searchIcon from '../icons/search.svg'

type SortKey = 'newest' | 'oldest' | 'price_asc' | 'price_desc'

function sortProducts(products: Product[], sort: SortKey): Product[] {
  const copy = [...products]
  switch (sort) {
    case 'newest':
      return copy.sort((a, b) => b.id - a.id)
    case 'oldest':
      return copy.sort((a, b) => a.id - b.id)
    case 'price_asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price_desc':
      return copy.sort((a, b) => b.price - a.price)
    default:
      return copy
  }
}

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
]

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const q = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''
  const sort = (searchParams.get('sort') as SortKey) || 'newest'
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1)

  const limit = 12
  const skip = (page - 1) * limit

  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getCategories()
      .then((cats) => {
        if (cancelled) return
        setCategories(cats)
      })
      .catch(() => {
        // optional; categories are a nice-to-have
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)
    getProducts({ q, category, limit, skip })
      .then((res) => {
        if (cancelled) return
        setProducts(res.products)
        setTotal(res.total)
      })
      .catch((e: unknown) => {
        if (cancelled) return
        setError(e instanceof Error ? e.message : 'Failed to load products')
      })
      .finally(() => {
        if (cancelled) return
        setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [q, category, limit, skip])

  const sortedProducts = useMemo(() => sortProducts(products, sort), [products, sort])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  function updateParams(next: Record<string, string>) {
    const sp = new URLSearchParams(searchParams)
    Object.entries(next).forEach(([k, v]) => {
      if (!v) sp.delete(k)
      else sp.set(k, v)
    })
    // reset page when the query changes (unless page is explicitly set)
    if ('q' in next || 'category' in next || 'sort' in next) sp.set('page', '1')
    setSearchParams(sp, { replace: true })
  }

  return (
    <div className="min-h-full bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
          <div className="text-lg font-bold text-slate-900">Product Catalog</div>
          <div className="mt-1 text-sm text-slate-600">Discover our wide selection of quality products</div>

          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 md:max-w-[520px]">
              <Input
                value={q}
                onChange={(e) => updateParams({ q: e.target.value })}
                placeholder="Search products…"
                aria-label="Search products"
                leftIconSrc={searchIcon}
              />
            </div>

            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
              <div className="md:w-[220px]">
                <Dropdown
                  value={category}
                  onChange={(val) => updateParams({ category: val })}
                  options={[
                    { label: 'All Categories', value: '' },
                    ...categories.map((c) => ({ label: c.name, value: c.slug })),
                  ]}
                  placeholder="All Categories"
                />
              </div>

              <div className="md:w-[220px]">
                <Dropdown
                  value={sort}
                  onChange={(val) => updateParams({ sort: val })}
                  options={SORT_OPTIONS}
                  placeholder="Sort"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            {isLoading ? <Loading label="Loading products…" /> : null}
            {!isLoading && error ? <ErrorState message={error} /> : null}

            {!isLoading && !error ? (
              <>
                <div className="mb-4 text-xs text-slate-600">
                  Showing <span className="font-semibold text-slate-900">{sortedProducts.length}</span> of{' '}
                  <span className="font-semibold text-slate-900">{total}</span> products
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {sortedProducts.map((p) => (
                    <Link key={p.id} to={`/products/${p.id}`} className="block">
                      <ProductCard product={p} />
                    </Link>
                  ))}
                </div>

                <div className="mt-6">
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={(p) => updateParams({ page: String(p) })}
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}


