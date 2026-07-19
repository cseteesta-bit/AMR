(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.BCS_QUIZ = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  function shuffle(items, random = Math.random) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function filterQuestions(questions, filters = {}) {
    const subject = filters.subject || 'all';
    const mode = filters.mode || 'all';
    const exam = filters.exam || 'all';

    return questions.filter(question => {
      if (subject !== 'all' && question.subject !== subject) return false;
      if (mode === 'past' && !question.past) return false;
      if (mode === 'practice' && question.past) return false;
      if (exam !== 'all' && question.exam !== exam) return false;
      return true;
    });
  }

  function prepareQuestion(question, random = Math.random) {
    const options = shuffle(
      question.options.map((text, originalIndex) => ({
        text,
        correct: originalIndex === question.answer
      })),
      random
    );

    return {
      ...question,
      options: options.map(option => option.text),
      answer: options.findIndex(option => option.correct)
    };
  }

  function createSession(pool, count, random = Math.random, filters = {}) {
    const requested = Math.max(1, Number(count) || 10);
    const questions = shuffle(pool, random)
      .slice(0, Math.min(requested, pool.length))
      .map(question => prepareQuestion(question, random));

    return {
      questions,
      index: 0,
      selections: Array(questions.length).fill(null),
      secondsRemaining: questions.length * 36,
      filters: {
        subject: filters.subject || 'all',
        mode: filters.mode || 'all',
        exam: filters.exam || 'all'
      },
      finished: false,
      recorded: false
    };
  }

  function current(session) {
    return session?.questions?.[session.index] || null;
  }

  function selectAnswer(session, optionIndex) {
    if (!session || session.finished) return false;
    if (!Number.isInteger(optionIndex)) return false;
    const question = current(session);
    if (!question || optionIndex < 0 || optionIndex >= question.options.length) return false;
    if (session.selections[session.index] !== null) return false;
    session.selections[session.index] = optionIndex;
    return true;
  }

  function move(session, delta) {
    if (!session || session.finished) return false;
    const nextIndex = session.index + Number(delta || 0);
    if (nextIndex < 0 || nextIndex >= session.questions.length) return false;
    session.index = nextIndex;
    return true;
  }

  function score(session) {
    if (!session) return { correct: 0, total: 0, unanswered: 0, percent: 0 };
    const total = session.questions.length;
    let correct = 0;
    let unanswered = 0;

    session.questions.forEach((question, index) => {
      const selected = session.selections[index];
      if (selected === null) unanswered += 1;
      else if (selected === question.answer) correct += 1;
    });

    return {
      correct,
      total,
      unanswered,
      percent: total ? Math.round((correct / total) * 100) : 0
    };
  }

  function subjectBreakdown(session) {
    const result = {};
    if (!session) return result;

    session.questions.forEach((question, index) => {
      const key = question.subject || 'unknown';
      if (!result[key]) result[key] = { correct: 0, total: 0 };
      result[key].total += 1;
      if (session.selections[index] === question.answer) result[key].correct += 1;
    });

    return result;
  }

  return {
    shuffle,
    filterQuestions,
    prepareQuestion,
    createSession,
    current,
    selectAnswer,
    move,
    score,
    subjectBreakdown
  };
});
