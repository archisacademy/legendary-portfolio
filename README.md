# Legendary Portfolio

A modern Next.js portfolio built with Tailwind CSS v4 and custom design tokens.

## Features

### 🎨 Design System
- **Custom Color Tokens**: Primary (#1a103d) and Accent (#ea0d44) with full color scales
- **Dark Mode**: Class-based dark mode strategy with semantic color tokens
- **Fluid Typography**: Responsive font sizes using CSS clamp() for optimal readability
- **Multi-step Shadows**: Comprehensive shadow system including custom glow effects

### 🛠️ Technical Stack
- **Next.js 15** with App Router
- **Tailwind CSS v4** with custom configuration
- **TypeScript** for type safety
- **React 19** with latest features

## Design Tokens

### Colors
```css
/* Primary Color Scale */
primary-50: #f0f0f5
primary-500: #1a103d  /* Main primary */
primary-900: #0a080d

/* Accent Color Scale */
accent-50: #fdf2f4
accent-500: #ea0d44   /* Main accent */
accent-900: #78061f
```

### Typography
Fluid typography system with responsive font sizes:
- `text-xs` to `text-9xl` with clamp() values
- Optimized line heights for readability
- Scales smoothly across all screen sizes

### Shadows
Multi-step shadow system:
- `shadow-xs` to `shadow-2xl` (standard)
- `shadow-soft`, `shadow-medium`, `shadow-strong` (custom)
- `shadow-glow`, `shadow-glow-lg`, `shadow-glow-xl` (accent glow)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Dark Mode

Toggle dark mode by clicking the "Toggle Dark Mode" button in the header. The system uses CSS custom properties for seamless theme switching.

## Customization

### Adding New Colors
Add to `tailwind.config.ts`:
```typescript
colors: {
  'custom': {
    500: '#your-color',
    // ... other shades
  }
}
```

### Adding New Shadows
Add to the `boxShadow` section:
```typescript
boxShadow: {
  'custom': '0 4px 25px -5px rgb(0 0 0 / 0.1)',
}
```

### Modifying Typography
Update the `fontSize` section with new clamp() values:
```typescript
fontSize: {
  'custom': ['clamp(1rem, 0.8rem + 1vw, 1.5rem)', { lineHeight: '1.4' }],
}
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with CSS variables
│   ├── layout.tsx           # Root layout
│   └── page.tsx            # Home page with demo
├── components/              # Reusable components
└── ...
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## Deploy

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
