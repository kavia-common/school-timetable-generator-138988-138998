# Supabase Configuration

This project uses Supabase for authentication and future database/storage features.

## Environment Variables (Create React App)
Create a `.env` file at `random_time_table_frontend/.env`:

REACT_APP_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
REACT_APP_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
REACT_APP_SITE_URL=http://localhost:3000

Notes:
- For CRA, variables must start with `REACT_APP_` to be available in the browser code.
- Do not expose service role keys in frontend.

## Authentication Redirects
In Supabase Dashboard:
- Authentication > URL Configuration:
  - Site URL: your production domain (e.g., https://yourapp.com)
  - Redirect URLs allowlist:
    - http://localhost:3000/**
    - https://yourapp.com/**

## Client Setup
- `src/utils/getURL.js` provides a dynamic site URL.
- `src/utils/supabase.js` initializes the client using env vars.
- `src/utils/auth.js` provides auth helpers with proper redirect handling.
- `src/auth/AuthCallback.js` handles the OAuth/email link callback.

## Database Setup Steps (to be run by SupabaseTools)
Once environment variables are present, the agent will:
1. List existing tables.
2. Create missing tables (for example, a profiles table linked to auth.users).
3. Apply RLS policies.
4. Add helper SQL functions if needed.

Example proposed initial schema:
- profiles
  - id uuid primary key references auth.users(id)
  - email text
  - created_at timestamptz default now()

RLS policies (examples):
- Enable select/update on own profile.

These will be applied via SupabaseTools in the next step.

## Usage Examples

Sign Up:
import { signUpWithEmail } from '../utils/auth'
await signUpWithEmail(email, password)

Magic Link:
import { signInWithMagicLink } from '../utils/auth'
await signInWithMagicLink(email)

OAuth:
import { signInWithOAuth } from '../utils/auth'
await signInWithOAuth('github')

Password Reset:
import { resetPassword } from '../utils/auth'
await resetPassword(email)

## Troubleshooting

- If you see "No valid Supabase credentials", ensure the .env variables are set and restart `npm start`.
- Make sure your redirect URLs are allowlisted in Supabase.
- Confirm that `REACT_APP_SITE_URL` matches your current origin for local dev (http://localhost:3000).

