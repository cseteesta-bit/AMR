'use strict';

const assert = require('node:assert/strict');

global.window = {};
require('../js/data.js');
require('../js/syllabus-update.js');
for (let index = 1; index <= 7; index += 1) require(`../js/questions-extra-${index}.js`);
for (let index = 1; index <= 5; index += 1) require(`../js/past-${index}.js`);
for (let index = 1; index <= 5; index += 1) require(`../js/study-bundle-${index}.js`);
require('../js/study-sources.js');

const quiz = require('../js/quiz-core.js');
const data = window.BCS_DATA;
const study = window.BCS_STUDY;

assert(study && study.subjects, 'study library should be available');
assert.equal(Object.keys(study.subjects).length, 10, 'all ten subjects need study materials');

const modules = Object.entries(study.subjects).flatMap(([subjectId, subject]) =>
  subject.modules.map(module => ({ ...module, subjectId }))
);
assert.equal(modules.length, 40, 'study library should contain forty modules');

for (const module of modules) {
  assert(module.title && module.intro, `${module.id} needs title and introduction`);
  assert(module.points.length >= 5, `${module.id} needs at least five study points`);
  assert(module.focus.length >= 3, `${module.id} needs a practice plan`);
  assert(module.sources.length >= 1, `${module.id} needs a source`);
  assert(module.sources.every(source => /^https:\/\//.test(source.url)), `${module.id} sources must use HTTPS`);
  const questions = data.questions.filter(question => question.study && question.topicId === module.id);
  assert.equal(questions.length, 3, `${module.id} should have exactly three topic-test questions`);
  assert(questions.every(question => question.subject === module.subjectId), `${module.id} question subject mismatch`);
  assert(questions.every(question => /^https:\/\//.test(question.sourceUrl)), `${module.id} questions require HTTPS source attribution`);
}

for (const subjectId of Object.keys(study.subjects)) {
  const questions = quiz.filterQuestions(data.questions, { mode: 'study', subject: subjectId });
  assert.equal(questions.length, 12, `${subjectId} should have twelve subject-wise study questions`);
}

const topicQuestions = quiz.filterQuestions(data.questions, {
  mode: 'study',
  subject: 'bd',
  topic: 'bd-constitution'
});
assert.equal(topicQuestions.length, 3, 'topic filter should return only the requested module');
assert(topicQuestions.every(question => question.topicId === 'bd-constitution'));

const internationalOrganisations = study.subjects.international.modules.find(module => module.id === 'int-orgs');
assert(internationalOrganisations.sources.some(source => source.url.includes('wto.org')), 'international organisations should cite WTO');
assert(internationalOrganisations.sources.some(source => source.url.includes('imf.org')), 'international organisations should cite IMF');

const spaceScience = study.subjects.science.modules.find(module => module.id === 'science-space');
assert(spaceScience.sources.some(source => source.url.includes('nasa.gov')), 'space science should cite NASA');

const practiceOnly = quiz.filterQuestions(data.questions, { mode: 'practice' });
assert(practiceOnly.every(question => !question.past && !question.study), 'practice mode must exclude past and study questions');

console.log('Subject-wise study library tests passed:', {
  subjects: Object.keys(study.subjects).length,
  modules: modules.length,
  studyQuestions: data.questions.filter(question => question.study).length
});
