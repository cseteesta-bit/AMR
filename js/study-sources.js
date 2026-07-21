(() => {
  'use strict';
  const study = window.BCS_STUDY;
  const data = window.BCS_DATA;
  if (!study || !data) return;

  const defaults = {
    bangla: [
      {title:'NCTB বাংলা ভাষার ব্যাকরণ ও নির্মিতি',url:'https://nctb.gov.bd/pages/static-pages/6922e0c0933eb65569e28767'},
      {title:'বাংলা একাডেমি',url:'https://banglaacademy.gov.bd/'}
    ],
    english: [
      {title:'British Council LearnEnglish Grammar',url:'https://learnenglish.britishcouncil.org/free-resources/grammar'},
      {title:'Purdue OWL Grammar',url:'https://owl.purdue.edu/owl/general_writing/grammar/index.html'}
    ],
    bd: [
      {title:'Laws of Bangladesh — Constitution',url:'https://bdlaws.minlaw.gov.bd/act-print-367.html'},
      {title:'Bangladesh Bureau of Statistics',url:'https://bbs.portal.gov.bd/'}
    ],
    international: [
      {title:'United Nations Charter',url:'https://www.un.org/en/about-us/un-charter'},
      {title:'United Nations Global Issues',url:'https://www.un.org/en/global-issues'}
    ],
    geography: [
      {title:'UNDRR Terminology',url:'https://www.undrr.org/terminology'},
      {title:'USGS Science',url:'https://www.usgs.gov/science'}
    ],
    science: [
      {title:'OpenStax Science',url:'https://openstax.org/subjects/science'},
      {title:'NASA Science',url:'https://science.nasa.gov/'}
    ],
    ict: [
      {title:'MDN Web Development',url:'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core'},
      {title:'NIST Cybersecurity Basics',url:'https://www.nist.gov/itl/smallbusinesscyber/cybersecurity-basics'}
    ],
    math: [
      {title:'OpenStax Elementary Algebra 2e',url:'https://openstax.org/details/books/elementary-algebra-2e'},
      {title:'OpenStax College Algebra 2e',url:'https://openstax.org/books/college-algebra-2e/pages/preface'}
    ],
    mental: [
      {title:'BPSC BCS Examination System',url:'https://bpsc.gov.bd/pages/static-pages/691997b3933eb65569dde2bf'},
      {title:'OpenStax Algebra and Problem Solving',url:'https://openstax.org/books/elementary-algebra-2e/pages/1-introduction'}
    ],
    ethics: [
      {title:'Bangladesh Constitution',url:'https://bdlaws.minlaw.gov.bd/act-print-367.html'},
      {title:'World Bank Worldwide Governance Indicators',url:'https://www.worldbank.org/en/publication/worldwide-governance-indicators'}
    ]
  };

  const overrides = {
    'bd-history': [
      {title:'Ministry of Liberation War Affairs',url:'https://molwa.gov.bd/'},
      {title:'Bangladesh Constitution',url:'https://bdlaws.minlaw.gov.bd/act-print-367.html'}
    ],
    'bd-geoeconomy': [
      {title:'Bangladesh Bureau of Statistics',url:'https://bbs.portal.gov.bd/'},
      {title:'Bangladesh Bank',url:'https://www.bb.org.bd/'}
    ],
    'bd-culture': [
      {title:'UNESCO World Heritage — Bangladesh',url:'https://whc.unesco.org/en/statesparties/bd'},
      {title:'বাংলা একাডেমি',url:'https://banglaacademy.gov.bd/'}
    ],
    'int-orgs': [
      {title:'World Trade Organization — What We Do',url:'https://www.wto.org/english/thewto_e/whatis_e/what_we_do_e.htm'},
      {title:'International Monetary Fund — About',url:'https://www.imf.org/en/About'},
      {title:'World Bank — What We Do',url:'https://www.worldbank.org/en/what-we-do'}
    ],
    'int-lawrights': [
      {title:'Universal Declaration of Human Rights',url:'https://www.un.org/en/about-us/universal-declaration-of-human-rights'},
      {title:'UN Convention on the Law of the Sea',url:'https://www.un.org/depts/los/convention_agreements/convention_overview_convention.htm'}
    ],
    'geo-earth': [
      {title:'USGS Earthquake Hazards',url:'https://www.usgs.gov/programs/earthquake-hazards'},
      {title:'USGS Plate Tectonics',url:'https://www.usgs.gov/programs/earthquake-hazards/science/plate-tectonics'}
    ],
    'geo-climate': [
      {title:'NASA Global Climate Change',url:'https://science.nasa.gov/climate-change/'},
      {title:'NOAA Climate',url:'https://www.noaa.gov/climate'}
    ],
    'geo-bangladesh': [
      {title:'Bangladesh Bureau of Statistics',url:'https://bbs.portal.gov.bd/'},
      {title:'Banglapedia — National Encyclopedia',url:'https://en.banglapedia.org/'}
    ],
    'geo-disaster': [
      {title:'UNDRR Disaster Risk Reduction Terminology',url:'https://www.undrr.org/terminology/disaster-risk-reduction'},
      {title:'Bangladesh Department of Disaster Management',url:'https://ddm.gov.bd/'}
    ],
    'science-space': [
      {title:'NASA Solar System Exploration',url:'https://science.nasa.gov/solar-system/solar-system-facts/'},
      {title:'NASA Moon Science',url:'https://science.nasa.gov/moon/'}
    ],
    'ict-data': [
      {title:'PostgreSQL Database Concepts',url:'https://www.postgresql.org/docs/current/tutorial-concepts.html'},
      {title:'MDN Programming Fundamentals',url:'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting'}
    ],
    'ethics-governance': [
      {title:'World Bank Worldwide Governance Indicators',url:'https://www.worldbank.org/en/publication/worldwide-governance-indicators'},
      {title:'World Bank Governance',url:'https://www.worldbank.org/en/topic/governance'}
    ],
    'ethics-rights': [
      {title:'Universal Declaration of Human Rights',url:'https://www.un.org/en/about-us/universal-declaration-of-human-rights'},
      {title:'Bangladesh Constitution',url:'https://bdlaws.minlaw.gov.bd/act-print-367.html'}
    ]
  };

  for (const [subjectId, subject] of Object.entries(study.subjects)) {
    for (const module of subject.modules) {
      module.sources = overrides[module.id] || defaults[subjectId] || module.sources;
    }
  }

  for (const question of data.questions) {
    if (!question.study) continue;
    const sources = overrides[question.topicId] || defaults[question.subject];
    if (sources?.[0]?.url) question.sourceUrl = sources[0].url;
  }
})();
