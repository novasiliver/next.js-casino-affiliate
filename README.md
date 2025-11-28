# Next.js Casino Affiliate Site

A modern, responsive casino affiliate website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Homepage**: Beautiful landing page with casino listings, categories, and featured bonuses
- **Dynamic Review Pages**: Template-based review system supporting multiple review templates
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Modern UI**: Dark theme with glassmorphism effects and smooth animations
- **Type-Safe**: Full TypeScript support with proper type definitions

## Project Structure

```
next.js-casino-affiliate/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   └── review/
│       └── [slug]/
│           ├── page.tsx    # Dynamic review page
│           └── not-found.tsx
├── components/
│   ├── Navbar.tsx          # Navigation component
│   ├── Footer.tsx         # Footer component
│   ├── CasinoCard.tsx     # Casino listing card
│   ├── FilterBar.tsx      # Filter section
│   └── review/
│       └── ReviewTemplate1.tsx  # First review template
├── data/
│   └── casinos.json       # Casino data
├── types/
│   └── casino.ts          # TypeScript types
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding New Casinos

Edit `data/casinos.json` to add new casino entries. Each casino should include:

- Basic info (slug, name, logo, rating)
- Bonus details
- Template selection (`template1`, `template2`, etc.)
- Review-specific data (pros/cons, banking, game selection, etc.)

Example:
```json
{
  "slug": "new-casino",
  "name": "New Casino",
  "logo": "NEW",
  "rating": 4.5,
  "template": "template1",
  "bonus": {
    "title": "Welcome Bonus",
    "amount": "$1,000 + 50 FS"
  }
}
```

## Creating New Review Templates

1. Create a new component in `components/review/` (e.g., `ReviewTemplate2.tsx`)
2. Follow the same structure as `ReviewTemplate1.tsx`
3. Accept `casino: Casino` as props
4. Add the template to the `templateMap` in `app/review/[slug]/page.tsx`

## Styling

The project uses Tailwind CSS with custom utilities:
- `glass-panel`: Glassmorphism effect
- `shimmer`: Shimmer animation on hover
- `no-scrollbar`: Hide scrollbars

Custom styles are defined in `app/globals.css`.

## Build for Production

```bash
npm run build
npm start
```

## License

This project is for affiliate marketing purposes. Ensure compliance with local gambling regulations.
