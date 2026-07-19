(() => {
  'use strict';
  const A=window.BCS_APP,D=A.data;

  A.registerView('home',()=>{
    const mission=A.plan[A.studyDay()-1],note=A.state.notes[0];
    const avg=A.state.history.length?Math.round(A.state.history.reduce((sum,h)=>sum+(Number(h.score)||0)/Math.max(1,Number(h.total)||1)*100,0)/A.state.history.length):0;
    A.view.innerHTML=`
      <section class="hero"><div class="hero-top"><div class="day-badge"><div><b>${A.bn(mission.day)}</b><span>আজকের দিন</span></div></div><div><p class="eyebrow">100-day focused mission</p><h2>পরিকল্পিত প্রস্তুতি। <em>মাপযোগ্য অগ্রগতি।</em></h2><p>দৈনিক পরিকল্পনা, বিগত প্রশ্ন, কুইজ ও অগ্রগতি এক জায়গায়।</p></div></div><div class="hero-actions"><button class="btn" data-action="openDay" data-day="${mission.day}">আজকের পরিকল্পনা</button><button class="btn secondary" data-route="quiz">দ্রুত কুইজ</button></div></section>
      <div class="grid-3" style="margin-top:12px"><article class="card stat-card"><span class="label">সম্পন্ন দিন</span><strong>${A.bn(A.state.done.length)}/১০০</strong></article><article class="card stat-card"><span class="label">কুইজ</span><strong>${A.bn(A.state.history.length)}</strong></article><article class="card stat-card"><span class="label">গড় স্কোর</span><strong>${A.bn(avg)}%</strong></article></div>
      <div class="section-head"><div><h3>আজকের মিশন</h3><p>${mission.phase}</p></div></div>
      <article class="card today-card">${A.pill(mission.subject)}<h4>${A.esc(mission.title)}</h4><div class="task-list">${mission.tasks.map((task,i)=>`<div class="task"><i>${A.bn(i+1)}</i>${A.esc(task)}</div>`).join('')}</div><div class="inline-meta"><span class="meta-chip">${A.bn(mission.minutes)} মিনিট</span><span class="meta-chip">${A.bn(mission.mcq)} প্রশ্ন</span></div><button class="btn small" style="margin-top:14px" data-action="toggleDay" data-day="${mission.day}">${A.state.done.includes(mission.day)?'সম্পন্ন হয়েছে':'দিনটি সম্পন্ন করুন'}</button></article>
      <div class="section-head"><div><h3>বিগত BCS প্রশ্ন</h3><p>২০০৫–২০২৫ থেকে নির্বাচিত</p></div><button class="text-btn" data-action="pastQuiz">শুরু করুন</button></div>
      <article class="card today-card"><h4>${A.bn(D.questions.filter(q=>q.past).length)}টি উৎস-ট্যাগযুক্ত প্রশ্ন</h4><p>পরীক্ষা, সাল ও বিষয় অনুযায়ী ফিল্টার করুন। প্রশ্নগুলো শিক্ষামূলক ব্যবহারের জন্য যাচাই ও প্রয়োজনে সংক্ষিপ্তভাবে অভিযোজিত।</p><button class="btn small" style="margin-top:14px" data-action="pastQuiz">বিগত প্রশ্ন কুইজ</button></article>
      ${note?`<div class="section-head"><div><h3>সর্বশেষ কারেন্ট অ্যাফেয়ার্স নোট</h3><p>${A.esc(note.date)}</p></div><button class="text-btn" data-route="learn">সব নোট</button></div><article class="card today-card"><h4>${A.esc(note.title)}</h4><p>${A.esc(note.body)}</p></article>`:''}
      <div class="section-head"><div><h3>বিষয়সমূহ</h3><p>প্রিলিমিনারি সিলেবাস</p></div><button class="text-btn" data-route="learn">সব দেখুন</button></div>
      <div class="subject-grid">${D.subjects.slice(0,6).map(s=>`<button class="card subject-card subject-button" style="--subject-color:${s.color}" data-action="openSubject" data-subject="${s.id}"><span class="mark">${s.marks}</span><span class="subject-icon">${A.esc(s.en[0])}</span><span class="subject-title">${A.esc(s.bn)}</span><span class="subject-description">${A.bn(s.topics.length)}টি প্রধান টপিক</span></button>`).join('')}</div>`;
  });

  A.registerView('plan',()=>{
    A.view.innerHTML=`<div class="section-head"><div><h3>১০০ দিনের মাস্টার প্ল্যান</h3><p>${A.bn(A.state.done.length)}% সম্পন্ন</p></div></div><div class="progress-track"><div class="progress-fill" style="width:${A.state.done.length}%"></div></div><div class="day-list" style="margin-top:15px">${A.plan.map(item=>`<article class="card day-card ${A.state.done.includes(item.day)?'completed':''}"><button class="day-open" data-action="openDay" data-day="${item.day}"><span class="day-num"><span><b>${A.bn(item.day)}</b><small>দিন</small></span></span><span class="day-copy"><strong>${A.esc(item.title)}</strong><small>${item.phase} • ${A.esc(A.subjects[item.subject].bn)}</small></span></button><button class="check-btn ${A.state.done.includes(item.day)?'done':''}" data-action="toggleDay" data-day="${item.day}">✓</button></article>`).join('')}</div>`;
  });

  A.registerView('learn',()=>{
    A.view.innerHTML=`<div class="section-head"><div><h3>সিলেবাস ও রিসোর্স</h3><p>বিষয়ভিত্তিক প্রস্তুতি</p></div></div><div class="subject-grid">${D.subjects.map(s=>`<button class="card subject-card subject-button" style="--subject-color:${s.color}" data-action="openSubject" data-subject="${s.id}"><span class="mark">${s.marks} marks</span><span class="subject-icon">${A.esc(s.en[0])}</span><span class="subject-title">${A.esc(s.bn)}</span><span class="subject-description">${A.esc(s.topics.join(' • '))}</span></button>`).join('')}</div>
      <div class="section-head"><div><h3>কারেন্ট অ্যাফেয়ার্স নোট</h3><p>নিজস্ব যাচাইকৃত নোট</p></div><button class="btn small" data-action="newNote">নোট যোগ করুন</button></div><div class="alert"><b>যাচাই জরুরি:</b> বর্তমান তথ্য অফিসিয়াল উৎস থেকে মিলিয়ে নিন।</div><div class="day-list" style="margin-top:10px">${A.state.notes.length?A.state.notes.map(n=>`<article class="card today-card"><div class="modal-head"><div><h4>${A.esc(n.title)}</h4><p>${A.esc(n.date)}${n.source?' • '+A.esc(n.source):''}</p></div><button class="close-btn" data-action="deleteNote" data-note-id="${A.esc(n.id)}">×</button></div><p>${A.esc(n.body)}</p></article>`).join(''):'<div class="empty"><strong>এখনো কোনো নোট নেই</strong>প্রথম নোটটি যোগ করুন।</div>'}</div>
      <div class="section-head"><div><h3>Official resources</h3></div></div><div class="resource-list">${D.resources.map(r=>`<a class="card resource" target="_blank" rel="noopener noreferrer" href="${A.esc(r.url)}"><div><b>${A.esc(r.title)}</b><small>${A.esc(r.type)}</small></div><span>↗</span></a>`).join('')}</div>`;
  });

  function subjectStats(){
    const totals=Object.fromEntries(D.subjects.map(s=>[s.id,{correct:0,total:0}]));
    A.state.history.forEach(h=>{
      if(h.bySubject)Object.entries(h.bySubject).forEach(([id,v])=>{if(totals[id]){totals[id].correct+=Number(v.correct)||0;totals[id].total+=Number(v.total)||0;}});
      else if(totals[h.subject]){totals[h.subject].correct+=Number(h.score)||0;totals[h.subject].total+=Number(h.total)||0;}
    });
    return D.subjects.map(s=>({subject:s,accuracy:totals[s.id].total?Math.round(totals[s.id].correct/totals[s.id].total*100):null}));
  }
  A.registerView('analytics',()=>{
    const total=A.state.history.reduce((s,h)=>s+(Number(h.total)||0),0),correct=A.state.history.reduce((s,h)=>s+(Number(h.score)||0),0),stats=subjectStats(),weak=[...stats].filter(x=>x.accuracy!==null).sort((a,b)=>a.accuracy-b.accuracy)[0];
    A.view.innerHTML=`<div class="analytics-grid"><article class="card stat-card"><span class="label">Plan completion</span><strong>${A.state.done.length}%</strong></article><article class="card stat-card"><span class="label">Quiz accuracy</span><strong>${total?Math.round(correct/total*100):0}%</strong></article></div>${weak?`<div class="alert" style="margin-top:12px"><b>দুর্বল বিষয়:</b> ${A.esc(weak.subject.bn)} — ${A.bn(weak.accuracy)}%</div>`:''}<div class="section-head"><div><h3>বিষয়ভিত্তিক ফলাফল</h3></div></div><article class="card chart-card"><div class="bar-list">${stats.map(x=>`<div class="bar-item"><div class="progress-label"><span>${A.esc(x.subject.bn)}</span><b>${x.accuracy===null?'—':A.bn(x.accuracy)+'%'}</b></div><div class="progress-track"><div class="progress-fill" style="width:${x.accuracy??0}%"></div></div></div>`).join('')}</div></article><div class="section-head"><div><h3>Study Settings</h3></div></div><article class="card quiz-setup"><div class="form-grid"><label>শুরু তারিখ<input id="studyStart" type="date" class="input" value="${A.esc(A.state.start)}"></label><button class="btn" data-action="saveStartDate">তারিখ সংরক্ষণ</button><button class="btn danger" data-action="resetProgress">সব অগ্রগতি রিসেট</button></div></article><div class="section-head"><div><h3>Recent Quiz History</h3></div></div><div class="day-list">${A.state.history.slice(0,12).map(h=>`<article class="card day-card history-card"><span class="day-num"><b>${Math.round(h.score/Math.max(1,h.total)*100)}%</b></span><span class="day-copy"><strong>${h.score}/${h.total}${h.unanswered?` • ${h.unanswered} skipped`:''}</strong><small>${A.esc(h.exam&&h.exam!=='all'?h.exam:A.subjects[h.subject]?.bn||(h.mode==='past'?'বিগত BCS':'মিশ্র কুইজ'))} • ${new Date(h.date).toLocaleString('bn-BD')}</small></span></article>`).join('')||'<div class="empty">এখনো কুইজ ইতিহাস নেই</div>'}</div>`;
  });

  A.registerAction('openSubject',button=>{
    const s=A.subjects[button.dataset.subject];if(!s)return;
    const all=D.questions.filter(q=>q.subject===s.id).length,past=D.questions.filter(q=>q.subject===s.id&&q.past).length;
    A.openModal(`<div class="modal-head"><div><h3>${A.esc(s.bn)}</h3><p>${s.marks} marks • ${A.bn(all)} questions</p></div><button class="close-btn" data-action="closeModal">×</button></div><div class="topic-list">${s.topics.map((t,i)=>`<div class="topic-item"><b>${A.bn(i+1)}.</b>${A.esc(t)}</div>`).join('')}</div><div class="inline-meta"><span class="meta-chip">${A.bn(past)}টি বিগত প্রশ্ন</span></div><button class="btn" style="margin-top:16px" data-action="subjectQuiz" data-subject="${s.id}">এই বিষয়ে কুইজ দিন</button>`);
  });
  A.registerAction('openDay',button=>{
    const item=A.plan[Number(button.dataset.day)-1];if(!item)return;
    A.openModal(`<div class="modal-head"><div>${A.pill(item.subject)}<h3>দিন ${A.bn(item.day)}: ${A.esc(item.title)}</h3></div><button class="close-btn" data-action="closeModal">×</button></div><div class="task-list">${item.tasks.map((t,i)=>`<div class="task"><i>${A.bn(i+1)}</i>${A.esc(t)}</div>`).join('')}</div><button class="btn" data-action="toggleDay" data-day="${item.day}">${A.state.done.includes(item.day)?'অসম্পন্ন করুন':'সম্পন্ন করুন'}</button>`);
  });
})();
