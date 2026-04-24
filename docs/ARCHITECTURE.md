# CrisisMind Lite Architecture

## 1. User Input Layer

The user enters a free-text description of an urgent situation or clicks a prepared sample prompt. This keeps the experience fast and simple for demo use.

## 2. Gemini Analysis Layer

The Node.js server receives the text and sends it to Google Gemini with a constrained prompt. Gemini is asked to return:

- crisis type
- severity
- three immediate actions
- one safety note

## 3. Structured Response Rendering

The frontend renders the response into a compact result card with clearly separated sections for crisis type, severity, immediate actions, and safety note.

## 4. Safety Disclaimer Layer

The UI reminds users that the app provides AI guidance only and that immediate danger should be escalated to local emergency services.

## 5. Deployment Layer

The prototype can be deployed on a simple Node-capable host such as Render. The server keeps the Gemini API key private and serves the static frontend directly.

## Why This Can Scale With Minor Changes

This architecture is intentionally simple, but it can scale without a full rewrite:

- prompts can be refined by scenario
- more crisis categories can be added
- structured exports can be introduced
- logging and analytics can be added later
- a database can be added only if long-term history becomes necessary

The current version is optimized for hackathon reliability, fast demos, and straightforward deployment.
