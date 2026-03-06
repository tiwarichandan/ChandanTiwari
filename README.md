# Commbox – Products App

A fully functional **Products** browsing application built with **React**, **TypeScript**, **Tailwind CSS**, and **React Router**. All product data is fetched in real-time from the [DummyJSON](https://dummyjson.com/docs/products) public API – nothing is mocked or hardcoded.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org) | 5 | Type safety |
| [Vite](https://vite.dev) | 7 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com) | 3 | Utility-first styling |
| [React Router](https://reactrouter.com) | 6 | Client-side routing |

---

## Features

### Products Page (`/products`)
- **Live search** – type to search products by name via the DummyJSON search endpoint
- **Category filter** – dropdown populated dynamically from the API
- **Sort** – sort by:
  - Newest (default)
  - Oldest
  - Price: Low to High
  - Price: High to Low
- **Pagination** – Previous / Next buttons (12 products per page)
- **URL-synced state** – search, category, sort, and page are all reflected in the URL query string, making the page shareable and browser-back friendly
- Click any product card to navigate to its detail page

### Product Details Page (`/products/:id`)
- Displays product thumbnail, title, description, category, price, brand, and stock
- Loading and error states handled gracefully
- **Back to products** link preserves context

---

## Project Structure

```
src/
├── api/
│   ├── http.ts          # Base fetch wrapper with error handling (ApiError class)
│   └── products.ts      # All DummyJSON API calls: getProducts, getProduct, getCategories
├── components/
│   ├── Button.tsx        # Reusable button (primary / secondary variants)
│   ├── Input.tsx         # Styled text input
│   ├── ProductCard.tsx   # Product card used in the grid
│   ├── Select.tsx        # Styled select/dropdown
│   └── Status.tsx        # Loading spinner & error state components
├── icons/               # SVG / image icon assets
├── pages/
│   ├── ProductsPage.tsx      # Products list page with search / filter / sort / pagination
│   └── ProductDetailsPage.tsx # Single product detail page
├── App.tsx              # Route definitions (React Router)
├── main.tsx             # Application entry point
└── tailwind.css         # Tailwind base/components/utilities directives + global styles
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### 1 – Install dependencies

```bash
npm install
```

### 2 – Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173** (or the next available port). The terminal will print the exact URL.

### 3 – Build for production

```bash
npm run build
```

The compiled output is placed in the `dist/` folder.

### 4 – Preview the production build locally

```bash
npm run preview
```

---

## API Reference

All requests go to `https://dummyjson.com`. The three endpoints used are:

| Endpoint | Usage |
|---|---|
| `GET /products?limit=&skip=` | Paginated product list |
| `GET /products/search?q=&limit=&skip=` | Full-text search |
| `GET /products/category/:name?limit=&skip=` | Filter by category |
| `GET /products/categories` | Fetch all available categories |
| `GET /products/:id` | Single product detail |

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |
