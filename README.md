# BCS 100 Pro

A mobile-first Progressive Web App (PWA) for Bangladesh Civil Service preliminary preparation, combining a structured 100-day plan, a subject-wise study library, past-question practice and tested quizzes.

## Live app

`https://cseteesta-bit.github.io/AMR/`

## Google Colab version

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/cseteesta-bit/AMR/blob/main/BCS_100_Pro_Colab.ipynb)

The Colab notebook clones or updates the repository, validates the application when Node.js is available, launches a Python static server and opens the app through Colab's proxy.

## Current release — Subject-wise Study Library

- **10 BCS preliminary subjects**
- **40 structured study chapters** — four chapters per subject
- **120 new chapter-linked study-test questions** — three questions for every chapter
- **330 total MCQs**
- **90 selected, source-tagged past BCS questions spanning 2005–2025**
- Official 200-mark, 10-subject structure for the 50th BCS preliminary syllabus
- Full notes inside each subject card; source links are supplementary verification and deeper-reading references
- Key facts, conceptual explanations and an explicit practice plan in every chapter
- One-click chapter tests and full-subject study tests
- Study-chapter completion tracking and progress bar
- Quiz filters for past questions, study-material tests, normal practice, subject, chapter and examination
- Timed quizzes with Next, Previous, Skip, Finish and automatic answer-to-next-question movement
- Answer preservation, quiz history, subject accuracy and weak-subject analytics
- Dark/light modes, offline cache and installable PWA support

### Subjects and study areas

1. বাংলা ভাষা ও সাহিত্য — ব্যাকরণ, শব্দগঠন, প্রাচীন-মধ্যযুগ, আধুনিক সাহিত্য
2. English Language and Literature — grammar, tense/voice/narration, vocabulary, literary periods
3. বাংলাদেশ বিষয়াবলি — Constitution, history, geography/economy, culture
4. আন্তর্জাতিক বিষয়াবলি — United Nations, international organisations, law/rights, international relations
5. ভূগোল, পরিবেশ ও দুর্যোগ — Earth processes, climate, Bangladesh geography, disaster-risk reduction
6. সাধারণ বিজ্ঞান — physics, chemistry, biology, Earth and space science
7. কম্পিউটার ও তথ্যপ্রযুক্তি — fundamentals, networks/web, databases/programming, cybersecurity
8. গাণিতিক যুক্তি — arithmetic, algebra, geometry, sequence/probability
9. মানসিক দক্ষতা — series, analogy/classification, direction/ranking, logic
10. নৈতিকতা, মূল্যবোধ ও সুশাসন — ethical foundations, governance, public-service integrity, rights

The study notes and new tests are original educational summaries and questions created from authoritative or open educational references. The project does not bulk-copy complete copyrighted guidebooks or commercial question banks.

## How to study inside the app

1. Open **সিলেবাস**.
2. Select a subject card.
3. Read the four expandable chapters.
4. Review **যা অবশ্যই শিখবেন** and **অনুশীলন পরিকল্পনা**.
5. Run **এই অধ্যায়ের টেস্ট** after each chapter.
6. Mark the chapter complete.
7. Run **পূর্ণ বিষয় টেস্ট** after completing all four chapters.

## One-time GitHub Pages activation

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** and folder **/ (root)**.
4. Click **Save**.

GitHub Actions validates the app; GitHub Pages serves the static files directly from `main`.

## Automated tests

```bash
npm test
```

The suite verifies:

- exactly 330 unique questions;
- exactly 90 past-exam questions and 120 study questions;
- all 10 subjects and all 40 chapters;
- at least five study points and a practice plan for every chapter;
- exactly three source-attributed tests for every chapter;
- 12 study questions for every subject;
- chapter, subject, study, practice, past-exam and examination filters;
- 200 total syllabus marks;
- Next/Previous movement, answer preservation and automatic question advancement.

## Data and privacy

Study-plan progress, completed chapters, quiz history and personal notes are stored in the browser. Clearing site data or uninstalling the PWA may remove them. This release does not provide an account or cloud synchronisation.

## Content notes

- The syllabus structure follows the official 50th BCS preliminary syllabus published by BPSC on 9 December 2025.
- Past questions are selected from public educational archives and tagged with exam, year and source URL.
- Study materials use authoritative government, international-organisation and open educational references.
- Current affairs and changing statistical values must still be checked against their latest official releases.
- This independent project is not affiliated with BPSC.

## License

App source: MIT. Educational content should be reviewed before commercial distribution.
