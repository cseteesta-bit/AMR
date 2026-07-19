(() => {
  'use strict';
  const A=window.BCS_APP,D=A.data,Q=A.quizCore;

  function exams(){
    return [...new Map(D.questions.filter(q=>q.past&&q.exam).map(q=>[q.exam,{exam:q.exam,year:q.year||0}])).values()].sort((a,b)=>b.year-a.year);
  }
  function available(){return Q.filterQuestions(D.questions,A.preferences).length;}

  A.registerView('quiz',()=>{
    const count=available();
    A.view.innerHTML=`<article class="card quiz-setup"><h2>Smart Practice Quiz</h2><p>বিষয়, প্রশ্নের ধরন ও নির্দিষ্ট BCS পরীক্ষা নির্বাচন করুন। উত্তর দেওয়ার পর ব্যাখ্যা দেখুন এবং সামনে–পেছনে চলুন।</p><div class="quiz-bank-summary"><div><strong>${A.bn(D.questions.length)}</strong><span>মোট প্রশ্ন</span></div><div><strong>${A.bn(D.questions.filter(q=>q.past).length)}</strong><span>বিগত BCS</span></div><div><strong>${A.bn(count)}</strong><span>এই ফিল্টারে</span></div></div><div class="form-grid"><label>প্রশ্নের ধরন<select id="quizMode" class="select"><option value="all">সব প্রশ্ন</option><option value="past">বিগত BCS প্রশ্ন</option><option value="practice">প্র্যাকটিস প্রশ্ন</option></select></label><label>বিষয়<select id="quizSubject" class="select"><option value="all">সব বিষয়</option>${D.subjects.map(s=>`<option value="${s.id}">${A.esc(s.bn)}</option>`).join('')}</select></label><label>নির্দিষ্ট পরীক্ষা<select id="quizExam" class="select"><option value="all">সব পরীক্ষা</option>${exams().map(x=>`<option value="${A.esc(x.exam)}">${A.esc(x.exam)} (${A.bn(x.year)})</option>`).join('')}</select></label><label>প্রশ্ন সংখ্যা<select id="quizCount" class="select"><option>5</option><option>10</option><option>20</option><option>50</option><option>100</option></select></label><button class="btn" data-action="startQuiz" ${count?'':'disabled'}>কুইজ শুরু করুন</button></div></article><div class="section-head"><div><h3>বিগত প্রশ্নের উৎস</h3><p>২০০৫–২০২৫</p></div></div><div class="resource-list">${(D.pastQuestionSources||[]).sort((a,b)=>b.year-a.year).map(x=>`<a class="card resource" target="_blank" rel="noopener noreferrer" href="${A.esc(x.url)}"><div><b>${A.esc(x.exam)}</b><small>${A.bn(x.year)} • Source archive</small></div><span>↗</span></a>`).join('')}</div>`;
    document.querySelector('#quizMode').value=A.preferences.mode;
    document.querySelector('#quizSubject').value=A.preferences.subject;
    document.querySelector('#quizExam').value=A.preferences.exam;
    document.querySelector('#quizCount').value=String(A.preferences.count);
  });

  A.syncPreferences=()=>{
    A.preferences={
      mode:document.querySelector('#quizMode')?.value||'all',
      subject:document.querySelector('#quizSubject')?.value||'all',
      exam:document.querySelector('#quizExam')?.value||'all',
      count:Number(document.querySelector('#quizCount')?.value||10)
    };
    if(A.preferences.exam!=='all')A.preferences.mode='past';
  };
  A.stopTimer=()=>{if(A.timerId)clearInterval(A.timerId);A.timerId=null;};
  A.startTimer=()=>{
    A.stopTimer();
    A.timerId=setInterval(()=>{
      if(!A.quizSession||A.quizSession.finished)return A.stopTimer();
      A.quizSession.secondsRemaining=Math.max(0,A.quizSession.secondsRemaining-1);
      const el=document.querySelector('#quizTimer');if(el)el.textContent=`${A.bn(A.quizSession.secondsRemaining)}s`;
      if(A.quizSession.secondsRemaining<=0)finish();
    },1000);
  };

  function start(){
    A.syncPreferences();
    const pool=Q.filterQuestions(D.questions,A.preferences);
    if(!pool.length){A.toast('এই ফিল্টারে কোনো প্রশ্ন পাওয়া যায়নি');A.views.quiz();return;}
    A.quizSession=Q.createSession(pool,A.preferences.count,Math.random,A.preferences);
    A.startTimer();A.navigate('quiz/play');
  }
  function source(question,answered){
    if(!question.past)return '<span class="meta-chip">Practice question</span>';
    return `<span class="meta-chip past-badge">${A.esc(question.exam||'Past BCS')}</span>${question.year?`<span class="meta-chip">${A.bn(question.year)}</span>`:''}${answered&&question.sourceUrl?`<a class="meta-chip source-link" href="${A.esc(question.sourceUrl)}" target="_blank" rel="noopener noreferrer">Source ↗</a>`:''}`;
  }
  A.registerView('quiz/play',()=>{
    const s=A.quizSession;
    if(!s||!s.questions.length)return A.navigate('quiz',{replace:true});
    if(s.finished)return A.navigate('quiz/result',{replace:true});
    const q=Q.current(s),selected=s.selections[s.index],answered=selected!==null,last=s.index===s.questions.length-1;
    A.view.innerHTML=`<div class="quiz-top"><span class="quiz-count">প্রশ্ন ${A.bn(s.index+1)}/${A.bn(s.questions.length)}</span><span class="timer" id="quizTimer">${A.bn(s.secondsRemaining)}s</span></div><article class="card question-card"><div class="question-meta">${A.pill(q.subject)}${source(q,answered)}</div><h3>${A.esc(q.question)}</h3><div class="option-list">${q.options.map((option,index)=>{const cls=['option-btn'];if(answered&&index===q.answer)cls.push('correct');if(answered&&index===selected&&index!==q.answer)cls.push('wrong');if(index===selected)cls.push('selected');return `<button class="${cls.join(' ')}" data-action="answerQuiz" data-option="${index}" ${answered?'disabled':''}><span class="option-letter">${String.fromCharCode(65+index)}</span><span>${A.esc(option)}</span></button>`;}).join('')}</div>${answered?`<div class="explanation"><b>${selected===q.answer?'সঠিক উত্তর।':'সঠিক উত্তর:'}</b> ${A.esc(q.options[q.answer])}<br>${A.esc(q.explanation)}</div>`:'<div class="quiz-hint">একটি উত্তর নির্বাচন করুন, অথবা প্রশ্নটি পরে করার জন্য সামনে যান।</div>'}<div class="quiz-nav"><button class="btn ghost" data-action="quizPrevious" ${s.index===0?'disabled':''}>← আগের প্রশ্ন</button>${last?'<button class="btn" data-action="finishQuiz">ফলাফল দেখুন</button>':`<button class="btn" data-action="quizNext">${answered?'পরের প্রশ্ন':'এড়িয়ে যান'} →</button>`}</div></article>`;
    if(!A.timerId)A.startTimer();
  });
  function finish(){
    const s=A.quizSession;if(!s||s.finished)return;
    s.finished=true;A.stopTimer();
    if(!s.recorded){
      const result=Q.score(s);
      A.state.history.unshift({score:result.correct,total:result.total,unanswered:result.unanswered,date:new Date().toISOString(),subject:s.filters.subject,mode:s.filters.mode,exam:s.filters.exam,bySubject:Q.subjectBreakdown(s)});
      A.state.history=A.state.history.slice(0,300);s.recorded=true;A.save();
    }
    A.navigate('quiz/result',{replace:true});
  }
  A.registerView('quiz/result',()=>{
    if(!A.quizSession)return A.navigate('quiz',{replace:true});
    const r=Q.score(A.quizSession);
    A.view.innerHTML=`<article class="card result-card"><div class="score-ring" style="--score:${r.percent}%"><div><strong>${A.bn(r.percent)}%</strong><small>${A.bn(r.correct)}/${A.bn(r.total)}</small></div></div><h2>${r.percent>=70?'দারুণ প্রস্তুতি!':'আরও অনুশীলন করুন'}</h2><p>${A.bn(r.unanswered)}টি প্রশ্ন অনুত্তরিত ছিল। ভুল ও অনুত্তরিত প্রশ্নগুলো পুনরায় পড়ুন।</p><div class="result-actions"><button class="btn" data-action="restartQuiz">একই ফিল্টারে আবার</button><button class="btn ghost" data-route="quiz">কুইজ সেটআপ</button><button class="btn ghost" data-route="analytics">অগ্রগতি দেখুন</button></div></article>`;
  });

  A.registerAction('startQuiz',start);
  A.registerAction('answerQuiz',button=>{if(Q.selectAnswer(A.quizSession,Number(button.dataset.option)))A.views['quiz/play']();});
  A.registerAction('quizPrevious',()=>{if(Q.move(A.quizSession,-1)){A.views['quiz/play']();scrollTo({top:0,behavior:'smooth'});}});
  A.registerAction('quizNext',()=>{if(Q.move(A.quizSession,1)){A.views['quiz/play']();scrollTo({top:0,behavior:'smooth'});}});
  A.registerAction('finishQuiz',finish);
  A.registerAction('restartQuiz',()=>{A.navigate('quiz',{replace:true});setTimeout(start,0);});
  A.registerAction('subjectQuiz',button=>{A.preferences={...A.preferences,subject:button.dataset.subject,exam:'all'};A.closeModal();A.navigate('quiz');});
  A.registerAction('pastQuiz',()=>{A.preferences={...A.preferences,mode:'past',exam:'all'};A.navigate('quiz');});
})();
