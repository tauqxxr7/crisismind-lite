# CrisisMind Lite Submission Pitch

## One-Line Pitch

CrisisMind Lite is a Gemini-powered crisis decision assistant that turns a stressful situation into a clear severity level and three immediate safety steps.

## Problem

When people receive scam messages, lose access to an account, or face a building emergency, they often panic. Search results are slow, and generic chatbot answers can be too long or unclear during urgency.

## Solution

CrisisMind Lite provides a simple one-page interface where users describe the situation. Gemini classifies the crisis, assigns severity, and generates three immediate actions plus a short safety note.

## What Is Implemented

- One-page HTML/CSS/JavaScript app.
- Textarea for user input.
- Analyze Situation button.
- Gemini API integration through a small Node server.
- Outputs Crisis Type, Severity, 3 Immediate Steps, and Safety Note.
- Three sample prompts for demo speed:
  - OTP scam message
  - hacked Instagram account
  - fire in building
- Fallback guidance if Gemini is unavailable.
- Clean responsive UI for hackathon presentation.

## Differentiation

CrisisMind Lite is not a full chatbot. It is a compact crisis triage interface focused on quick decisions: classify the issue, show urgency, and provide immediate next steps.

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js built-in HTTP server
- Google Gemini API

## 60-Second Pitch

CrisisMind Lite helps people respond faster during scams, hacked accounts, and emergencies. In urgent moments, users may panic, click unsafe links, share OTPs, or delay escalation. Our prototype gives them a simple first-response plan.

The user types what happened or selects a sample prompt. Gemini analyzes the situation and returns a crisis type, severity level, three immediate steps, and one safety note. The interface is intentionally minimal so it works well in a hackathon demo and is easy for non-technical users to understand.

This prototype focuses on speed, reliability, and clarity. It has no database, no authentication, and no complex setup. The Gemini key stays server-side through a tiny Node API, and a fallback response keeps the demo usable if the AI call fails.

CrisisMind Lite shows how AI can become a practical decision assistant during stressful moments, not just a general chatbot.

## 3-Minute Demo Script

**0:00-0:25 - Opening**  
"This is CrisisMind Lite, a simple Gemini-powered crisis decision assistant. It helps users respond to urgent situations like OTP scams, hacked accounts, and fire emergencies."

**0:25-0:55 - Problem**  
"In stressful moments, people often panic. They may click a scam link, share an OTP, or delay getting help. CrisisMind Lite gives a short, structured action plan instead of a long chatbot conversation."

**0:55-1:30 - OTP Scam Demo**  
Click `OTP scam message`, then click `Analyze Situation`.  
"The app classifies the crisis, assigns severity, and gives three immediate steps. For an OTP scam, the guidance tells the user not to click the link, not to share the code, and to verify through official channels."

**1:30-2:05 - Hacked Account Demo**  
Click `Hacked Instagram account`, then click `Analyze Situation`.  
"For a hacked account, the app focuses on official recovery, password changes, two-factor authentication, and warning contacts."

**2:05-2:35 - Fire Demo**  
Click `Fire in building`, then click `Analyze Situation`.  
"For a possible fire, the severity becomes Critical and the steps prioritize moving to safety, alerting nearby people, and contacting local emergency services."

**2:35-3:00 - Closing**  
"CrisisMind Lite is intentionally lightweight: one page, Gemini API, no database, and no auth. It is built for fast demo-readiness and shows how AI can provide clear first-response guidance during urgent situations."
