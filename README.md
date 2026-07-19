# BCS 100 Pro

A mobile-first Progressive Web App (PWA) for completing Bangladesh Civil Service preliminary preparation through a structured 100-day plan.

## Live app

GitHub Pages URL:

`https://cseteesta-bit.github.io/AMR/`

The repository automatically validates the static files and mirrors every `main` branch update to the `gh-pages` branch.

## What is included

- 100-day study plan covering foundation, revision, mock-test and final-review phases
- 50th BCS preliminary subject structure and mark distribution
- 10-subject syllabus tracker with topic-level guidance
- Original starter MCQ bank with answers and explanations
- Timed subject-wise and mixed quizzes
- Study completion, quiz history, accuracy and weak-subject analytics
- Current-affairs notes with date, source and analysis fields
- Official and primary learning-resource links
- Dark/light modes, local offline storage and PWA support
- Responsive mobile interface with no external runtime dependency

## Deploy with GitHub Pages

The deployment branch is `gh-pages`.

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **gh-pages** and folder **/ (root)**.
4. Click **Save**.

After that one-time repository setting, every push to `main` automatically updates `gh-pages` through `.github/workflows/pages.yml`.

## Run locally

1. Install Node.js.
2. Open the project folder in a terminal.
3. Run `npm start`.
4. Open `http://localhost:4173`.

A static web server may also be used. Service workers do not run through the `file://` protocol.

## Install on a phone

Open the HTTPS GitHub Pages URL in Chrome, Edge, or Safari and choose **Install app** or **Add to Home Screen**.

## Data and privacy

Study progress, quiz history and personal notes are stored only in the browser through local storage. Clearing browser site data or uninstalling the PWA may remove that information. The current release does not provide account login or cloud synchronization.

## Content notes

- The syllabus structure is based on the official 50th BCS preliminary syllabus published by the Bangladesh Public Service Commission on 9 December 2025.
- Included MCQs are original starter questions created for practice; they are not presented as official past questions.
- Current affairs change continuously. Verify dates, figures and policy changes through official or highly reliable sources before memorising them.
- This independent project is not affiliated with BPSC.

## License

App source: MIT. Educational content should be reviewed before public commercial distribution.
