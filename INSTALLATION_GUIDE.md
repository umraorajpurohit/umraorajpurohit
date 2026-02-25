# AvoPantry - Installation & Setup Guide

## 🚀 Quick Start

Follow these steps to apply all the improvements to your project:

### Step 1: Replace Configuration Files

Replace your existing configuration files with the updated versions:

- `next.config.js` - Enhanced with security headers, image optimization, and compression
- `package.json` - Added new dependencies and helpful scripts
- `tailwind.config.ts` - Expanded color palette with animations
- `tsconfig.json` - Additional compiler options for better type safety

### Step 2: Add New Configuration Files

Add these new files to your project root:

- `.prettierrc.json` - Code formatting rules
- `.eslintrc.json` - Enhanced ESLint configuration
- `.gitignore` - Git ignore patterns
- `.env.example` - Environment variable template

### Step 3: Install Dependencies

Run the following command to install all new dependencies:

```bash
npm install
```

This will install:
- **Runtime dependencies**: `clsx`, `sharp`
- **Dev dependencies**: TypeScript types, Prettier, ESLint plugins

### Step 4: Verify Installation

Check that everything is working:

```bash
# Type check
npm run type-check

# Lint check
npm run lint

# Format check (will fail until you install prettier)
npm run format:check
```

### Step 5: Format Your Code

Format all existing code with Prettier:

```bash
npm run format
```

---

## 📦 What's New

### Enhanced Scripts

You now have these helpful npm scripts:

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Check for linting errors
npm run lint:fix      # Fix linting errors automatically
npm run type-check    # Check TypeScript types
npm run format        # Format all files with Prettier
npm run format:check  # Check if files are formatted
```

### New Dependencies

**Runtime:**
- `clsx` - Utility for conditional className handling
- `sharp` - High-performance image optimization

**Development:**
- `@types/node`, `@types/react`, `@types/react-dom` - TypeScript definitions
- `prettier` & `prettier-plugin-tailwindcss` - Code formatting
- `@typescript-eslint/*` - Enhanced TypeScript linting

### Configuration Improvements

**next.config.js:**
- ✅ Security headers (XSS protection, clickjacking prevention)
- ✅ Image optimization (AVIF/WebP support)
- ✅ Compression enabled
- ✅ Removed X-Powered-By header

**tailwind.config.ts:**
- ✅ Expanded night color palette
- ✅ Added card-hover shadow
- ✅ Custom animations (fade-in, slide-up)
- ✅ Font family variables

**tsconfig.json:**
- ✅ Granular path aliases
- ✅ Stricter compiler options
- ✅ Better unused code detection

---

## 🎨 Using New Features

### Conditional ClassNames with clsx

```tsx
import clsx from 'clsx';

function Button({ primary, disabled }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded',
        primary && 'bg-avocado-500 text-white',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      Click me
    </button>
  );
}
```

### New Tailwind Utilities

```tsx
// Use expanded night palette
<div className="bg-night-700 text-night-100">Dark theme</div>

// Use hover shadow
<div className="shadow-card hover:shadow-card-hover transition-shadow">
  Card with hover effect
</div>

// Use animations
<div className="animate-fade-in">Fades in smoothly</div>
<div className="animate-slide-up">Slides up on load</div>
```

### Path Aliases

```tsx
// Instead of: import Button from '../../../components/Button'
import Button from '@/components/Button';
import { formatDate } from '@/lib/utils';
import type { User } from '@/types';
```

---

## 🏗️ Recommended Project Structure

Create these directories for better organization:

```bash
mkdir -p app components/ui components/layout components/features lib types public/images
```

Your project structure should look like:

```
avopantry/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/           # Reusable UI components (Button, Input, Card)
│   ├── layout/       # Layout components (Header, Footer, Sidebar)
│   └── features/     # Feature-specific components
├── lib/
│   ├── utils.ts      # Utility functions
│   └── constants.ts  # App constants
├── types/
│   └── index.ts      # Type definitions
├── public/
│   └── images/       # Static images
└── [config files]
```

---

## 🔧 Next Steps

1. **Create a utils file** for common functions:
   ```tsx
   // lib/utils.ts
   import { clsx, type ClassValue } from 'clsx';
   
   export function cn(...inputs: ClassValue[]) {
     return clsx(inputs);
   }
   ```

2. **Set up your app layout** with proper metadata:
   ```tsx
   // app/layout.tsx
   export const metadata = {
     title: 'AvoPantry',
     description: 'Your pantry management solution',
   };
   ```

3. **Create reusable components** in `components/ui/`

4. **Add environment variables** to `.env.local` (copy from `.env.example`)

5. **Consider adding** (optional):
   - `@tailwindcss/forms` for better form styling
   - `@tailwindcss/typography` for rich text content
   - Testing setup (Jest, React Testing Library)
   - Husky for pre-commit hooks

---

## 🐛 Troubleshooting

### "Cannot find module" errors
Run: `npm install`

### TypeScript errors after update
Run: `npm run type-check` to see detailed errors

### Prettier formatting conflicts with ESLint
The configurations are set up to work together. Run `npm run format` then `npm run lint:fix`

### Sharp installation issues
Sharp requires node-gyp. If you have issues:
- On macOS: Install Xcode Command Line Tools
- On Windows: Install Visual Studio Build Tools
- On Linux: Install build-essential

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Prettier Documentation](https://prettier.io/docs)

---

## ✅ Checklist

After setup, verify:

- [ ] All dependencies installed (`npm install`)
- [ ] TypeScript compiles without errors (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Code formatted (`npm run format`)
- [ ] Dev server starts (`npm run dev`)
- [ ] Production build works (`npm run build`)

Your AvoPantry project is now configured with industry best practices! 🥑
