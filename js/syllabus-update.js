(()=>{
  const marks={bangla:30,english:30,bd:25,international:25,geography:10,science:15,ict:15,math:20,mental:15,ethics:15};
  window.BCS_DATA.meta={appName:'BCS 100 Pro',syllabusVersion:'50th BCS Preliminary Syllabus (2025)',syllabusPublished:'2025-12-09',totalMarks:200,examMinutes:120,note:'Always verify new notices and current affairs from official sources.'};
  window.BCS_DATA.subjects.forEach(subject=>{if(marks[subject.id])subject.marks=marks[subject.id]});
  window.BCS_DATA.resources=[
    {title:'Official 50th BCS Preliminary Syllabus',url:'https://bpsc.gov.bd/pages/psc-exams/%E0%A7%AB%E0%A7%A6%E0%A6%A4%E0%A6%AE-%E0%A6%AC%E0%A6%BF-%E0%A6%B8%E0%A6%BF-%E0%A6%8F%E0%A6%B8-%E0%A6%AA%E0%A6%B0%E0%A7%80%E0%A6%95%E0%A7%8D%E0%A6%B7%E0%A6%BE-%E0%A7%A8%E0%A7%A6%E0%A7%A8%E0%A7%AB-%E0%A6%8F%E0%A6%B0-%E0%A6%AA%E0%A6%BF%E0%A6%B2%E0%A6%BF%E0%A6%AE%E0%A6%BF%E0%A6%A8%E0%A6%BE%E0%A6%B0%E0%A6%BF-%E0%A6%9F%E0%A7%87%E0%A6%B8%E0%A7%8D%E0%A6%9F%E0%A7%87%E0%A6%B0-mcq-type-%E0%A6%B8%E0%A6%BF%E0%A6%B2%E0%A6%BF%E0%A6%AC%E0%A6%BE%E0%A6%B8-299ca4-69568a5d35ce18e1c05ad0af',type:'Official',subject:'all'},
    {title:'BPSC BCS Examination System',url:'https://bpsc.gov.bd/pages/static-pages/691997b3933eb65569dde2bf',type:'Official',subject:'all'},
    {title:'Bangladesh Laws / Constitution',url:'http://bdlaws.minlaw.gov.bd/',type:'Government',subject:'bd'},
    {title:'Bangladesh Bureau of Statistics',url:'https://bbs.portal.gov.bd/',type:'Government',subject:'bd'},
    {title:'Ministry of Foreign Affairs, Bangladesh',url:'https://mofa.gov.bd/',type:'Government',subject:'international'},
    {title:'United Nations',url:'https://www.un.org/',type:'Primary',subject:'international'},
    {title:'World Bank - Bangladesh',url:'https://www.worldbank.org/en/country/bangladesh',type:'Primary',subject:'bd'},
    {title:'NASA Science',url:'https://science.nasa.gov/',type:'Primary',subject:'science'},
    {title:'MDN Web Docs',url:'https://developer.mozilla.org/',type:'Reference',subject:'ict'},
    {title:'NIST Cybersecurity',url:'https://www.nist.gov/cybersecurity',type:'Primary',subject:'ict'}
  ];
})();
