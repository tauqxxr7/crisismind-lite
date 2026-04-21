# CrisisMind Lite

CrisisMind Lite is a minimal Gemini-powered crisis decision assistant built for a fast hackathon prototype demo.

The app takes a short situation description and returns:

- Crisis Type
- Severity
- 3 Immediate Steps
- One short safety note

It is intentionally simple: one page, no database, no auth, no framework, and no build step.

## Why This Prototype Exists

During scams, hacked accounts, and emergencies, people can panic and make risky decisions. CrisisMind Lite gives a quick first-response plan so users know what to do next without reading long search results or open-ended chatbot replies.

## Features

- One-page web app.
- Clean hackathon-ready UI.
- Textarea for free-text situation input.
- `Analyze Situation` button.
- Gemini API analysis through a tiny local Node server.
- 3 sample prompts:
  - OTP scam message
  - hacked Instagram account
  - fire in building
- Safety-first fallback if Gemini is unavailable.
- No database.
- No authentication.
- No external npm dependencies.

## Project Structure

```text
.
├─ index.html
├─ styles.css
├─ app.js
├─ server.js
├─ package.json
├─ .env.example
├─ public/
│  └─ favicon.svg
└─ PITCH.md
```

## Local Setup

1. Add your Gemini API key:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

2. Run the app:

```bash
npm start
```

3. Open:

```text
http://localhost:3000
```

No `npm install` is required because the project uses only Node.js built-in modules.

## How Gemini Is Used

The browser sends the situation text to `/api/analyze`. The local Node server calls Gemini with a strict JSON prompt and returns a compact crisis summary to the UI.

The API key stays on the server side and is not exposed in browser JavaScript.

## Demo Flow

1. Open the app.
2. Click `OTP scam message`.
3. Click `Analyze Situation`.
4. Show Crisis Type, Severity, 3 Immediate Steps, and Safety Note.
5. Repeat with `fire in building` to show Critical severity.

## Deployment Note

This is optimized for local hackathon demo speed. For cloud deployment, use a Node-capable host such as Render, Railway, or a small serverless wrapper that can keep `GEMINI_API_KEY` private.

## Submission Placeholders

- GitHub repo: `[Add public GitHub link]`
- MVP/prototype link: `[Add hosted link if deployed]`
- Demo video: `[Add demo video link]`
