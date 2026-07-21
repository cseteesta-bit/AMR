(() => {
  'use strict';
  const A = window.BCS_APP;
  const STUDY = window.BCS_STUDY;

  if (!A || !STUDY) return;

  A.state.studyDone = Array.isArray(A.state.studyDone) ? A.state.studyDone : [];

  const topicTitle = topicId => {
    for (const subject of Object.values(STUDY.subjects)) {
      const module = subject.modules.find(item => item.id === topicId);
      if (module) return module.title;
    }
    return '';
  };
  A.studyTopicTitle = topicTitle;

  function sourceLinks(module) {
    return module.sources.map(source =>
      `<a class="study-source" href="${A.esc(source.url)}" target="_blank" rel="noopener noreferrer">${A.esc(source.title)} ↗</a>`
    ).join('');
  }

  function moduleMarkup(subjectId, module, index) {
    const done = A.state.studyDone.includes(module.id);
    const questionCount = A.data.questions.filter(question => question.study && question.topicId === module.id).length;
    return `<details class="study-module" ${index === 0 ? 'open' : ''}>
      <summary>
        <span><b>${A.bn(index + 1)}. ${A.esc(module.title)}</b><small>${A.bn(questionCount)}টি অধ্যায়ভিত্তিক প্রশ্ন</small></span>
        <span class="study-status ${done ? 'done' : ''}">${done ? '✓ সম্পন্ন' : 'পড়ুন'}</span>
      </summary>
      <div class="study-module-body">
        <p class="study-intro">${A.esc(module.intro)}</p>
        <h4>যা অবশ্যই শিখবেন</h4>
        <ul class="study-points">${module.points.map(point => `<li>${A.esc(point)}</li>`).join('')}</ul>
        <h4>অনুশীলন পরিকল্পনা</h4>
        <div class="study-focus">${module.focus.map(item => `<span>${A.esc(item)}</span>`).join('')}</div>
        <div class="study-sources"><b>ভিত্তি উৎস</b>${sourceLinks(module)}</div>
        <div class="study-actions">
          <button class="btn small" data-action="topicQuiz" data-subject="${subjectId}" data-topic="${module.id}">এই অধ্যায়ের টেস্ট</button>
          <button class="btn ghost small" data-action="toggleStudyTopic" data-subject="${subjectId}" data-topic="${module.id}">${done ? 'অসম্পন্ন করুন' : 'পড়া সম্পন্ন'}</button>
        </div>
      </div>
    </details>`;
  }

  function openSubjectStudy(subjectId) {
    const subject = A.subjects[subjectId];
    const study = STUDY.subjects[subjectId];
    if (!subject || !study) return;

    const modules = study.modules;
    const questionCount = A.data.questions.filter(question => question.study && question.subject === subjectId).length;
    const doneCount = modules.filter(module => A.state.studyDone.includes(module.id)).length;

    A.openModal(`<div class="modal-head study-head">
      <div>${A.pill(subjectId)}<h3>${A.esc(study.title)}</h3><p>${subject.marks} marks • ${A.bn(modules.length)} অধ্যায় • ${A.bn(questionCount)} নতুন টেস্ট প্রশ্ন</p></div>
      <button class="close-btn" data-action="closeModal" aria-label="Close">×</button>
    </div>
    <div class="study-progress-row">
      <div><strong>${A.bn(doneCount)}/${A.bn(modules.length)}</strong><span>অধ্যায় সম্পন্ন</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${modules.length ? Math.round(doneCount / modules.length * 100) : 0}%"></div></div>
      <button class="btn small" data-action="subjectStudyQuiz" data-subject="${subjectId}">পূর্ণ বিষয় টেস্ট</button>
    </div>
    <div class="study-module-list">${modules.map((module,index) => moduleMarkup(subjectId,module,index)).join('')}</div>
    <div class="alert study-note"><b>ব্যবহার পদ্ধতি:</b> প্রথমে নোট পড়ুন, তারপর অধ্যায়ের টেস্ট দিন। উৎস লিংক যাচাই ও গভীর পড়ার জন্য; মূল প্রস্তুতি উপাদান এই অ্যাপের ভেতরেই দেওয়া হয়েছে।</div>`);
  }

  A.registerAction('openSubject', button => openSubjectStudy(button.dataset.subject));

  A.registerAction('toggleStudyTopic', button => {
    const topic = button.dataset.topic;
    A.state.studyDone = A.state.studyDone.includes(topic)
      ? A.state.studyDone.filter(item => item !== topic)
      : [...A.state.studyDone, topic];
    A.save();
    openSubjectStudy(button.dataset.subject);
    A.toast(A.state.studyDone.includes(topic) ? 'অধ্যায় সম্পন্ন হয়েছে' : 'অধ্যায় অসম্পন্ন করা হয়েছে');
  });

  function startStudyQuiz(subject, topic = 'all', count = 20) {
    const pool = A.data.questions.filter(question =>
      question.study &&
      question.subject === subject &&
      (topic === 'all' || question.topicId === topic)
    );
    if (!pool.length) return A.toast('এই অধ্যায়ে টেস্ট প্রশ্ন পাওয়া যায়নি');

    A.clearQuizAutoAdvance?.();
    A.preferences = { subject, mode: 'study', exam: 'all', topic, count: Math.min(count, pool.length) };
    A.quizSession = A.quizCore.createSession(pool, A.preferences.count, Math.random, A.preferences);
    A.startTimer?.();
    A.closeModal();
    A.navigate('quiz/play');
  }

  A.registerAction('topicQuiz', button => startStudyQuiz(button.dataset.subject, button.dataset.topic, 10));
  A.registerAction('subjectStudyQuiz', button => startStudyQuiz(button.dataset.subject, 'all', 20));
})();