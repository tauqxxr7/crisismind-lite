# CrisisMind Lite

> Lightweight AI-assisted crisis support interface for supportive interaction flows.

[![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-111827?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Gemini](https://img.shields.io/badge/Gemini_API-1A73E8?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

[![Source Code](https://img.shields.io/badge/Source_Code-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tauqxxr7/crisismind-lite)

## Problem

During scams, hacked accounts, online threats, and urgent safety situations, people need immediate structured guidance. Search results are slow, and generic chatbot answers can be too long or too vague in stressful moments.

## Solution

CrisisMind Lite is a focused AI triage experience that takes a plain-language situation and returns a short first-response plan with crisis type, severity, immediate next steps, and a safety note.

## Features

- Crisis type classification
- Severity tagging
- Three immediate action steps
- Safety note output
- Fallback guidance when Gemini is unavailable
- Lightweight product structure with no heavy framework dependency

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js HTTP server
- AI: Gemini API
- Deployment target: Render or any Node-capable host

## Architecture

```text
User -> browser UI -> Node.js server -> Gemini prompt with schema -> structured response -> UI rendering
```

This project is focused on deployability, maintainability, and user experience while keeping the architecture intentionally simple.

## ⚙️ Engineering Notes

- Built with clear frontend/backend/API separation
- Designed for deployable architecture (Vercel + Render style)
- Uses modular structure for scalability and maintainability
- Focused on real-world use cases, not isolated demos

## Setup

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
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

### 4. Start the app

```bash
npm start
```

### 5. Open the prototype

`http://localhost:3000`

## Environment Variables

- `GEMINI_API_KEY` for live Gemini analysis
- `PORT=3000`

## 📸 Screenshots

Screenshots coming soon

## 🚀 Deployment

Deployment in progress (planned: Vercel / Render)

## Future Improvements

- Region-aware emergency support guidance
- Better category-specific prompting
- Structured export or handoff mode
- Analytics on response quality
- Multilingual support
- Hosted deployment with monitoring

## Author

Built by **Tauqeer Bharde** as a focused AI safety and triage project with structured outputs and practical UX considerations.

## Suggested GitHub Topics

`ai, crisis-support, supportive-ai, chatbot, javascript, frontend, social-impact`
