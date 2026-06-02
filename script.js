const TOTAL_QUESTIONS = 10;

const types = {
  normal: { name: "一般", icon: "○", color: "#9CA3AF" },
  fire: { name: "火", icon: "🔥", color: "#F97316" },
  water: { name: "水", icon: "💧", color: "#2563EB" },
  grass: { name: "草", icon: "🌿", color: "#16A34A" },
  electric: { name: "電", icon: "⚡", color: "#EAB308" },
  ice: { name: "冰", icon: "❄", color: "#67E8F9" },
  fighting: { name: "格鬥", icon: "拳", color: "#DC2626" },
  poison: { name: "毒", icon: "☠", color: "#9333EA" },
  ground: { name: "地面", icon: "▲", color: "#B7791F" },
  flying: { name: "飛行", icon: "翼", color: "#0EA5E9" },
  psychic: { name: "超能力", icon: "◎", color: "#EC4899" },
  bug: { name: "蟲", icon: "🐛", color: "#65A30D" },
  rock: { name: "岩石", icon: "⬟", color: "#A16207" },
  ghost: { name: "幽靈", icon: "👻", color: "#6D5A8D" },
  dragon: { name: "龍", icon: "龍", color: "#4338CA" },
  dark: { name: "惡", icon: "☾", color: "#374151" },
  steel: { name: "鋼", icon: "⬢", color: "#64748B" },
  fairy: { name: "妖精", icon: "✦", color: "#DB5793" }
};

const typeIds = Object.keys(types);

const chart = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 }
};

const effectLabels = {
  4: "超有效",
  2: "效果很好",
  1: "普通",
  0.5: "效果不好",
  0.25: "效果很差",
  0: "沒有效果"
};

const effectColors = {
  4: "#EF4444",
  2: "#F97316",
  1: "#2563EB",
  0.5: "#22C55E",
  0.25: "#8B5CF6",
  0: "#4C1D95"
};

let state = {
  level: "beginner",
  questionIndex: 0,
  score: 0,
  combo: 0,
  bestCombo: 0,
  correct: 0,
  currentQuestion: null,
  wrongAnswers: [],
  voiceEnabled: true,
  voiceRate: 0.9
};

const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  renderTopRibbon();
  bindEvents();
  renderChartButtons();
});

function bindEvents() {
  document.querySelectorAll(".level-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      startGame(btn.dataset.level);
    });
  });

  $("backHomeBtn").addEventListener("click", goHome);
  $("resultHomeBtn").addEventListener("click", goHome);
  $("playAgainBtn").addEventListener("click", () => startGame(state.level));
  $("nextQuestionBtn").addEventListener("click", nextQuestion);

  $("openChartBtn").addEventListener("click", () => openChart());
  $("chartFromFeedbackBtn").addEventListener("click", () => openChart(state.currentQuestion.attack));
  $("closeChartBtn").addEventListener("click", closeChart);

  $("voiceToggle").addEventListener("click", () => {
    state.voiceEnabled = !state.voiceEnabled;
    $("voiceToggle").textContent = state.voiceEnabled ? "🔊 語音：開" : "🔇 語音：關";
    if (!state.voiceEnabled) window.speechSynthesis.cancel();
  });

  $("voiceSpeed").addEventListener("change", (e) => {
    state.voiceRate = Number(e.target.value);
  });
}

function renderTopRibbon() {
  const ribbon = $("topTypeRibbon");
  ribbon.innerHTML = typeIds
    .map((id) => {
      const t = types[id];
      return `<div class="mini-type" style="background:${t.color}" title="${t.name}">${t.icon}</div>`;
    })
    .join("");
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });
  $(screenId).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startGame(level) {
  window.speechSynthesis.cancel();

  state.level = level;
  state.questionIndex = 0;
  state.score = 0;
  state.combo = 0;
  state.bestCombo = 0;
  state.correct = 0;
  state.wrongAnswers = [];

  $("totalQuestions").textContent = TOTAL_QUESTIONS;

  showScreen("gameScreen");
  generateQuestion();
}

function goHome() {
  window.speechSynthesis.cancel();
  showScreen("homeScreen");
}

function generateQuestion() {
  state.questionIndex += 1;
  $("currentQuestion").textContent = state.questionIndex;
  $("scoreText").textContent = state.score;
  $("comboText").textContent = state.combo;

  let question;

  if (state.level === "master") {
    question = generateMasterQuestion();
  } else {
    question = generateSingleTypeQuestion(state.level);
  }

  state.currentQuestion = question;
  renderQuestion(question);
  speakQuestion(question);
}

function generateSingleTypeQuestion(level) {
  let attack, defense, effect;

  do {
    attack = randomItem(typeIds);
    defense = randomItem(typeIds);
    effect = getEffectiveness(attack, defense);
  } while (level === "beginner" && effect === 0);

  return {
    attack,
    defenses: [defense],
    effect
  };
}

function generateMasterQuestion() {
  const attack = randomItem(typeIds);
  let def1 = randomItem(typeIds);
  let def2 = randomItem(typeIds);

  while (def2 === def1) {
    def2 = randomItem(typeIds);
  }

  const e1 = getEffectiveness(attack, def1);
  const e2 = getEffectiveness(attack, def2);

  return {
    attack,
    defenses: [def1, def2],
    effect: e1 * e2,
    parts: [
      { defense: def1, effect: e1 },
      { defense: def2, effect: e2 }
    ]
  };
}

function getEffectiveness(attack, defense) {
  return chart[attack]?.[defense] ?? 1;
}

function renderQuestion(question) {
  const attack = types[question.attack];
  const defenses = question.defenses.map((id) => types[id]);

  $("attackBadge").style.background = attack.color;
  $("attackBadge").textContent = attack.icon;
  $("attackName").textContent = attack.name;

  $("defenseBadges").innerHTML = defenses
    .map((d) => {
      return `<div class="defense-badge" style="background:${d.color}">${d.icon}</div>`;
    })
    .join("");

  $("defenseName").textContent = defenses.map((d) => d.name).join(" + ");

  $("questionText").textContent = `${attack.name} 攻擊 ${defenses.map((d) => d.name).join(" + ")}，效果如何？`;

  const options = getOptionsByLevel();
  $("answerOptions").innerHTML = options
    .map((value) => {
      return `
        <button class="answer-btn" style="background:${effectColors[value]}" data-effect="${value}">
          ${effectLabels[value]}<br>
          ${value}x
        </button>
      `;
    })
    .join("");

  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      checkAnswer(Number(btn.dataset.effect));
    });
  });
}

function getOptionsByLevel() {
  if (state.level === "beginner") return [2, 1, 0.5];
  if (state.level === "standard") return [2, 1, 0.5, 0];
  return [4, 2, 1, 0.5, 0.25, 0];
}

function checkAnswer(userAnswer) {
  const q = state.currentQuestion;
  const isCorrect = userAnswer === q.effect;

  if (isCorrect) {
    state.correct += 1;
    state.combo += 1;
    state.bestCombo = Math.max(state.bestCombo, state.combo);

    let baseScore = 10;
    if (state.level === "standard") baseScore = 15;
    if (state.level === "master") baseScore = 20;

    state.score += baseScore + Math.min(state.combo * 2, 20);
  } else {
    state.combo = 0;
    state.wrongAnswers.push({
      question: q,
      userAnswer,
      correctAnswer: q.effect
    });
  }

  renderFeedback(isCorrect, userAnswer);
  showScreen("feedbackScreen");
}

function renderFeedback(isCorrect, userAnswer) {
  const q = state.currentQuestion;
  const attack = types[q.attack];
  const defenseNames = q.defenses.map((id) => types[id].name).join(" + ");

  $("feedbackTitle").textContent = isCorrect ? "答對了！" : "差一點！";
  $("feedbackIcon").textContent = isCorrect ? "🎉" : "💪";

  $("feedbackMain").textContent = `${attack.name} 攻擊 ${defenseNames} 是「${effectLabels[q.effect]}」，倍率是 ${q.effect}x。`;

  let explainHtml = "";

  if (q.defenses.length === 1) {
    explainHtml = `
      <strong>解析：</strong><br>
      ${attack.name} 對 ${defenseNames} 的效果是 ${q.effect}x。<br>
      你的答案：${effectLabels[userAnswer]} ${userAnswer}x
    `;
  } else {
    explainHtml = `
      <strong>雙屬性解析：</strong><br>
      ${q.parts
        .map((part) => {
          return `${attack.name} 攻擊 ${types[part.defense].name} = ${part.effect}x`;
        })
        .join("<br>")}
      <br><br>
      所以總效果是：
      ${q.parts.map((p) => p.effect).join(" × ")} = <strong>${q.effect}x</strong><br>
      你的答案：${effectLabels[userAnswer]} ${userAnswer}x
    `;
  }

  $("feedbackExplain").innerHTML = explainHtml;

  const speechText = isCorrect
    ? `答對了！${attack.name}攻擊${defenseNames}是${effectLabels[q.effect]}，倍率是${speakMultiplier(q.effect)}。`
    : `差一點！正確答案是${effectLabels[q.effect]}，倍率是${speakMultiplier(q.effect)}。`;

  speak(speechText);
}

function nextQuestion() {
  if (state.questionIndex >= TOTAL_QUESTIONS) {
    renderResult();
    showScreen("resultScreen");
    speak(`挑戰完成！你答對${state.correct}題，總分${state.score}分。`);
  } else {
    showScreen("gameScreen");
    generateQuestion();
  }
}

function renderResult() {
  $("correctText").textContent = `${state.correct} / ${TOTAL_QUESTIONS}`;
  $("bestComboText").textContent = state.bestCombo;
  $("finalScoreText").textContent = state.score;

  if (state.wrongAnswers.length === 0) {
    $("wrongList").innerHTML = `<div class="no-wrong">太棒了！這次沒有錯題 🎉</div>`;
    return;
  }

  $("wrongList").innerHTML = state.wrongAnswers
    .map((item) => {
      const q = item.question;
      const attack = types[q.attack].name;
      const defenses = q.defenses.map((id) => types[id].name).join(" + ");

      return `
        <div class="wrong-item">
          <strong>${attack} → ${defenses}</strong><br>
          你的答案：${effectLabels[item.userAnswer]} ${item.userAnswer}x<br>
          正確答案：${effectLabels[item.correctAnswer]} ${item.correctAnswer}x
        </div>
      `;
    })
    .join("");
}

function renderChartButtons() {
  const container = $("chartTypeButtons");

  container.innerHTML = typeIds
    .map((id) => {
      const t = types[id];
      return `
        <button class="chart-type-btn" data-type="${id}" style="background:${t.color}">
          ${t.icon} ${t.name}
        </button>
      `;
    })
    .join("");

  document.querySelectorAll(".chart-type-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      renderChartDetail(btn.dataset.type);
    });
  });

  renderChartDetail("fire");
}

function openChart(typeId = "fire") {
  $("chartModal").classList.add("active");
  renderChartDetail(typeId);
}

function closeChart() {
  $("chartModal").classList.remove("active");
}

function renderChartDetail(attackId) {
  document.querySelectorAll(".chart-type-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.type === attackId);
  });

  const attack = types[attackId];

  const groups = {
    2: [],
    0.5: [],
    0: [],
    1: []
  };

  typeIds.forEach((defenseId) => {
    const effect = getEffectiveness(attackId, defenseId);
    if (groups[effect]) {
      groups[effect].push(defenseId);
    } else {
      groups[1].push(defenseId);
    }
  });

  $("chartDetail").innerHTML = `
    <h2>
      <span class="type-chip" style="background:${attack.color}">
        ${attack.icon} ${attack.name}
      </span>
      的攻擊
    </h2>

    ${renderChartRow("效果很好（2x）", groups[2])}
    ${renderChartRow("效果不好（0.5x）", groups[0.5])}
    ${renderChartRow("沒有效果（0x）", groups[0])}
    ${renderChartRow("普通（1x）", groups[1])}
  `;
}

function renderChartRow(title, ids) {
  const chips = ids.length
    ? ids
        .map((id) => {
          const t = types[id];
          return `<span class="type-chip" style="background:${t.color}">${t.icon} ${t.name}</span>`;
        })
        .join("")
    : `<span class="type-chip" style="background:#94a3b8">無</span>`;

  return `
    <div class="chart-row">
      <h3>${title}</h3>
      <div class="chip-list">${chips}</div>
    </div>
  `;
}

function speakQuestion(question) {
  const attack = types[question.attack].name;
  const defenses = question.defenses.map((id) => types[id].name).join("加");
  speak(`${attack}屬性攻擊${defenses}屬性，效果如何？`);
}

function speak(text) {
  if (!state.voiceEnabled) return;
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-TW";
  utterance.rate = state.voiceRate;
  utterance.pitch = 1.05;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
}

function speakMultiplier(value) {
  const map = {
    4: "四倍",
    2: "兩倍",
    1: "一倍",
    0.5: "零點五倍",
    0.25: "零點二五倍",
    0: "零倍"
  };

  return map[value] || `${value}倍`;
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
