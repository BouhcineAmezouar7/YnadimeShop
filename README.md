# YnadimeShop

YnadimeShop is a responsive e-commerce storefront built with Next.js and TypeScript. It includes a browsable product catalog, product filtering, favorites, cart and checkout flows, customer accounts, order history, and a lightweight dashboard.

The application currently runs as a front-end demo. Product data is bundled with the project, and user data is saved in the browser with `localStorage`; no database or payment provider is required.

## Features

- Responsive home page with featured products, categories, offers, and promotional sections
- Product catalog with search, sorting, category, brand, price, color, rating, and availability filters
- Dynamic product detail pages
- Persistent favorites and shopping cart
- Checkout with cash-on-delivery and simulated card payment options
- Order confirmation, history, and cancellation
- Local account registration, login, password reset, and profile management
- Demo customer account for quick testing
- Store dashboard with catalog and order summaries
- About, contact, privacy, and terms pages

## Tech stack

- [Next.js 15](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [Embla Carousel](https://www.embla-carousel.com/)

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm (included with Node.js)

### Installation

```bash
git clone <repository-url>
cd ynadimeShop
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The repository also includes a Bun lockfile, so you can use Bun instead:

```bash
bun install
bun dev
```

## Demo account

On the login page, select **Continue with demo account**, or use:

```text
Email: demo@ynadimeshop.com
Password: demo12345
```

The demo account is created in the current browser when it is first used.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run the configured Next.js lint command |

To test the production version locally:

```bash
npm run build
npm run start
```

## Main routes

| Route | Description |
| --- | --- |
| `/` | Storefront home page |
| `/store` | Searchable and filterable product catalog |
| `/productDetails/[slug]` | Product details |
| `/favorite` | Saved products |
| `/card` | Shopping cart |
| `/checkout` | Delivery and payment form |
| `/orders` | Customer order history |
| `/login`, `/signup` | Customer authentication |
| `/profile` | Customer profile |
| `/account/[section]` | Addresses, payment options, returns, and cancellations |
| `/dashboard` | Store dashboard |
| `/about`, `/contact` | Company information and contact form |

## Project structure

```text
ynadimeShop/
├── public/                  # Product images and static assets
├── src/
│   ├── app/                 # App Router pages and global styles
│   ├── components/          # Shared and feature-specific UI components
│   │   ├── About/
│   │   ├── Dashboard/
│   │   ├── HomePage/
│   │   ├── Profile/
│   │   └── Store/
│   ├── data/products.ts     # Product catalog and product types
│   └── utils/               # Auth, cart, favorites, and order storage helpers
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Data persistence

This project does not currently send customer or order data to a server. The following data is stored in the browser:

- Registered accounts and the active session
- Cart and favorite products
- Orders and their status
- Profile, address, and demo payment details
- Contact form submissions

Because the data is browser-local, it is specific to the current browser and origin. Clearing site data removes it. Authentication and payments are simulations and must be replaced with secure server-side implementations before using this project in production.

## Product catalog

Products are defined in [`src/data/products.ts`](src/data/products.ts), while their images live under [`public/product`](public/product). Add or edit catalog entries there to update the storefront and dashboard.

Each product includes its category, brand, colors, price, rating, stock state, image, available sizes, features, and specifications.

## Deployment

The app can be deployed to any platform that supports Next.js. For Vercel:

1. Push the repository to a Git provider.
2. Import the repository into [Vercel](https://vercel.com/new).
3. Keep the default Next.js build settings and deploy.

No environment variables are required for the current front-end demo.
