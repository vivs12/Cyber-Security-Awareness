console.log("script.js incarcat");


/* =========================
   SCROLL REVEAL
========================= */
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 150;
  reveals.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < windowHeight - revealPoint) {
      section.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =========================
   FIXED HEADER NAVIGATION
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeMenu = document.getElementById("closeMenu");
  const homeBtn = document.getElementById("homeBtn");
  const menuItems = document.querySelectorAll(".menu-item");
  const simulateAttackBtn = document.getElementById("simulateAttackBtn");
  const miniTestHeaderBtn = document.getElementById("miniTestHeaderBtn");
  const psychQuizHeaderBtn = document.getElementById("psychQuizHeaderBtn");

  // Toggle menu
  if (menuToggle) {
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Menu toggle clicked");
      sideMenu.classList.toggle("hidden");
      menuOverlay.classList.toggle("hidden");
    });
  }

  // Close menu
  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      sideMenu.classList.add("hidden");
      menuOverlay.classList.add("hidden");
    });
  }

  // Close menu when clicking overlay
  if (menuOverlay) {
    menuOverlay.addEventListener("click", () => {
      sideMenu.classList.add("hidden");
      menuOverlay.classList.add("hidden");
    });
  }

  // Home button
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      sideMenu.classList.add("hidden");
      menuOverlay.classList.add("hidden");
    });
  }

  // Menu items - smooth scroll to sections
  menuItems.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault(); // previne navigarea implicită dacă e un link
    const sectionId = item.dataset.section; // echivalent cu getAttribute
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      sideMenu.classList.add("hidden");
      menuOverlay.classList.add("hidden");
    } else {
      // Afișare mesaj vizibil în pagină
      let errorBox = document.getElementById("menuErrorBox");
      if (!errorBox) {
        errorBox = document.createElement("div");
        errorBox.id = "menuErrorBox";
        errorBox.style.position = "fixed";
        errorBox.style.top = "10px";
        errorBox.style.right = "10px";
        errorBox.style.backgroundColor = "#ff5555";
        errorBox.style.color = "white";
        errorBox.style.padding = "10px 20px";
        errorBox.style.borderRadius = "5px";
        errorBox.style.zIndex = 10000;
        errorBox.style.fontFamily = "sans-serif";
        errorBox.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
        document.body.appendChild(errorBox);
      }
      errorBox.textContent = `⚠️ Secțiunea "${sectionId}" nu există! Verifică id-ul în HTML.`;

      // Mesajul dispare după 5 secunde
      setTimeout(() => {
        if (errorBox) errorBox.remove();
      }, 5000);

      console.warn("Secțiunea nu a fost găsită:", sectionId);
    }
  });
});


  // Simulate attack button (first attack simulation)
  const attackBtn = document.getElementById("simulateAttackBtn");
  if (attackBtn) {
    attackBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const emailModal = document.getElementById("emailModal");
      if (emailModal) {
        emailModal.classList.remove("hidden");
      }
    });
  }

  // Mini test button (second attack simulation)
  const testBtn = document.getElementById("miniTestHeaderBtn");
  if (testBtn) {
    testBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const phishingTest = document.getElementById("phishingTest");
      if (phishingTest) {
        phishingTest.classList.remove("hidden");
      }
    });
  }
});



const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  const target = +counter.dataset.target;
  let value = 0;
  const step = Math.ceil(target / 50);

  const update = () => {
    value += step;
    if (value >= target) {
      counter.innerText = target;
    } else {
      counter.innerText = value;
      requestAnimationFrame(update);
    }
  };

  update();
});


/* =========================
   DIAGRAMĂ INTERACTIVĂ
========================= */
document.addEventListener("DOMContentLoaded", () => {

const steps = document.querySelectorAll(".step");
const stepTitle = document.getElementById("step-title");
const stepDescription = document.getElementById("step-description");
const stepExample = document.getElementById("step-example");
const stepDetect = document.getElementById("step-detect");
const statNumbers = document.querySelectorAll(".stat-number");
const statTexts = document.querySelectorAll(".stat-text");

// Debugging
console.log("Steps found:", steps.length);
console.log("Step title element:", stepTitle);
console.log("Step description element:", stepDescription);
console.log("Stat numbers found:", statNumbers.length);

// Date pas cu pas
const stepData = {
  1: { title:"Planificare atac", description:"Atacatorul își definește în mod precis obiectivele, fie că urmărește obținerea accesului la informații sensibile, fie compromiterea unor sisteme specifice. Ulterior, sunt alese țintele considerate vulnerabile, care pot contribui la realizarea acestor scopuri. Acestea sunt analizate în detaliu pentru a identifica slăbiciuni potențiale, atât la nivel tehnic, cât și uman, precum și pentru a evalua infrastructura IT și măsurile de securitate implementate.", example:"Atacatorii încearcă să înțeleagă tipul de sistem ce urmează să fie atacat.", detect: ["Limitarea informațiilor publice","Politici clare de securitate","Training de awareness"], stats:[{value:91,text:"din atacuri încep cu phishing"},{value:82,text:"din atacuri au un factor uman implicat"}]},
  2: { title:"Culegere informații", description:"Identificarea canalelor din care pot fi obținute informații despre țintă, precum rețelele de socializare sau platformele profesionale. Datele colectate, incluzând informații personale, comportamente online și relații interpersonale sunt analizate atent pentru a crea un profil detaliat al țintei și pentru a evidenția vulnerabilitățile ce pot fi exploatate.", example:"Analizarea profilurilor LinkedIn și Facebook.", detect:["Setări stricte de confidențialitate","Monitorizarea scurgerilor de date","Politici OSINT"], stats:[{value:36,text:"dintre breșe implică phishing"},{value:60,text:"faze de recunoaștere detectate"}]},
  3: { title:"Pregătire atac", description:"Elaborarea unui plan de acțiune detaliat, care presupune alegerea tacticilor și tehnicilor ce urmează să fie aplicate. Sunt create și pregătite materialele necesare, precum emailuri false sau conturi pe rețelele sociale. Planul poate fi testat și simulat în prealabil pentru a depista eventualele erori și a le corecta înainte de implementare.", example:"Clonarea unui site oficial sau a unei pagini de login.", detect:["Monitorizarea domeniilor similare","Filtre anti-phishing"], stats:[{value:30,text:"dintre utilizatori deschid phishing"},{value:50,text:"din materiale au fost detectate de sisteme automate"}]},
  4: { title:"Infiltrare", description:"Stabilirea unui canal de comunicare cu victima prin diferite mijloace și crearea unei relații bazate pe încredere, cu scopul de a facilita manipularea. Ulterior, atacatorul își adaptează tactica în funcție de reacțiile și trăsăturile de personalitate ale victimei, pentru a face mesajul cât mai credibil și convingător.", example:"Email aparent trimis de departamentul IT.", detect:["Verificarea expeditorului","Analiza conținutului mesajului","Raportarea e-mailurilor suspecte"], stats:[{value:12,text:"dau click pe linkuri malware"},{value:40,text:"din mesaje au fost deschise fără verificare"}]},
  5: { title:"Exploatare", description:"După ce a reușit să construiască o relație de încredere cu ținta, atacatorul începe să exploateze această legătură pentru a obține informațiile sau accesul dorit. Eficiența atacului depinde în mare măsură de nivelul de pregătire al infiltrării și de capacitatea atacatorului de a fi credibil și persuasiv.", example:"Introducerea parolei într-un formular fals.", detect:["Autentificare multi-factor","Limitarea privilegiilor","Monitorizarea comportamentului"], stats:[{value:76,text:"dintre organizații au suferit un astfel de atac"},{value:65,text:"din cazuri reprezintă o exploatare reușită"}]},
  6: { title:"Revizuire informații", description:"După ce obține toate informațiile necesare, atacatorul continuă să păstreze legătura cu victima pentru o perioadă scurtă, astfel încât aceasta să nu realizeze că a fost ținta unui atac și, implicit, să nu anunțe autoritățile competente. Eventualele greșeli sunt analizate și consemnate pentru a fi evitate pe viitor, iar strategia de atac este ajustată în funcție de acestea.", example:"Testarea credențialelor pe sisteme interne.", detect:["Monitorizarea autentificărilor","Alerte de securitate"], stats:[{value:82,text:"din cazuri au avut o revizuire eficientă"},{value:28,text:"au avut o activitate suspectă neobservată"}]},
  7: { title:"Retragere", description:"Ștergerea tuturor urmelor care ar putea indica implicarea atacatorului și întreruperea completă a oricăror canale de comunicare cu victima. În această etapă finală, poate fi realizată și o supraveghere discretă a victimei, pentru a verifica dacă atacul a fost descoperit.", example:"Dezactivarea domeniilor folosite în atac.", detect:["Analiză post-incident","Jurnale de audit"], stats:[{value:80,text:"din cazuri, retragerea a vut loc fără detectare"},{value:60,text:"din atacuri au fost raportate după finalizare"}]}
};

// Animare statistici
function animateStat(statEl, target) {
  statEl.innerText = "0";
  const update = () => {
    const current = +statEl.innerText;
    const increment = Math.ceil(target / 50);
    if(current < target) { statEl.innerText = current + increment; setTimeout(update, 20);}
    else { statEl.innerText = target; }
  };
  update();
}

// Actualizare pas
function updateStep(stepNumber){
  const data = stepData[stepNumber];

  stepTitle.textContent = data.title;
  stepDescription.textContent = data.description;
  stepExample.textContent = data.example;

  stepDetect.innerHTML = "";
  data.detect.forEach(d => {
    const li = document.createElement("li");
    li.textContent = d;
    stepDetect.appendChild(li);
  });

  // IMPORTANT: limităm la câte elemente există în HTML
  statNumbers.forEach((statEl, i) => {
    if (data.stats[i]) {
      statTexts[i].innerText = data.stats[i].text;
      animateStat(statEl, data.stats[i].value);
    } else {
      statTexts[i].innerText = "";
      statEl.innerText = "0";
    }
  });
}


// Click pe buton
steps.forEach(step=>{
  step.addEventListener("click", ()=>{
    steps.forEach(s=>s.classList.remove("active"));
    step.classList.add("active");
    updateStep(step.dataset.step);
  });
});

// Initializare pas 1
updateStep(1);

/* =========================
     SIMULARE ATAC + LOGIN
  ========================= */
  const simulateBtn = document.getElementById("simulateBtn");
  const resetBtn = document.getElementById("resetBtn");
  const emailModal = document.getElementById("emailModal");
  const confirmIdentityBtn = document.getElementById("confirmIdentityBtn");
  const closeModal = document.getElementById("closeModal");

  const loginModal = document.getElementById("loginModal");
  const loginBtn = document.getElementById("loginBtn");
  const closeLoginModal = document.getElementById("closeLoginModal");
  const userInput = document.getElementById("username");
  const passInput = document.getElementById("password");
  const loginMessage = document.getElementById("loginMessage");

  simulateBtn.addEventListener("click", () => {
    emailModal.classList.remove("hidden");
  });

  // Close email modal
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      emailModal.classList.add("hidden");
    });
  }

  // Close email modal on overlay click
  const emailOverlay = document.querySelector(".email-modal-overlay");
  if (emailOverlay) {
    emailOverlay.addEventListener("click", () => {
      emailModal.classList.add("hidden");
    });
  }

  // Show login modal when confirm identity is clicked
  if (confirmIdentityBtn) {
    confirmIdentityBtn.addEventListener("click", () => {
      emailModal.classList.add("hidden");
      loginModal.classList.remove("hidden");
    });
  }

  loginBtn.addEventListener("click", () => {
    if (userInput.value === "admin" && passInput.value === "admin") {
      loginMessage.classList.remove("hidden");
    } else {
      alert("❌ Date incorecte");
    }
  });

  // Close login modal with Ieșire button
  if (closeLoginModal) {
    closeLoginModal.addEventListener("click", () => {
      emailModal.classList.add("hidden");
      loginModal.classList.add("hidden");
      loginMessage.classList.add("hidden");
      userInput.value = "";
      passInput.value = "";
    });
  }

  resetBtn.addEventListener("click", () => {
    emailModal.classList.add("hidden");
    loginModal.classList.add("hidden");
    loginMessage.classList.add("hidden");
    userInput.value = "";
    passInput.value = "";
  });

});

/* =========================
   MINI TEST PHISHING (SEPARAT)
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const simulatePhishingBtn = document.getElementById("simulatePhishingBtn");
  const phishingTest = document.getElementById("phishingTest");
  const closePhishingTest = document.getElementById("closePhishingTest");
  const answers = phishingTest ? phishingTest.querySelectorAll(".answer") : [];
  const answerResult = document.getElementById("answerResult");

  // DESCHIDERE DOAR PENTRU MINI-TEST
  if (simulatePhishingBtn) {
    simulatePhishingBtn.addEventListener("click", () => {
      if (phishingTest) {
        phishingTest.classList.remove("hidden");
      }
    });
  }

  // ÎNCHIDERE
  if (closePhishingTest) {
    closePhishingTest.addEventListener("click", () => {
      closeMiniTest();
    });
  }

  // CLICK PE OVERLAY
  if (phishingTest) {
    const overlay = phishingTest.querySelector(".email-modal-overlay");
    if (overlay) {
      overlay.addEventListener("click", closeMiniTest);
    }
  }

  // RĂSPUNSURI
  answers.forEach(btn => {
    btn.addEventListener("click", () => {
      if (answerResult) {
        answerResult.classList.remove("hidden");

        if (btn.classList.contains("correct")) {
          answerResult.textContent =
            "✅ Felicitări! Răspunsul tău este corect!";
          answerResult.className = "result-message success";
        } else {
          answerResult.textContent =
            "❌ Ne pare rău! Tocmai ai căzut capcana unui atac de tip phishing!";
          answerResult.className = "result-message error";
        }
      }
    });
  });

  // RESET
  function closeMiniTest() {
    if (phishingTest) {
      phishingTest.classList.add("hidden");
    }
    if (answerResult) {
      answerResult.classList.add("hidden");
      answerResult.textContent = "";
    }
  }
});

// ...existing code...

// =========================
//     QUIZ PSIHOLOGIC
// =========================

// Quiz scenarios
var scenarios = [
  {
    text: `Primești un email:<br>
    <em>"Contul tău va fi suspendat în 24h. Verifică urgent datele."</em>`,
    options: [
      { label: "Urgență", value: "urgency" },
      { label: "Frică / Amenințare", value: "fear" },
      { label: "Autoritate", value: "authority" },
      { label: "Curiozitate", value: "curiosity" }
    ],
    correct: ["urgency", "fear"]
  },
  {
    text: `Un mesaj spune:<br>
    <em>"Sunt de la IT. Am nevoie rapid de parola ta."</em>`,
    options: [
      { label: "Autoritate", value: "authority" },
      { label: "Presiune socială", value: "pressure" },
      { label: "Recompensă", value: "reward" },
      { label: "Curiozitate", value: "curiosity" }
    ],
    correct: ["authority", "pressure"]
  },
  {
    text: `Primești un mesaj:<br>
    <em>"Ai câștigat un voucher! Apasă aici."</em>`,
    options: [
      { label: "Recompensă", value: "reward" },
      { label: "Curiozitate", value: "curiosity" },
      { label: "Frică", value: "fear" },
      { label: "Urgență", value: "urgency" }
    ],
    correct: ["reward", "curiosity"]
  },
  {
    text: `Email aparent de la bancă:<br>
    <em>"Activitate suspectă detectată."</em>`,
    options: [
      { label: "Autoritate", value: "authority" },
      { label: "Frică", value: "fear" },
      { label: "Urgență", value: "urgency" },
      { label: "Empatie", value: "empathy" }
    ],
    correct: ["authority", "fear", "urgency"]
  },
  {
    text: `Un coleg spune:<br>
    <em>"Am nevoie de ajutor rapid, șeful a cerut."</em>`,
    options: [
      { label: "Presiune socială", value: "pressure" },
      { label: "Autoritate", value: "authority" },
      { label: "Curiozitate", value: "curiosity" },
      { label: "Recompensă", value: "reward" }
    ],
    correct: ["pressure", "authority"]
  }
];

let current = 0;
let score = 0;

// GLOBAL FUNCTIONS - accessible from HTML onclick
function loadScenario() {
  const s = scenarios[current];
  const scenarioText = document.getElementById("scenarioText");
  const optionsDiv = document.getElementById("quizOptions");
  const feedback = document.getElementById("quizFeedback");
  const nextBtn = document.getElementById("nextBtn");

  if (!scenarioText || !optionsDiv || !feedback || !nextBtn) return;

  scenarioText.innerHTML =
    `<strong>Scenariul ${current + 1} din ${scenarios.length}</strong><br><br>${s.text}`;

  optionsDiv.innerHTML = "";
  s.options.forEach(opt => {
    optionsDiv.innerHTML += `
      <label>
        <input type="checkbox" value="${opt.value}">
        ${opt.label}
      </label>
    `;
  });

  feedback.innerHTML = "";
  nextBtn.style.display = "none";
}

function checkAnswer() {
  const selected = [...document.querySelectorAll("#quizOptions input:checked")]
    .map(el => el.value);

  const correct = scenarios[current].correct;
  const feedback = document.getElementById("quizFeedback");

  if (!feedback) return;

  const isCorrect =
    selected.length === correct.length &&
    selected.every(v => correct.includes(v));

  if (isCorrect) {
    score++;
    feedback.style.color = "#00ff99";
    feedback.innerHTML = "✔ Corect! Ai identificat tactica psihologică.";
  } else {
    feedback.style.color = "#ff5555";
    feedback.innerHTML =
      `✖ Răspuns greșit.<br>
       Tactici corecte: <strong>${correct.join(", ")}</strong>`;
  }

  document.getElementById("nextBtn").style.display = "inline-block";
}

function nextScenario() {
  current++;
  if (current < scenarios.length) {
    loadScenario();
  } else {
    const quizContainer = document.querySelector(".psych-quiz");
    if (quizContainer) {
      quizContainer.innerHTML = `
        <h3 style="color: #0b8500; font-size: 30px"> 🎉 Quiz finalizat </h3>
        <p>Scorul tău: <strong>${score} / ${scenarios.length}</strong></p>
        <p>
          ${score >= 4 ? "Excelent! Recunoști foarte bine atacurile 👏" :
            score >= 2 ? "Bine, dar mai e loc de atenție ⚠️" :
            "Ai grijă! Ești vulnerabil la inginerie socială 🚨"}
        </p>
      `;
    }
  }
}

function startQuiz() {
  const psychQuiz = document.getElementById("psychQuiz");
  if (psychQuiz) {
    psychQuiz.classList.remove("hidden");
  }
  current = 0;
  score = 0;
  loadScenario();
}


var scenarios = [
  {
    text: "Primești un email care spune: „Contul tău va fi suspendat în 30 de minute dacă nu confirmi datele.”",
    options: [
      "Urgență / Presiune",
      "Recompensă",
      "Reciprocitate",
      "Conexiune socială"
    ],
    correct: 0
  },
  {
    text: "Un mesaj pretinde că vine de la banca ta și cere parola pentru verificare.",
    options: [
      "Autoritate",
      "Recompensă",
      "Oboseală mentală",
      "Mesaje subliminale"
    ],
    correct: 0
  },
  {
    text: "Primești un mesaj: „Ai câștigat un voucher de 500 RON! Click aici pentru a-l revendica.”",
    options: [
      "Frică",
      "Recompensă",
      "Autoritate",
      "Urgență"
    ],
    correct: 1
  },
  {
    text: "Un coleg îți cere urgent ajutor financiar printr-un mesaj emoțional.",
    options: [
      "Reciprocitate",
      "Conexiune socială",
      "Autoritate",
      "Suprainformație"
    ],
    correct: 1
  },
  {
    text: "Un email foarte lung, cu multe detalii tehnice, te face să accepți rapid cererea.",
    options: [
      "Suprainformație",
      "Recompensă",
      "Urgență",
      "Frică"
    ],
    correct: 0
  }
];

let currentScenario = 0;
let selectedAnswer = null;

function startQuiz() {
  document.querySelector(".start-quiz-btn").style.display = "none";
  document.getElementById("psychQuiz").classList.remove("hidden");
  loadScenario();
}

function loadScenario() {
  selectedAnswer = null;
  document.getElementById("quizFeedback").innerText = "";
  document.getElementById("nextBtn").style.display = "none";

  const scenario = scenarios[currentScenario];

  document.getElementById("scenarioText").innerText =
    `Scenariul ${currentScenario + 1}: ${scenario.text}`;

  // PROGRES
  const progressPercent = (currentScenario / scenarios.length) * 100;
  document.getElementById("progressFill").style.width = progressPercent + "%";
  document.getElementById("progressText").innerText =
    `Scenariul ${currentScenario + 1} / ${scenarios.length}`;

  const optionsDiv = document.getElementById("quizOptions");
  optionsDiv.innerHTML = "";

  scenario.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(btn, index);
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(btn, index) {
  document.querySelectorAll("#quizOptions .answer")
    .forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedAnswer = index;
}

function checkAnswer() {
  if (selectedAnswer === null) return;

  const feedback = document.getElementById("quizFeedback");

  if (selectedAnswer === scenarios[currentScenario].correct) {
    feedback.innerText = "✅ Corect! Ai identificat tactica psihologică.";
    feedback.style.color = "#22c55e";
    score++; // ⬅ scor
  } else {
    feedback.innerText = "❌ Greșit. Analizează emoția exploatată.";
    feedback.style.color = "#ef4444";
  }

  document.getElementById("nextBtn").style.display = "inline-block";
}


function nextScenario() {
  currentScenario++;

  if (currentScenario < scenarios.length) {
    loadScenario();
  } else {
    document.getElementById("psychQuiz").innerHTML = `
      <h3>🎉 Quiz finalizat!</h3>
      <p><strong>Scorul tău:</strong> ${score} / ${scenarios.length}</p>

      <p>
        ${
          score === scenarios.length
            ? "🔥 Excelent! Recunoști perfect tacticile de inginerie socială."
            : score >= 3
            ? "👍 Foarte bine! Ești atent, dar mai pot apărea capcane."
            : "⚠️ Atenție! Atacurile psihologice te pot păcăli ușor."
        }
      </p>

      <button class="quiz-btn" onclick="location.reload()">
        Reia quiz-ul
      </button>
    `;
  }
}

const infoData = {
  phishing: {
    title: "🎣 Phishing",
    text: "Phishing-ul este una dintre cele mai comune metode de atac. Atacatorul trimite mesaje care imită instituții reale (bănci, companii, colegi). Mesajele creează urgență și determină utilizatorul să introducă date sensibile pe site-uri false."
  },
  social: {
    title: "🧠 Social Engineering",
    text: "Social engineering-ul exploatează psihologia umană. Atacatorul folosește frică, autoritate sau empatie pentru a convinge utilizatorul să acționeze împotriva propriului interes de securitate."
  },
  passwords: {
    title: "🔓 Exploatarea parolelor",
    text: "Parolele slabe sau reutilizate permit atacatorilor să compromită rapid mai multe conturi. O singură parolă compromisă poate duce la pierderi majore de date."
  },
  attachments: {
    title: "📎 Malware și atașamente",
    text: "Atașamentele malițioase pot instala software periculos care monitorizează activitatea, fură date sau oferă acces complet atacatorului."
  },
  verify: {
    title: "🔍 Verificarea sursei",
    text: "Utilizatorul verifică expeditorul, domeniul și contextul mesajului. Accesarea directă a site-urilor oficiale este mai sigură decât folosirea linkurilor din email."
  },
  calm: {
    title: "🧘 Control emoțional",
    text: "Atacurile se bazează pe reacții impulsive. Un utilizator calm și informat reduce drastic șansele de compromitere."
  },
  "2fa": {
    title: "🔐 Autentificare în doi pași",
    text: "Autentificarea în doi pași adaugă un strat suplimentar de securitate, blocând accesul chiar și în cazul unei parole compromise."
  },
  update: {
    title: "🔄 Igienă digitală",
    text: "Actualizările regulate, parolele unice și atenția la detalii formează baza unei igiene digitale sănătoase."
  }
};

document.querySelectorAll(".info-card").forEach(card => {
  card.addEventListener("click", () => {
    const key = card.dataset.info;
    document.getElementById("infoTitle").textContent = infoData[key].title;
    document.getElementById("infoText").textContent = infoData[key].text;
    document.getElementById("infoBox").classList.remove("hidden");
    document.getElementById("infoBox").scrollIntoView({ behavior: "smooth" });
  });
});

function closeInfo() {
  document.getElementById("infoBox").classList.add("hidden");
}

const terms = document.querySelectorAll(".term");

terms.forEach(term => {
  term.addEventListener("click", () => {
    terms.forEach(t => t.classList.remove("active"));
    term.classList.add("active");
  });
});



// === Debug + Toggle robust pentru tap scurt pe mobil ===
document.addEventListener('DOMContentLoaded', () => {

  console.log("Script toggle încărcat – aștept tap-uri");

  const elements = {
    flip:  document.querySelectorAll('.flip-card'),
    hex:   document.querySelectorAll('.hex-card'),
    bubble: document.querySelectorAll('.method')
  };

  Object.keys(elements).forEach(key => {
    elements[key].forEach(el => {
      // Adăugăm listener pe CLICK – cel mai stabil pe majoritatea telefoanelor
      el.addEventListener('click', function(e) {
        e.preventDefault();           // oprește propagarea dacă e nevoie
        e.stopPropagation();

        console.log(`CLICK detectat pe ${key}:`, el);

        if (key === 'flip') {
          el.classList.toggle('flipped');
        } else if (key === 'hex') {
          el.classList.add('flipped'); // Stay flipped to show back text
        } else if (key === 'bubble') {
          el.classList.toggle('shown');
        }
      });

      // Pentru siguranță – fallback pe touchend cu delay mic
      el.addEventListener('touchend', function(e) {
        // Doar dacă nu a fost mișcare mare (evită scroll)
        if (e.changedTouches.length === 1) {
          console.log(`TOUCHEND detectat pe ${key} – simulăm click`);
          // Simulăm click după 0ms ca să treacă de event loop
          setTimeout(() => el.click(), 0);
        }
      });
    });
  });
});

