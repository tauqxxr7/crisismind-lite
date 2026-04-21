const situationInput = document.querySelector("#situation");
const analyzeBtn = document.querySelector("#analyzeBtn");
const statusEl = document.querySelector("#status");
const resultEl = document.querySelector("#result");
const crisisTypeEl = document.querySelector("#crisisType");
const severityEl = document.querySelector("#severity");
const stepsEl = document.querySelector("#steps");
const safetyNoteEl = document.querySelector("#safetyNote");

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    situationInput.value = button.dataset.prompt;
    situationInput.focus();
  });
});

analyzeBtn.addEventListener("click", analyzeSituation);

async function analyzeSituation() {
  const situation = situationInput.value.trim();

  if (situation.length < 8) {
    setStatus("Please describe the situation first.");
    return;
  }

  analyzeBtn.disabled = true;
  setStatus("Analyzing with Gemini...");

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ situation })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Analysis failed.");
    }

    renderResult(data);
    setStatus(data.source === "fallback" ? "Demo fallback used." : "Analysis ready.");
  } catch (error) {
    setStatus(error.message || "Something went wrong.");
  } finally {
    analyzeBtn.disabled = false;
  }
}

function renderResult(data) {
  crisisTypeEl.textContent = data.crisisType;
  severityEl.textContent = data.severity;
  severityEl.className = `severity ${String(data.severity).toLowerCase()}`;
  stepsEl.innerHTML = "";

  data.immediateSteps.slice(0, 3).forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    stepsEl.appendChild(item);
  });

  safetyNoteEl.textContent = data.safetyNote;
  resultEl.classList.remove("hidden");
  resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setStatus(message) {
  statusEl.textContent = message;
}
