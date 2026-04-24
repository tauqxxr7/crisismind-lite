# CrisisMind Lite

> AI first-response crisis triage assistant powered by Gemini.

[![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-111827?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Gemini](https://img.shields.io/badge/Gemini_API-1A73E8?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

[![Source Code](https://img.shields.io/badge/Source_Code-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tauqxxr7/crisismind-lite)

## Overview

CrisisMind Lite is a lightweight AI-powered prototype designed for urgent digital and physical safety scenarios. A user describes a situation in plain language, and the app converts it into a short first-response plan with crisis type, severity, immediate next steps, and a safety note.

This is intentionally not a general chatbot. It is a focused triage product built to produce structured, actionable guidance quickly.

## Problem

During scams, account hacks, online threats, and physical emergencies, people often panic and do not know what to do first. Search results are slow, official help pages can be overwhelming, and long AI answers are not ideal in urgent moments.

## Solution

CrisisMind Lite responds with:

- Crisis type
- Severity level
- Three immediate actions
- One short safety note

It also includes fallback guidance when live Gemini analysis is unavailable.

## Why It Stands Out

- Structured output instead of open-ended chatting
- Safety-first positioning and disclaimers
- Lightweight product architecture with no heavy framework overhead
- Useful portfolio piece for AI application design and emergency-oriented UX thinking

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js HTTP server
- AI: Gemini API
- Deployment target: Render or any Node-capable host

## Architecture

```text
User Situation Input
  -> Node.js server
  -> Gemini prompt with response schema
  -> Structured crisis response
  -> UI rendering with disclaimer and fallback logic
```

## How Gemini Is Used

Gemini is prompted to:

- classify the crisis
- assign a severity level
- return exactly three immediate actions
- provide one short safety note
- avoid hallucinated emergency numbers

If Gemini fails or is not configured, the app falls back to rule-based safety guidance for core scenarios.

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/tauqxxr7/crisismind-lite.git
cd crisismind-lite
```

### 2. Create a local environment file

```bash
copy .env.example .env.local
```

### 3. Add your Gemini API key

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Start the app

```bash
npm start
```

### 5. Open the prototype

`http://localhost:3000`

## Environment Variables

- `GEMINI_API_KEY` for live Gemini analysis

## Demo Flow

1. Open the homepage and show the safety disclaimer.
2. Run the OTP scam example.
3. Show the high-severity output and next steps.
4. Run the hacked-account example.
5. Run the fire or immediate danger example.
6. Explain the fallback safety behavior when Gemini is unavailable.

## Screenshots

### Home / Analyzer

![Home analyzer](screenshots/home.png)

### OTP Result

![OTP result](screenshots/otp-result.png)

### Hacked Account Result

![Hacked account result](screenshots/hacked-account.png)

### Fire Result

![Fire result](screenshots/fire-result.png)

## Demo Placeholder

- Live demo: `Add deployment URL here`
- Demo video: `Add demo video link here`
- Presentation deck: `Add PPT or submission deck link here`

## Future Improvements

- Region-aware emergency support guidance
- Better category-specific prompting
- Structured export or handoff mode
- Analytics on scenario types and response quality
- Multilingual support
- Cloud deployment with monitoring
