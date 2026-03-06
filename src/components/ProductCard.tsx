import type { Product } from '../api/products'
import { StarRating } from './StarRating'

export function ProductCard({ product }: { product: Product }) {
  const rating = product.rating ?? 0
  return (
    <div className="group h-full rounded-xl border border-slate-200 bg-white p-3 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition hover:shadow-sm">
      <div className="aspect-square overflow-hidden rounded-lg bg-slate-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      <div className="mt-3">
        <div className="truncate text-sm font-semibold text-slate-900">{product.title}</div>

        <div className="mt-2 flex items-center gap-2">
          <StarRating value={rating} />
          <div className="text-xs text-slate-500">({rating.toFixed(1)})</div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-900">${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}


