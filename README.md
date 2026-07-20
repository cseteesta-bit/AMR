# BCS 100 Pro

A mobile-first Progressive Web App (PWA) for completing Bangladesh Civil Service preliminary preparation through a structured 100-day plan.

## Live app

`https://cseteesta-bit.github.io/AMR/`

## Google Colab version

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/cseteesta-bit/AMR/blob/main/BCS_100_Pro_Colab.ipynb)

The Colab notebook:

- clones or updates this repository;
- checks the required application files;
- runs `npm test` when Node.js is available;
- starts the app with Python's built-in static web server;
- opens the application through Colab's secure proxy;
- includes cells for refreshing the latest GitHub version and stopping the server.

A Colab runtime is temporary. Keep the notebook running while using the proxied application. GitHub Pages remains the permanent deployment option.

## Current release

- 100-day study plan covering foundation, revision, mock-test and final-review phases
- Official 200-mark, 10-subject structure for the 50th BCS preliminary syllabus
- **210 total MCQs**
- **90 selected, source-tagged past BCS questions spanning 2005–2025**
- Past-question filters by subject, question type and examination
- Timed quizzes with working Next, Previous, Skip and Finish controls
- Automatic movement to the next question after showing the answer explanation
- Answer preservation when moving backward or forward
- Browser-history navigation and an in-app Back button
- Study completion, quiz history, accuracy and weak-subject analytics
- Current-affairs notes with date, source and analysis fields
- Dark/light modes, offline cache and installable PWA support

The past-question collection is a curated educational selection from the 27th, 29th, 35th, 37th, 40th, 44th, 45th, 46th and 47th BCS preliminary examinations. Some wording and explanations have been normalized for mobile practice. It is not represented as a complete official archive. See `PAST_QUESTION_SOURCES.md`.

## One-time GitHub Pages activation

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main**.
4. Select folder **/ (root)**.
5. Click **Save**.

Do not select GitHub Actions as the Pages source. The workflow validates the app; GitHub Pages serves the static files directly from `main`.

## Run and test locally

```bash
npm start
```

Open `http://localhost:4173`.

Run automated data and quiz-state tests:

```bash
npm test
```

The tests verify:

- exactly 210 unique questions;
- exactly 90 past-exam questions;
- nine source-tagged BCS examinations;
- a 200-mark syllabus;
- Next and Previous quiz movement;
- automatic movement from question one to question two after answering;
- preservation of an answer after moving to another question and back;
- question-type and exam filtering.

## Install on a phone

Open the HTTPS Pages URL in Chrome, Edge or Safari and choose **Install app** or **Add to Home Screen**.

## Data and privacy

Study progress, quiz history and personal notes are stored in the browser. Clearing site data or uninstalling the PWA may remove them. This version has no account or cloud sync.

## Content notes

- The syllabus structure follows the official 50th BCS preliminary syllabus published by BPSC on 9 December 2025.
- Past questions are selected from public educational archives and tagged with exam, year and source URL.
- Verify time-sensitive facts and current affairs through official or highly reliable sources.
- This independent project is not affiliated with BPSC.

## License

App source: MIT. Educational content should be reviewed before commercial distribution.
