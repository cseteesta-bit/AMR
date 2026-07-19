# BCS 100 Pro

A mobile-first Progressive Web App (PWA) for completing Bangladesh Civil Service preliminary preparation through a structured 100-day plan.

## Live app

GitHub Pages URL:

`https://cseteesta-bit.github.io/AMR/`

The repository validates every release and mirrors each `main` branch update to the `gh-pages` branch.

## What is included

- 100-day study plan covering foundation, revision, mock-test and final-review phases
- Official 200-mark, 10-subject structure for the 50th BCS preliminary syllabus
- 120 original starter MCQs with answers and explanations
- Timed subject-wise and mixed quizzes
- Study completion, quiz history, accuracy and weak-subject analytics
- Current-affairs notes with date, source and analysis fields
- Official and primary learning-resource links
- Dark/light modes, local offline storage and installable PWA support
- Responsive mobile interface with no external runtime dependency

## One-time GitHub Pages activation

The deployment branch is `gh-pages`, and it is already maintained automatically.

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select branch **gh-pages**.
4. Select folder **/ (root)**.
5. Click **Save**.

Do not select **GitHub Actions** as the Pages source for this repository. The workflow already publishes the validated static app to `gh-pages`; GitHub Pages only needs to serve that branch.

After the one-time activation, every push to `main` runs `.github/workflows/pages.yml`, validates all JavaScript, confirms exactly 120 unique questions and 200 total syllabus marks, and refreshes `gh-pages`.

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
- Included MCQs are original practice questions; they are not presented as official past questions.
- Current affairs change continuously. Verify dates, figures and policy changes through official or highly reliable sources before memorising them.
- This independent project is not affiliated with BPSC.

## License

App source: MIT. Educational content should be reviewed before public commercial distribution.
