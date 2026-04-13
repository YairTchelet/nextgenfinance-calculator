# API Routes — Vercel Serverless Functions

All routes in `/api/` are Node.js CommonJS (`module.exports = async function handler(req, res)`).

## Routes

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/api/send-welcome` | POST | None | Sends welcome email via Resend after registration. Body: `{ name, email }` |
| `/api/manage-access` | POST | Admin | Grant or revoke `has_access` on the profiles table |
| `/api/request-access` | POST | User | User submits a course access request |
| `/api/admin-data` | GET | Admin | Fetch data for admin dashboard |
| `/api/chat` | POST | ? | AI chat endpoint (Claude API) |

## Environment Variables

- `RESEND_API_KEY` — required for `/api/send-welcome`
- Supabase service role key — required for admin routes (`manage-access`, `admin-data`)

## Email Sender

From address: `NewGen Finance <noreply@newgenfinance.co.il>`  
Template generator: `/assets/js/email-templates.js` → `createEmailTemplate(type, data)`  
Members URL in templates: `https://newgenfinance.co.il/members/`
