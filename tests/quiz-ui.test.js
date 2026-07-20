'use strict';

const assert = require('node:assert/strict');
const quizCore = require('../js/quiz-core.js');

const views = {};
const actions = {};
const data = {
  subjects: [{ id: 'test', bn: 'টেস্ট', en: 'Test', marks: 10, color: '#000', topics: [] }],
  questions: [
    { id: 1, subject: 'test', question: 'First?', options: ['A', 'B'], answer: 0, explanation: 'First explanation.' },
    { id: 2, subject: 'test', question: 'Second?', options: ['C', 'D'], answer: 1, explanation: 'Second explanation.' }
  ],
  pastQuestionSources: []
};

const app = {
  data,
  quizCore,
  preferences: { subject: 'all', mode: 'all', exam: 'all', count: 2 },
  subjects: { test: data.subjects[0] },
  view: { innerHTML: '' },
  state: { history: [] },
  currentRoute: 'quiz/play',
  timerId: 1,
  registerView(name, fn) { views[name] = fn; },
  registerAction(name, fn) { actions[name] = fn; },
  bn(value) { return String(value); },
  esc(value) { return String(value ?? ''); },
  pill() { return ''; },
  save() {},
  toast() {},
  closeModal() {},
  navigate(route) {
    this.currentRoute = route;
    if (views[route]) views[route]();
  }
};

app.quizSession = quizCore.createSession(data.questions, 2, () => 0.99, app.preferences);

global.window = { BCS_APP: app };
global.document = {
  querySelector() { return null; }
};
global.scrollTo = () => {};

require('../js/app-quiz.js');

(async () => {
  views['quiz/play']();
  assert.match(app.view.innerHTML, /First\?/i, 'first question should be rendered');

  const correctOption = app.quizSession.questions[0].answer;
  actions.answerQuiz({ dataset: { option: String(correctOption) } });

  assert.equal(app.quizSession.index, 0, 'explanation should be visible briefly before advancing');
  assert.notEqual(app.quizSession.selections[0], null, 'first answer should be stored');

  await new Promise(resolve => setTimeout(resolve, 1350));

  assert.equal(app.quizSession.index, 1, 'answering the first question should auto-advance to question two');
  assert.match(app.view.innerHTML, /Second\?/i, 'second question should be rendered after auto-advance');
  assert.notEqual(app.quizSession.selections[0], null, 'first answer should remain stored after advancing');

  console.log('Quiz UI auto-advance test passed.');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
