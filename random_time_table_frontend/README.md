# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Supabase Integration (Setup Required)

1. Install dependencies:
   - npm install @supabase/supabase-js react-router-dom

2. Create `.env` in `random_time_table_frontend/`:
   - REACT_APP_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
   - REACT_APP_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
   - REACT_APP_SITE_URL=http://localhost:3000

3. Supabase Dashboard:
   - Authentication > URL Configuration
     - Site URL: your production domain
     - Redirect URLs:
       - http://localhost:3000/**
       - https://yourapp.com/**
   - Optional: Update email templates as needed.

4. Routes added:
   - /auth/callback (handles OAuth/magic link callback)
   - /auth/reset-password (placeholder)
   - /auth/error (generic error page)

5. Helpers:
   - src/utils/getURL.js
   - src/utils/supabase.js
   - src/utils/auth.js
   - src/auth/AuthCallback.js

6. After setting env vars, restart dev server.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
