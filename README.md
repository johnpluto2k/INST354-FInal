# Pantry Plate

**Authors:** John Bae & Samvitti Nag
**Course:** INST 377 - Final Project
**Live site:** https://inst-377-final-project-website1.vercel.app/
**Repo:** https://github.com/johnpluto2k/INST377-Final-Project

---

## What it is

Pantry Plate is a web app that helps you cook with what you already have so
less food goes to waste. You type in the ingredients in your fridge or
pantry, and the app shows you recipes that use the most of them and require
the fewest extra groceries. You can open any recipe for full instructions
and save your favorites for later.

## What it uses

- **Node.js / Express** backend, deployed as a serverless function on Vercel
- **Supabase** (Postgres) for saving favorites
- **Spoonacular Food API** for recipes
- **Swiper** for the featured-recipes carousel
- **Chart.js** for the pantry-coverage chart on each recipe
- Plain HTML, CSS, and JavaScript on the frontend (no React, no build step)

## Pages

- **Home** - type ingredients, see matching recipes
- **Recipe** - full recipe info, save button, pantry coverage chart
- **Favorites** - your saved recipes (stored in Supabase)
- **About** - what the project is and the food-waste problem
- **Help** - how to use the app + FAQ

## Target browsers

Works on the current versions of Chrome, Edge, and Firefox on desktop.
It also works on mobile Chrome and Safari - the layout adjusts down to
small phone screens.

---

## Developer manual

This section is for someone who wants to run the project on their own
computer or take over the code.

### Run it locally

1. Clone and install:

   ```bash
   git clone https://github.com/johnpluto2k/INST377-Final-Project.git
   cd INST377-Final-Project
   npm install
   ```

2. Get a free Spoonacular key at https://spoonacular.com/food-api.

3. Make a Supabase project at https://supabase.com. In the SQL Editor,
   run the SQL from [`docs/SCHEMA.md`](docs/SCHEMA.md) to create the
   `favorites` table.

4. Copy `.env.example` to `.env` and fill in your three values:

   ```
   SPOONACULAR_API_KEY=...
   SUPABASE_URL=https://yourproject.supabase.co
   SUPABASE_ANON_KEY=...
   ```

5. Start the server:

   ```bash
   npm start
   ```

   Open http://localhost:3000. Check http://localhost:3000/api/health to
   confirm both services are connected.

### Testing

There's no automated test suite. To test manually:

- `/api/health` should return `{ ok: true, spoonacular: true, supabase: true }`
- Add `tomato, rice, cheese` on the Home page and click **Find Recipes** -
  you should see a list of matching recipes
- Open any recipe, click **Save to Favorites**, then open the Favorites
  page - the recipe should be there
- Click **Remove** on a favorite and confirm it disappears

### Project files

```
INST377-Final-Project/
├── api/index.js          Express backend (Vercel serverless function)
├── public/
│   ├── index.html        Home
│   ├── recipe.html       Recipe detail
│   ├── favorites.html    Saved recipes
│   ├── about.html, help.html
│   ├── css/styles.css    Shared stylesheet
│   └── js/               common.js, home.js, recipe.js, favorites.js
├── docs/SCHEMA.md        Supabase table SQL
├── server.js             Local dev entrypoint
├── vercel.json           Vercel routing config
├── package.json
└── README.md
```

### Backend endpoints

All three required endpoints live in `api/index.js`. The frontend only
talks to these routes - it never calls Spoonacular or Supabase directly.

| Method | Route                | What it does |
| ------ | -------------------- | ------------ |
| GET    | `/api/health`        | Sanity check - shows whether each env var is set |
| GET    | `/api/recipes`       | Calls Spoonacular `findByIngredients` (external API) |
| GET    | `/api/recipes/:id`   | Calls Spoonacular `recipes/{id}/information` for the detail page |
| GET    | `/api/favorites`     | Reads saved recipes from Supabase (DB read) |
| POST   | `/api/favorites`     | Writes a new favorite to Supabase (DB write) |
| DELETE | `/api/favorites/:id` | Removes a saved recipe |

### Deploying

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add the three env vars (`SPOONACULAR_API_KEY`, `SUPABASE_URL`,
   `SUPABASE_ANON_KEY`) in **Settings -> Environment Variables**.
4. Click Deploy. Future pushes redeploy automatically.

### Known bugs

- Spoonacular's free tier is limited to ~150 requests/day. If you hit
  the cap, the Home page shows an error - wait a bit or use a new key.
- The favorites list is shared across all visitors (no user accounts).
- Some Spoonacular recipes have broken image URLs - the cards still
  render but the image is blank.

### Roadmap

1. Add Supabase Auth so each user has their own favorites.
2. Move the pantry list from `localStorage` into a Supabase `pantry`
   table so it follows the user across devices.
3. Add diet filters (vegetarian, vegan, gluten-free) on the Home page.
4. Cache Spoonacular responses on the backend to extend the rate limit.
5. Add automated tests.

---

## Rubric coverage

| Item                                                | Where |
| --------------------------------------------------- | ----- |
| README top half (title, description, browsers)      | Top of this file |
| Developer manual                                    | "Developer manual" section above |
| Fetch via backend (3+ calls)                        | `public/js/common.js` - used by every page |
| Contemporary CSS                                    | `public/css/styles.css` (CSS vars, grid, flexbox) |
| Works on Chrome / Edge / Firefox                    | Tested |
| 2 JS libraries                                      | Swiper (Home) + Chart.js (Recipe) |
| 3+ pages                                            | Home, About, Recipe Detail (also Favorites, Help) |
| Supabase connection                                 | `api/index.js` |
| 3 authored endpoints (read DB, write DB, external)  | `GET /api/favorites`, `POST /api/favorites`, `GET /api/recipes` |
| All endpoints used by frontend                      | Yes - Home, Recipe, Favorites |
| Deployed to Vercel                                  | https://inst-377-final-project-website1.vercel.app/ |
