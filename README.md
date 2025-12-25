# Student Speaking Assessment Report (Simple)

A minimal, static report page that shows:
- Overall score out of 9
- Skill-wise scores (Pronunciation, Fluency, Vocabulary, Grammar)
- Progress bars for each
- Auto-updating descriptive feedback based on score ranges

## How to Run (Windows)

### Option A: Open static file directly
Double-click `index.html` or run:

```bash
start index.html
```

### Option B: Run with Node/Express (recommended)
```bash
npm install
npm start
```
This starts the Express server at `http://localhost:3000/` serving the page and an API at `/api/report`.

## Where the Scores Are Stored
Scores are defined in `script.js` inside the `reportData` object:
- `studentName`: name shown in the header
- `skills`: numeric scores in the range `0–9` for each skill

Edit these values to update the page:
```js
const reportData = {
  studentName: "Ananya Sharma",
  skills: {
    pronunciation: 7.5,
    fluency: 6.5,
    vocabulary: 6.0,
    grammar: 7.0
  }
};
```

## Feedback Logic
Feedback updates automatically whenever scores change. Rules:
- Score `≥ 8`: "Excellent performance with strong control."
- Score `≥ 6` and `< 8`: "Good performance with minor inaccuracies."
- Score `< 6`: "Needs improvement."

The overall score is calculated as the average of the four skills (rounded to 1 decimal). Progress bar widths are `score / 9` converted to percent.

## Notes
- Pure HTML/CSS/JS; no frameworks.
- Uses simple CSS progress bars (no chart library).
- You can add charts (e.g., Chart.js via CDN) later if desired.