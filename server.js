const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

loadEnvFile(".env.local");
loadEnvFile(".env");

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const PUBLIC_FILES = {
  "/": "index.html",
  "/index.html": "index.html",
  "/styles.css": "styles.css",
  "/app.js": "app.js",
  "/public/favicon.svg": "public/favicon.svg"
};

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/analyze") {
      const body = await readJson(req);
      const situation = String(body.situation || "").trim();

      if (situation.length < 8) {
        return sendJson(res, 400, { error: "Please describe the situation first." });
      }

      const analysis = await analyzeWithGemini(situation);
      return sendJson(res, 200, analysis);
    }

    if (req.method === "GET" && PUBLIC_FILES[req.url]) {
      return serveFile(res, PUBLIC_FILES[req.url]);
    }

    sendJson(res, 404, { error: "Not found" });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "Server error. Please try again." });
  }
});

server.listen(PORT, () => {
  console.log(`CrisisMind Lite running at http://localhost:${PORT}`);
});

async function analyzeWithGemini(situation) {
  if (!GEMINI_API_KEY) {
    return { ...fallbackAnalysis(situation), source: "fallback" };
  }

  const prompt = `You are CrisisMind Lite, a concise crisis triage assistant.

Analyze the user's situation and return JSON only.

Rules:
- Classify crisisType in short plain English.
- severity must be one of: Low, Medium, High, Critical.
- Severity calibration:
  - OTP, password, recovery-code, phishing-link, or bank fraud attempts should usually be High.
  - Hacked social/email accounts should usually be High.
  - Smoke, fire, trapped people, violence, or immediate physical danger should be Critical.
  - Use Low only for non-urgent informational concerns.
- Give exactly 3 immediateSteps.
- Give one short safetyNote.
- Do not invent emergency phone numbers.
- If there is immediate physical danger, tell the user to move to safety and contact local emergency services.
- If it is a scam, hacked account, or OTP case, warn not to share OTPs, passwords, or recovery codes.

JSON shape:
{
  "crisisType": "",
  "severity": "Low|Medium|High|Critical",
  "immediateSteps": ["", "", ""],
  "safetyNote": ""
}

Situation: ${situation}`;

  try {
    const data = await generateGeminiContent(prompt);
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const parsed = normalizeAnalysis(parseGeminiJson(text));
    return { ...parsed, source: "gemini" };
  } catch (error) {
    console.error("Gemini fallback used:", error.message);
    return { ...fallbackAnalysis(situation), source: "fallback" };
  }
}

async function generateGeminiContent(prompt) {
  const models = ["gemini-2.5-flash-lite", "gemini-flash-lite-latest", "gemini-flash-latest"];
  let lastStatus = "";

  for (const model of models) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 500,
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                crisisType: { type: "STRING" },
                severity: { type: "STRING", enum: ["Low", "Medium", "High", "Critical"] },
                immediateSteps: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                  minItems: 3,
                  maxItems: 3
                },
                safetyNote: { type: "STRING" }
              },
              required: ["crisisType", "severity", "immediateSteps", "safetyNote"]
            }
          }
        })
      }
    );

    if (response.ok) {
      return response.json();
    }

    lastStatus = `${model} returned ${response.status}`;
  }

  throw new Error(`Gemini request failed: ${lastStatus}`);
}

function normalizeAnalysis(value) {
  const severity = ["Low", "Medium", "High", "Critical"].includes(value.severity)
    ? value.severity
    : "Medium";

  const steps = Array.isArray(value.immediateSteps) ? value.immediateSteps : [];

  return {
    crisisType: String(value.crisisType || "Unclear crisis").slice(0, 80),
    severity,
    immediateSteps: [
      String(steps[0] || "Pause and avoid taking risky action until the situation is verified."),
      String(steps[1] || "Use official channels to confirm what is happening."),
      String(steps[2] || "Preserve evidence such as screenshots, sender details, and timestamps.")
    ],
    safetyNote: String(
      value.safetyNote ||
        "AI guidance only. If anyone is in immediate danger, contact local emergency services."
    ).slice(0, 220)
  };
}

function fallbackAnalysis(situation) {
  const text = situation.toLowerCase();

  if (text.includes("fire") || text.includes("smoke") || text.includes("building")) {
    return {
      crisisType: "Fire or building emergency",
      severity: "Critical",
      immediateSteps: [
        "Move away from smoke or flames using the safest exit available.",
        "Alert nearby people and avoid elevators.",
        "Contact local emergency services or building security from a safe place."
      ],
      safetyNote: "Do not re-enter the building for belongings until officials say it is safe."
    };
  }

  if (text.includes("instagram") || text.includes("hacked") || text.includes("account")) {
    return {
      crisisType: "Hacked social account",
      severity: "High",
      immediateSteps: [
        "Try account recovery only through the official app or website.",
        "Change passwords from a trusted device and enable two-factor authentication.",
        "Warn close contacts not to trust messages from the compromised account."
      ],
      safetyNote: "Do not share passwords, OTPs, or recovery codes with anyone claiming to help."
    };
  }

  if (text.includes("otp") || text.includes("scam") || text.includes("link")) {
    return {
      crisisType: "OTP scam or phishing attempt",
      severity: "High",
      immediateSteps: [
        "Do not click the link or share the OTP.",
        "Open your bank or platform only through the official app or typed website.",
        "Take a screenshot and report the message through official support."
      ],
      safetyNote: "No legitimate support team should ask for your OTP, password, or recovery code."
    };
  }

  return {
    crisisType: "General safety concern",
    severity: "Medium",
    immediateSteps: [
      "Pause and avoid responding, paying, clicking links, or sharing private details.",
      "Save evidence such as screenshots, sender details, and timestamps.",
      "Ask a trusted person or official support channel to help verify the situation."
    ],
    safetyNote: "If you feel physically unsafe, move to a safe place and contact local emergency services."
  };
}

function extractJson(text) {
  const trimmed = String(text).trim();
  const match = trimmed.match(/\{[\s\S]*\}/);
  return match ? match[0] : trimmed;
}

function parseGeminiJson(text) {
  const json = extractJson(text)
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .replace(/,\s*([}\]])/g, "$1");

  return JSON.parse(json);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 100_000) {
        req.destroy();
        reject(new Error("Request too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(data || "{}"));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function serveFile(res, filePath) {
  const absolutePath = path.join(__dirname, filePath);
  const ext = path.extname(filePath);
  const contentType =
    ext === ".css" ? "text/css" : ext === ".js" ? "application/javascript" : ext === ".svg" ? "image/svg+xml" : "text/html";

  fs.readFile(absolutePath, (error, content) => {
    if (error) {
      sendJson(res, 404, { error: "File not found" });
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

function loadEnvFile(fileName) {
  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (!process.env[key]) {
      process.env[key] = rest.join("=").replace(/^["']|["']$/g, "");
    }
  }
}
