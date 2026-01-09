# SmartCart Web

A modern, responsive grocery shopping assistant built with Angular and NgRx. SmartCart enables users to manage categories and shopping lists through a clean, mobile-first interface. NgRx is used to ensure predictable state management and scalability as application features and complexity grow.

## Features
- Auth flow (register, login, profile, change password) with route guards
- Category and item management
- Shopping list builder with item forms
- Search and history views
- Global state management with NgRx
- Responsive UI for mobile and desktop

## Tech Stack
- Angular 20 (standalone components)
- TypeScript
- NgRx (store, effects, devtools)
- RxJS
- Angular Material
- SCSS

## Architecture Decisions
- Standalone components used to reduce module complexity
- Feature-based folder structure for scalability
- NgRx for predictable state management and debugging
- Angular SSR enabled for improved performance and SEO

## Project Structure
```
src/
  app/
    auth/                 Guards + auth store
    change-password/      Change password feature
    header/               App header
    history/              Shopping history
    home/                 Home dashboard
    interfaces/           Shared TypeScript interfaces
    login/                Login page
    profile/              Profile page
    register/             Registration page
    search/               Search UI
    service/              API services and endpoints
    shared/               Shared components (loader)
    shopping-item/        Item feature + NgRx store
    shopping-list/        Category feature + NgRx store
    shopping-list-form/   Create/edit shopping list
    shopping-list-item-form/ Add/edit shopping list items
    shopping-list-page/   Shopping list page wrapper
    utils/                Utility helpers
  main.ts                 Client bootstrap
  main.server.ts        Server bootstrap
server.ts               Express SSR server
  styles.scss             Global styles
```

## Setup and Run Locally
```bash
npm install
npm start
```
App runs at http://localhost:4200.

## Useful Scripts
- `npm start` - Run dev server
- `npm run build` - Production build
- `npm run serve:ssr:SmartCart-Web` - Serve the SSR build
- `npm run watch` - Build in watch mode
- `npm test` - Run unit tests

## API Configuration
API endpoints are defined in `src/app/service/path.ts`. Update the base host there if you need to point to a different backend.

## Deployment Notes
`npm run build` outputs to `dist/SmartCart-Web/browser`. The `postbuild` script copies `index.csr.html` to `index.html` for static hosting (for example, Vercel).
