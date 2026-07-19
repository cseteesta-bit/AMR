'use strict';

const assert = require('node:assert/strict');

global.window = {};
require('../js/data.js');
require('../js/syllabus-update.js');
for (let index = 1; index <= 7; index += 1) {
  require(`../js/questions-extra-${index}.js`);
}
for (let index = 1; index <= 5; index += 1) {
  require(`../js/past-${index}.js`);
}

const quiz = require('../js/quiz-core.js');
const data = window.BCS_DATA;

assert.equal(data.questions.length, 210, 'question bank should contain 210 questions');
assert.equal(data.questions.filter(question => question.past).length, 90, 'past question bank should contain 90 questions');
assert.equal(new Set(data.questions.map(question => question.id)).size, 210, 'question IDs should be unique');
assert.equal(data.subjects.reduce((sum, subject) => sum + subject.marks, 0), 200, 'syllabus marks should total 200');

const examNames = new Set(data.questions.filter(question => question.past).map(question => question.exam));
assert.equal(examNames.size, 9, 'past questions should cover nine BCS examinations');

const pastQuestions = quiz.filterQuestions(data.questions, { mode: 'past' });
assert.equal(pastQuestions.length, 90);
assert(pastQuestions.every(question => question.past));

const examQuestions = quiz.filterQuestions(data.questions, { mode: 'past', exam: '47th BCS' });
assert.equal(examQuestions.length, 10);
assert(examQuestions.every(question => question.exam === '47th BCS'));

const deterministicRandom = () => 0.25;
const session = quiz.createSession(examQuestions, 5, deterministicRandom, {
  subject: 'all',
  mode: 'past',
  exam: '47th BCS'
});

assert.equal(session.questions.length, 5);
assert.equal(session.index, 0);
assert.equal(session.selections.length, 5);

const firstAnswer = session.questions[0].answer;
assert.equal(quiz.selectAnswer(session, firstAnswer), true);
assert.equal(session.selections[0], firstAnswer);

assert.equal(quiz.move(session, 1), true, 'next question should work');
assert.equal(session.index, 1);
assert.equal(quiz.move(session, -1), true, 'previous question should work');
assert.equal(session.index, 0);
assert.equal(session.selections[0], firstAnswer, 'answer must remain when moving backward');

const result = quiz.score(session);
assert.equal(result.correct, 1);
assert.equal(result.total, 5);
assert.equal(result.unanswered, 4);

assert.equal(quiz.move(session, -1), false, 'cannot move before first question');
session.index = session.questions.length - 1;
assert.equal(quiz.move(session, 1), false, 'cannot move after final question');

console.log('BCS 100 Pro smoke tests passed:', {
  questions: data.questions.length,
  pastQuestions: pastQuestions.length,
  exams: examNames.size,
  syllabusMarks: 200
});
