import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Product } from '../api/products'
import { getProduct } from '../api/products'
import { Accordion } from '../components/Accordion'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { StarRating } from '../components/StarRating'
import { ErrorState, Loading } from '../components/Status'
import arrowIcon from '../icons/arrow.svg'
import truckIcon from '../icons/truck.svg'
import securePaymentsIcon from '../icons/secure-payments.svg'

function formatDate(value: string) {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function ProductDetailsPage() {
  const { id } = useParams()
  const numericId = useMemo(() => Number(id), [id])

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id || Number.isNaN(numericId)) {
      setError('Invalid product id')
      setIsLoading(false)
      return
    }

    let cancelled = false
    setIsLoading(true)
    setError(null)
    getProduct(numericId)
      .then((p) => {
        if (cancelled) return
        setProduct(p)
      })
      .catch((e: unknown) => {
        if (cancelled) return
        setError(e instanceof Error ? e.message : 'Failed to load product')
      })
      .finally(() => {
        if (cancelled) return
        setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id, numericId])

  return (
    <div className="min-h-full bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link to="/products" className="text-sm font-medium text-slate-700 hover:text-slate-900">
          <span className="inline-flex items-center gap-2">
            <img src={arrowIcon} alt="" aria-hidden="true" className="h-4 w-4 opacity-70" />
            Back to Products
          </span>
        </Link>

        <div className="mt-5">
          {isLoading ? <Loading label="Loading product…" /> : null}
          {!isLoading && error ? <ErrorState message={error} /> : null}

          {!isLoading && !error && product ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                <div className="md:col-span-6">
                  <div className="aspect-square overflow-hidden rounded-2xl bg-slate-100">
                    <img src={product.thumbnail} alt={product.title} className="h-full w-full object-cover" />
                  </div>

                  {product.images?.length ? (
                    <div className="mt-3 grid grid-cols-6 gap-2">
                      {product.images.slice(0, 6).map((src) => (
                        <div key={src} className="aspect-square overflow-hidden rounded-lg bg-slate-100">
                          <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="md:col-span-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{product.category}</Badge>
                    {product.availabilityStatus ? <Badge variant="dark">{product.availabilityStatus}</Badge> : null}
                  </div>

                  <h1 className="mt-3 text-2xl font-bold text-slate-900">{product.title}</h1>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{product.description}</p>

                  <div className="mt-4 flex items-center gap-2">
                    <StarRating value={product.rating ?? 0} />
                    <div className="text-sm font-semibold text-slate-900">{(product.rating ?? 0).toFixed(1)}</div>
                    <div className="text-sm text-slate-500">
                      ({product.reviews?.length ?? 0} reviews)
                    </div>
                  </div>

                  <div className="mt-4 text-3xl font-bold text-slate-900">${product.price.toFixed(2)}</div>

                  {product.tags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.tags.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs font-medium text-slate-500">Brand</div>
                      <div className="mt-1 font-semibold text-slate-900">{product.brand ?? '—'}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-500">SKU</div>
                      <div className="mt-1 font-semibold text-slate-900">{product.sku ?? '—'}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-500">Stock</div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {typeof product.stock === 'number' ? product.stock : '—'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-500">Weight</div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {typeof product.weight === 'number' ? `${product.weight}g` : '—'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button className="w-full">Order Now</Button>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <img src={truckIcon} alt="" aria-hidden="true" className="h-4 w-4 opacity-70" />
                        {product.shippingInformation ?? 'Fast shipping'}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <img
                          src={securePaymentsIcon}
                          alt=""
                          aria-hidden="true"
                          className="h-4 w-4 opacity-70"
                        />
                        Secure Payment
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Additional Information</div>
                <div className="mt-3">
                  <Accordion title="Shipping Information" defaultOpen>
                    <div>{product.shippingInformation ?? 'Ships in 3-5 business days'}</div>
                  </Accordion>
                  <Accordion title="Return Policy">
                    <div>{product.returnPolicy ?? 'See return policy at checkout'}</div>
                  </Accordion>
                  <Accordion title="Product Details">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2">
                        <span className="text-slate-600">Minimum Order</span>
                        <span className="font-semibold text-slate-900">{product.minimumOrderQuantity ?? '—'}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2">
                        <span className="text-slate-600">Discount</span>
                        <span className="font-semibold text-slate-900">
                          {typeof product.discountPercentage === 'number'
                            ? `${product.discountPercentage.toFixed(2)}%`
                            : '—'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2">
                        <span className="text-slate-600">Dimensions</span>
                        <span className="font-semibold text-slate-900">
                          {product.dimensions
                            ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth}`
                            : '—'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2">
                        <span className="text-slate-600">Updated</span>
                        <span className="font-semibold text-slate-900">
                          {product.meta?.updatedAt ? formatDate(product.meta.updatedAt) : '—'}
                        </span>
                      </div>
                    </div>
                  </Accordion>
                </div>
              </div>

              <div className="mt-8">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Customer Reviews</div>
                <div className="mt-3 space-y-3">
                  {(product.reviews ?? []).length ? (
                    product.reviews!.map((r, idx) => (
                      <div key={`${r.reviewerEmail}-${idx}`} className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{r.reviewerName}</div>
                            <div className="mt-1 text-xs text-slate-500">{formatDate(r.date)}</div>
                          </div>
                          <StarRating value={r.rating} />
                        </div>
                        <div className="mt-3 text-sm text-slate-700">{r.comment}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-slate-600">No reviews yet.</div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}


