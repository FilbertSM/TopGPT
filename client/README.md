## 🌐 TopGPT Client / Frontend Layer

The frontend artifact of TopGPT, engineered for speed and accessibility using React 19, Tailwind CSS v4, and Vite. 

This client acts as the central interface connecting users to the AI infrastructure. It is designed heavily around React `Suspense` borders and dynamic code splitting to ensure the underlying bundle sizes remain tiny during initial page requests.

### 🛠️ Tech Stack 

- **Framework**: React.js 19
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **SEO Optimization**: React Helmet Async
- **HTTP Client**: Axios
- **State/Notifications**: React Context API, React Hot Toast

### ⚡ Key Implementations

- **Dynamic Lazy Loading**: Routes such as `/community`, `/credits`, and `/login` are wrapped inside `React.lazy()` imports. This prevents massive JavaScript blocking issues on the main thread during Time to Interactive (TTI) profiling.
- **Dynamic SEO Injection**: The `<SEO />` component alters document heads, canonical URLs, and Open Graph parameters deterministically through the React Router lifecycle, vastly improving crawler indexing.
- **Accessibility (a11y) First**: Extensive use of Semantic HTML (`<main>`, `<aside>`, `<header>`, `<footer>`), `aria-labels`, and defensive `alt` tags on external community images.

### ⚙️ Local Development

1. Create a `.env` file in the `/client` directory (Vite requires variables prefixed with `VITE_`):
   ```env
   VITE_BACKEND_URL="http://localhost:3000"
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for Production:
   ```bash
   npm run build
   ```
