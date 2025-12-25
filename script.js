const defaultReportData = {
    studentName: "om Dandagvhal",
    skills: {
        pronunciation: 7.5,
        fluency: 6.5,
        vocabulary: 6.0,
        grammar: 7.0
    }
};

function clampScore(s) {
    if (Number.isNaN(s)) return 0;
    return Math.min(9, Math.max(0, s));
}

function round1(n) {
    return Math.round(n * 10) / 10;
}

function describe(score) {
    const s = clampScore(score);
    if (s >= 8) return "Excellent performance with strong control.";
    if (s >= 6) return "Good performance with minor inaccuracies.";
    return "Needs improvement.";
}

function calculateOverall(skills) {
    const vals = Object.values(skills).map(clampScore);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return round1(avg);
}

function toPercent(score) {
    return Math.round((clampScore(score) / 9) * 100);
}

function render(data) {
    const nameEl = document.getElementById("studentName");
    const overallValEl = document.getElementById("overallValue");
    const overallBarEl = document.getElementById("overallBar");
    const skillsEl = document.getElementById("skills");
    const feedbackOverallEl = document.getElementById("feedbackOverall");
    const skillFeedbackEl = document.getElementById("skillFeedback");

    nameEl.textContent = data.studentName || "Student";

    const overall = calculateOverall(data.skills);
    overallValEl.textContent = `${overall}`;
    overallBarEl.style.width = `${toPercent(overall)}%`;

    skillsEl.innerHTML = "";
    skillFeedbackEl.innerHTML = "";

    const skillOrder = [
        { key: "pronunciation", label: "Pronunciation" },
        { key: "fluency", label: "Fluency" },
        { key: "vocabulary", label: "Vocabulary" },
        { key: "grammar", label: "Grammar" }
    ];

    for (const { key, label } of skillOrder) {
        const score = round1(clampScore(data.skills[key] ?? 0));

        const skillDiv = document.createElement("div");
        skillDiv.className = "skill";

        const header = document.createElement("div");
        header.className = "skill-header";

        const nameSpan = document.createElement("span");
        nameSpan.className = "skill-name";
        nameSpan.textContent = label;

        const scoreSpan = document.createElement("span");
        scoreSpan.className = "skill-score";
        scoreSpan.textContent = `${score} / 9`;

        header.appendChild(nameSpan);
        header.appendChild(scoreSpan);

        const progress = document.createElement("div");
        progress.className = "progress";

        const bar = document.createElement("div");
        bar.className = `progress-bar ${key}`;
        bar.style.width = `${toPercent(score)}%`;

        progress.appendChild(bar);
        skillDiv.appendChild(header);
        skillDiv.appendChild(progress);
        skillsEl.appendChild(skillDiv);

        const li = document.createElement("li");
        li.textContent = `${label}: ${describe(score)}`;
        skillFeedbackEl.appendChild(li);
    }

    feedbackOverallEl.textContent = describe(overall);
}

async function init() {
    try {
        const res = await fetch('/api/report');
        if (!res.ok) throw new Error('Failed to fetch report');
        const data = await res.json();
        render(data);
    } catch (err) {
        // Fallback to default data if API not available
        render(defaultReportData);
    }
}

window.addEventListener('DOMContentLoaded', init);