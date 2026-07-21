(() => {
  'use strict';
  const A=window.BCS_APP;

  A.registerAction('toggleDay',button=>A.toggleDay(button.dataset.day));
  A.registerAction('closeModal',()=>A.closeModal());
  A.registerAction('newNote',()=>{
    A.openModal(`<div class="modal-head"><div><h3>কারেন্ট অ্যাফেয়ার্স নোট</h3><p>তারিখ ও উৎসসহ সংরক্ষণ করুন</p></div><button class="close-btn" data-action="closeModal">×</button></div><div class="form-grid"><label>তারিখ<input id="noteDate" type="date" class="input" value="${A.today()}"></label><label>শিরোনাম<input id="noteTitle" class="input" maxlength="120"></label><label>উৎস<input id="noteSource" class="input" maxlength="160"></label><label>সংক্ষিপ্ত বিশ্লেষণ<textarea id="noteBody" class="textarea" maxlength="1200"></textarea></label><button class="btn" data-action="saveNote">নোট সংরক্ষণ</button></div>`);
  });
  A.registerAction('saveNote',()=>{
    const date=document.querySelector('#noteDate')?.value,title=document.querySelector('#noteTitle')?.value.trim(),source=document.querySelector('#noteSource')?.value.trim(),body=document.querySelector('#noteBody')?.value.trim();
    if(!A.validDate(date)||!title||!body)return A.toast('তারিখ, শিরোনাম ও বিশ্লেষণ লিখুন');
    A.state.notes.unshift({id:`${Date.now()}-${Math.random().toString(16).slice(2)}`,date,title,source,body});
    A.state.notes=A.state.notes.slice(0,100);A.save();A.closeModal();A.render(A.currentRoute);A.toast('নোট সংরক্ষিত');
  });
  A.registerAction('deleteNote',button=>{A.state.notes=A.state.notes.filter(n=>n.id!==button.dataset.noteId);A.save();A.render(A.currentRoute);A.toast('নোট মুছে ফেলা হয়েছে');});
  A.registerAction('saveStartDate',()=>{
    const value=document.querySelector('#studyStart')?.value;
    if(!A.validDate(value))return A.toast('সঠিক শুরু তারিখ নির্বাচন করুন');
    A.state.start=value;A.save();A.views.analytics();A.toast('তারিখ সংরক্ষিত');
  });
  A.registerAction('resetProgress',()=>{
    if(confirm('সব অগ্রগতি, কুইজ ইতিহাস ও নোট মুছবেন?')){
      const theme=A.state.theme;A.state={...A.defaults(),theme};A.quizSession=null;A.save();A.navigate('home',{replace:true});
    }
  });

  document.addEventListener('change',event=>{
    if(event.target.matches('#quizMode,#quizSubject,#quizTopic,#quizExam,#quizCount')){
      A.syncPreferences?.();A.views.quiz?.();
    }
  });
  document.addEventListener('click',event=>{
    const routeButton=event.target.closest('[data-route]');
    if(routeButton){A.clearQuizAutoAdvance?.();A.navigate(routeButton.dataset.route);return;}
    const actionButton=event.target.closest('[data-action]');
    if(actionButton)A.actions[actionButton.dataset.action]?.(actionButton,event);
  });

  A.themeBtn.addEventListener('click',()=>{
    A.state.theme=A.state.theme==='dark'?'light':'dark';
    document.body.classList.toggle('light',A.state.theme==='light');
    A.themeBtn.textContent=A.state.theme==='light'?'☀':'☾';A.save();
  });
  A.backBtn.addEventListener('click',()=>{
    A.clearQuizAutoAdvance?.();
    if(A.modalRoot.firstElementChild)return A.closeModal();
    if(A.currentRoute==='quiz/play'||A.currentRoute==='quiz/result')return A.navigate('quiz',{replace:true});
    if(Number(history.state?.bcsIndex||0)>0)history.back();else A.navigate('home',{replace:true});
  });
  addEventListener('popstate',()=>{A.clearQuizAutoAdvance?.();A.render(A.routeFromLocation());});

  document.body.classList.toggle('light',A.state.theme==='light');
  A.themeBtn.textContent=A.state.theme==='light'?'☀':'☾';
  const initial=A.routeFromLocation();
  history.replaceState({bcsApp:true,bcsIndex:0,route:initial},'',`#${initial}`);
  A.render(initial);

  if('serviceWorker'in navigator){
    addEventListener('load',()=>{
      let refreshing=false;
      navigator.serviceWorker.addEventListener('controllerchange',()=>{
        if(refreshing)return;
        refreshing=true;
        location.reload();
      });
      navigator.serviceWorker.register('./sw.js').then(registration=>registration.update()).catch(console.warn);
    });
  }
})();