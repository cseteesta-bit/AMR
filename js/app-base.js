(() => {
  'use strict';
  const A = window.BCS_APP = {};
  A.data = window.BCS_DATA;
  A.quizCore = window.BCS_QUIZ;
  A.routes = new Set(['home','plan','learn','quiz','quiz/play','quiz/result','analytics']);
  A.views = {};
  A.actions = {};
  A.storageKey = 'bcs100-state-v4';
  A.legacyKeys = ['bcs100-state-v3','bcs100-state-v2'];
  A.view = document.querySelector('#view');
  A.modalRoot = document.querySelector('#modalRoot');
  A.toastEl = document.querySelector('#toast');
  A.themeBtn = document.querySelector('#themeBtn');
  A.backBtn = document.querySelector('#backBtn');
  A.subjects = Object.fromEntries(A.data.subjects.map(s => [s.id,s]));
  A.quizSession = null;
  A.timerId = null;
  A.currentRoute = 'home';
  A.preferences = {subject:'all',mode:'all',exam:'all',topic:'all',count:10};

  A.today = () => {
    const d = new Date(), offset = d.getTimezoneOffset() * 60000;
    return new Date(d - offset).toISOString().slice(0,10);
  };
  A.defaults = () => ({start:A.today(),done:[],history:[],notes:[],studyDone:[],theme:'dark'});
  A.validDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '') && !Number.isNaN(new Date(`${value}T00:00:00`).getTime());
  A.bn = value => String(value).replace(/\d/g,digit => '০১২৩৪৫৬৭৮৯'[digit]);
  A.esc = value => String(value ?? '').replace(/[&<>"']/g,c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  A.pill = id => {
    const s=A.subjects[id];
    return s ? `<span class="subject-pill" style="--subject-color:${s.color}">${A.esc(s.bn)}</span>` : '';
  };

  A.load = () => {
    try {
      let raw=localStorage.getItem(A.storageKey);
      if(!raw) for(const key of A.legacyKeys){raw=localStorage.getItem(key);if(raw)break;}
      const state={...A.defaults(),...(raw?JSON.parse(raw):{})};
      state.start=A.validDate(state.start)?state.start:A.today();
      state.done=Array.isArray(state.done)?[...new Set(state.done.map(Number).filter(n=>n>=1&&n<=100))].sort((a,b)=>a-b):[];
      state.history=Array.isArray(state.history)?state.history.slice(0,300):[];
      state.notes=Array.isArray(state.notes)?state.notes.slice(0,100):[];
      state.studyDone=Array.isArray(state.studyDone)?[...new Set(state.studyDone.map(String))]:[];
      state.theme=state.theme==='light'?'light':'dark';
      return state;
    } catch(error){console.warn(error);return A.defaults();}
  };
  A.state=A.load();
  A.save=()=>{try{localStorage.setItem(A.storageKey,JSON.stringify(A.state));}catch(error){console.warn(error);A.toast('সংরক্ষণ করা যায়নি');}};
  A.toast=message=>{
    A.toastEl.textContent=message;A.toastEl.classList.add('show');
    setTimeout(()=>A.toastEl.classList.remove('show'),1900);
  };

  A.normalizeRoute=value=>{
    const route=String(value||'').replace(/^#\/?/,'').replace(/\/+$/,'');
    return A.routes.has(route)?route:'home';
  };
  A.routeFromLocation=()=>A.normalizeRoute(location.hash);
  A.navigate=(route,{replace=false}={})=>{
    const target=A.normalizeRoute(route),method=replace?'replaceState':'pushState';
    const index=Number(history.state?.bcsIndex||0);
    history[method]({bcsApp:true,bcsIndex:replace?index:index+1,route:target},'',`#${target}`);
    A.render(target);
  };
  A.updateNav=route=>{
    const base=route.startsWith('quiz')?'quiz':route;
    document.querySelectorAll('.nav-item').forEach(btn=>btn.classList.toggle('active',btn.dataset.route===base));
    A.backBtn.hidden=route==='home';
  };
  A.render=route=>{
    A.currentRoute=A.normalizeRoute(route);
    A.updateNav(A.currentRoute);
    if(!A.currentRoute.startsWith('quiz/')) A.stopTimer?.();
    const renderer=A.views[A.currentRoute]||A.views.home;
    renderer?.();
    scrollTo({top:0});
  };
  A.registerView=(route,fn)=>{A.views[route]=fn;};
  A.registerAction=(name,fn)=>{A.actions[name]=fn;};

  A.openModal=html=>{A.modalRoot.innerHTML=`<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true">${html}</section></div>`;};
  A.closeModal=()=>{A.modalRoot.innerHTML='';};
  A.modalRoot.addEventListener('click',event=>{if(event.target.classList.contains('modal-backdrop'))A.closeModal();});

  A.plan=Array.from({length:100},(_,index)=>{
    const s=A.data.subjects[index%A.data.subjects.length];
    const phase=index<70?'ভিত্তি নির্মাণ':index<85?'রিভিশন':index<95?'মক পরীক্ষা':'ফাইনাল ল্যাপ';
    return {
      day:index+1,phase,subject:s.id,
      title:index<70?s.topics[Math.floor(index/10)%s.topics.length]:index<85?`${s.bn}: পূর্ণ রিভিশন`:index<95?`পূর্ণাঙ্গ মক টেস্ট ${A.bn(index-84)}`:'চূড়ান্ত রিভিশন ও পরীক্ষার কৌশল',
      minutes:index<70?130:160,mcq:index<85?40:200,
      tasks:index<85?[`${s.bn}-এর মূল ধারণা ও নোট পড়ুন`,'নির্ধারিত টপিকের প্রশ্ন সমাধান করুন','ভুল উত্তর বিশ্লেষণ ও পুনরাবৃত্তি করুন']:['সময় ধরে পূর্ণাঙ্গ পরীক্ষা দিন','স্কোর ও ভুলের ধরন লিখুন','দুর্বল অংশ পুনরায় পড়ুন']
    };
  });
  A.studyDay=()=>{
    const start=new Date(`${A.state.start}T00:00:00`),now=new Date();now.setHours(0,0,0,0);
    return Number.isNaN(start.getTime())?1:Math.min(100,Math.max(1,Math.floor((now-start)/86400000)+1));
  };
  A.toggleDay=value=>{
    const day=Number(value);if(!Number.isInteger(day)||day<1||day>100)return;
    A.state.done=A.state.done.includes(day)?A.state.done.filter(n=>n!==day):[...A.state.done,day].sort((a,b)=>a-b);
    A.save();A.closeModal();A.render(A.currentRoute);A.toast('অগ্রগতি সংরক্ষিত');
  };
})();