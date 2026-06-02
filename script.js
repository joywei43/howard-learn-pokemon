const TOTAL_QUESTIONS = 10;

/**
 * 屬性資料
 * 使用原創簡化符號，不使用官方圖示。
 */
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

/**
 * 官方屬性邏輯：
 * 攻擊方 → 防守方
 * 2 = 效果很好
 * 0.5 = 效果不好
 * 0 = 沒有效果
 * 未列出 = 普通 1x
 */
const chart = {
  normal: {
    rock: 0.5,
    ghost: 0,
    steel: 0.5
  },

  fire: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 2,
    bug: 2,
    rock: 0.5,
    dragon: 0.5,
    steel: 2
  },

  water: {
    fire: 2,
    water: 0.5,
    grass: 0.5,
    ground: 2,
    rock: 2,
    dragon: 0.5
  },

  electric: {
    water: 2,
    electric: 0.5,
    grass: 0.5,
    ground: 0,
    flying: 2,
    dragon: 0.5
  },

  grass: {
    fire: 0.5,
    water: 2,
    grass: 0.5,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    bug: 0.5,
    rock: 2,
    dragon: 0.5,
    steel: 0.5
  },

  ice: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 0.5,
    ground: 2,
    flying: 2,
    dragon: 2,
    steel: 0.5
  },

  fighting: {
    normal: 2,
    ice: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    ghost: 0,
    dark: 2,
    steel: 2,
    fairy: 0.5
  },

  poison: {
    grass: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
    fairy: 2
  },

  ground: {
    fire: 2,
    electric: 2,
    grass: 0.5,
    poison: 2,
    flying: 0,
    bug: 0.5,
    rock: 2,
    steel: 2
  },

  flying: {
    electric: 0.5,
    grass: 2,
    fighting: 2,
    bug: 2,
    rock: 0.5,
    steel: 0.5
  },

  psychic: {
    fighting: 2,
    poison: 2,
    psychic: 0.5,
    dark: 0,
    steel: 0.5
  },

  bug: {
    fire: 0.5,
    grass: 2,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    psychic: 2,
    ghost: 0.5,
    dark: 2,
    steel: 0.5,
    fairy: 0.5
  },

  rock: {
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    flying: 2,
    bug: 2,
    steel: 0.5
  },

  ghost: {
    normal: 0,
    psychic: 2,
    ghost: 2,
    dark: 0.5
  },

  dragon: {
    dragon: 2,
    steel: 0.5,
    fairy: 0
  },

  dark: {
    fighting: 0.5,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
    fairy: 0.5
  },

  steel: {
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    ice: 2,
    rock: 2,
    steel: 0.5,
    fairy: 2
  },

  fairy: {
    fire: 0.5,
    fighting: 2,
    poison: 0.5,
    dragon: 2,
    dark: 2,
    steel: 0.5
  }
};

/**
 * 大師試煉：雙屬性池
 * 用比較常見 / 合理的雙屬性組合，避免亂湊。
 */
const dualTypePool = [
  ["normal", "flying"],
  ["normal", "fairy"],

  ["fire", "flying"],
  ["fire", "dragon"],
  ["fire", "fighting"],
  ["fire", "rock"],
  ["fire", "steel"],

  ["water", "ground"],
  ["water", "flying"],
  ["water", "dragon"],
  ["water", "fairy"],
  ["water", "rock"],
  ["water", "ice"],
  ["water", "poison"],

  ["grass", "poison"],
  ["grass", "flying"],
  ["grass", "dragon"],
  ["grass", "ground"],
  ["grass", "fairy"],
  ["grass", "steel"],

  ["electric", "flying"],
  ["electric", "steel"],
  ["electric", "ghost"],
  ["electric", "fairy"],

  ["ice", "psychic"],
  ["ice", "ground"],
  ["ice", "flying"],
  ["ice", "water"],

  ["fighting", "steel"],
  ["fighting", "psychic"],
  ["fighting", "dark"],
  ["fighting", "flying"],

  ["poison", "dark"],
  ["poison", "flying"],
  ["poison", "ground"],
  ["poison", "ghost"],
  ["poison", "fairy"],

  ["ground", "flying"],
  ["ground", "dragon"],
  ["ground", "rock"],
  ["ground", "steel"],

  ["flying", "dragon"],
  ["flying", "steel"],
  ["flying", "dark"],

  ["psychic", "fairy"],
  ["psychic", "fighting"],
  ["psychic", "steel"],
  ["psychic", "flying"],

  ["bug", "flying"],
  ["bug", "steel"],
  ["bug", "poison"],
  ["bug", "rock"],
  ["bug", "grass"],

  ["rock", "ground"],
  ["rock", "water"],
  ["rock", "flying"],
  ["rock", "dark"],

  ["ghost", "poison"],
  ["ghost", "dark"],
  ["ghost", "fire"],
  ["ghost", "grass"],

  ["dragon", "flying"],
  ["dragon", "ground"],
  ["dragon", "water"],
  ["dragon", "fire"],

  ["dark", "flying"],
  ["dark", "ghost"],
  ["dark", "steel"],
  ["dark", "dragon"],

  ["steel", "fairy"],
  ["steel", "psychic"],
  ["steel", "flying"],
  ["steel", "dragon"],

  ["fairy", "flying"],
  ["fairy", "psychic"]
];

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

const effectVoice = {
  4: "四倍",
  2: "兩倍",
  1: "一倍",
  0.5: "零點五倍",
  0.25: "零點二五倍",
  0: "零倍"
};

let state = {
  level: "beginner",
  lastLevel: "beginner",
  questionIndex: 0,
  score: 0,
  combo: 0,
  bestCombo: 0,
  correct: 0,
  currentQuestion: null,
  wrongAnswers: [],
  voiceEnabled: true,
  voiceRate: 0.95,
  attemptsOnCurrentQuestion: 0,
  firstWrongAnswer: null
};

const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  injectV3Styles();
  removeTrainerElements();
  renderTopRibbon();
  bindEvents();
  renderChartButtons();

  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
});

/**
 * V3 動態樣式
 * 不需要改 style.css，這裡會自動注入動畫。
 */
function injectV3Styles() {
  if ($("v3DynamicStyle")) return;

  const style = document.createElement("style");
  style.id = "v3DynamicStyle";
  style.textContent = `
    .correct-burst::after {
      content: "✨ 🎉 ⭐ ✨ 🎉 ⭐";
      position: fixed;
      left: 50%;
      top: 18%;
      transform: translateX(-50%);
      font-size: 2.1rem;
      z-index: 9999;
      animation: burstPop 0.85s ease forwards;
      pointer-events: none;
      white-space: nowrap;
    }

    @keyframes burstPop {
      0% {
        opacity: 0;
        transform: translateX(-50%) scale(0.6) translateY(20px);
      }
      40% {
        opacity: 1;
        transform: translateX(-50%) scale(1.18) translateY(0);
      }
      100% {
        opacity: 0;
        transform: translateX(-50%) scale(1) translateY(-34px);
      }
    }

    .wrong-shake {
      animation: wrongShake 0.45s ease;
    }

    @keyframes wrongShake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-10px); }
      40% { transform: translateX(10px); }
      60% { transform: translateX(-7px); }
      80% { transform: translateX(7px); }
    }

    .question-pop {
      animation: questionPop 0.45s ease;
    }

    @keyframes questionPop {
      0% {
        opacity: 0.45;
        transform: translateY(14px) scale(0.97);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .type-pulse {
      animation: typePulse 0.55s ease;
    }

    @keyframes typePulse {
      0% { transform: scale(1); }
      45% { transform: scale(1.12); }
      100% { transform: scale(1); }
    }

    .answer-btn.disabled {
      opacity: 0.42;
      pointer-events: none;
      filter: grayscale(0.25);
    }

    .answer-btn.correct-glow {
      outline: 5px solid rgba(34, 197, 94, 0.35);
      box-shadow: 0 0 0 8px rgba(34, 197, 94, 0.12), 0 12px 22px rgba(34, 197, 94, 0.25);
    }

    .answer-btn.wrong-flash {
      animation: wrongFlash 0.35s ease;
      filter: grayscale(0.35);
      opacity: 0.5;
    }

    @keyframes wrongFlash {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-6px); }
      75% { transform: translateX(6px); }
    }

    .retry-panel {
      margin-top: 16px;
      padding: 16px;
      border-radius: 18px;
      background: #fff7ed;
      border: 1px solid #fed7aa;
      text-align: center;
    }

    .retry-panel p {
      margin: 0;
      font-weight: 900;
      color: #9a3412;
      line-height: 1.6;
    }

    .retry-actions {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 12px;
    }

    .hidden {
      display: none !important;
    }

    .question-card.retrying {
      border-color: #fed7aa;
      box-shadow: 0 12px 30px rgba(249, 115, 22, 0.18);
    }

    .explain-line {
      margin: 6px 0;
    }

    .formula-box {
      margin-top: 12px;
      padding: 12px;
      border-radius: 14px;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      font-weight: 900;
    }
  `;

  document.head.appendChild(style);
}

/**
 * 刪除舊版訓練家路線元素
 */
function removeTrainerElements() {
  document.querySelectorAll(
    ".trainer-section, .trainer-track-wrap, #trainerTrack, #trainerIcon, #trainerMood, #trainerHint"
  ).forEach((el) => el.remove());

  ensureRetryPanel();
}

/**
 * 保留「再試一次」區塊
 */
function ensureRetryPanel() {
  const questionCard = document.querySelector(".question-card");
  const answerOptions = $("answerOptions");

  if (questionCard && answerOptions && !$("retryPanel")) {
    const retryPanel = document.createElement("div");
    retryPanel.id = "retryPanel";
    retryPanel.className = "retry-panel hidden";
    retryPanel.innerHTML = `
      <p id="retryText">差一點，再試一次！</p>
      <div class="retry-actions">
        <button id="retryBtn" class="secondary-btn">再試一次</button>
        <button id="showAnswerBtn" class="primary-btn">看答案</button>
      </div>
    `;

    answerOptions.insertAdjacentElement("afterend", retryPanel);
  }
}

function bindEvents() {
  document.querySelectorAll(".level-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      startGame(btn.dataset.level);
    });
  });

  $("backHomeBtn")?.addEventListener("click", goHome);
  $("resultHomeBtn")?.addEventListener("click", goHome);
  $("playAgainBtn")?.addEventListener("click", () => startGame(state.lastLevel));
  $("nextQuestionBtn")?.addEventListener("click", nextQuestion);

  $("openChartBtn")?.addEventListener("click", () => openChart());
  $("chartFromFeedbackBtn")?.addEventListener("click", () => {
    openChart(state.currentQuestion?.attack || "fire");
  });
  $("closeChartBtn")?.addEventListener("click", closeChart);

  $("voiceToggle")?.addEventListener("click", () => {
    state.voiceEnabled = !state.voiceEnabled;
    $("voiceToggle").textContent = state.voiceEnabled ? "🔊 語音：開" : "🔇 語音：關";

    if (!state.voiceEnabled) {
      cancelSpeech();
    }
  });

  $("voiceSpeed")?.addEventListener("change", (e) => {
    state.voiceRate = Number(e.target.value);
  });

  $("retryBtn")?.addEventListener("click", () => {
    hideRetryPanel();
    setQuestionRetrying(false);
    enableAnswerButtons();
    speak("再試一次看看。");
  });

  $("showAnswerBtn")?.addEventListener("click", () => {
    revealAnswerAfterWrong();
  });
}

function renderTopRibbon() {
  const ribbon = $("topTypeRibbon");
  if (!ribbon) return;

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

  $(screenId)?.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startGame(level) {
  cancelSpeech();

  state.level = level;
  state.lastLevel = level;
  state.questionIndex = 0;
  state.score = 0;
  state.combo = 0;
  state.bestCombo = 0;
  state.correct = 0;
  state.wrongAnswers = [];
  state.attemptsOnCurrentQuestion = 0;
  state.firstWrongAnswer = null;

  if ($("totalQuestions")) $("totalQuestions").textContent = TOTAL_QUESTIONS;

  hideRetryPanel();
  setQuestionRetrying(false);

  showScreen("gameScreen");
  generateQuestion();
}

function goHome() {
  cancelSpeech();
  hideRetryPanel();
  setQuestionRetrying(false);
  showScreen("homeScreen");
}

function generateQuestion() {
  state.questionIndex += 1;
  state.attemptsOnCurrentQuestion = 0;
  state.firstWrongAnswer = null;

  hideRetryPanel();
  setQuestionRetrying(false);
  enableAnswerButtons();

  if ($("currentQuestion")) $("currentQuestion").textContent = state.questionIndex;
  if ($("scoreText")) $("scoreText").textContent = state.score;
  if ($("comboText")) $("comboText").textContent = state.combo;

  let question;

  if (state.level === "master") {
    question = generateMasterQuestion();
  } else {
    question = generateSingleTypeQuestion(state.level);
  }

  state.currentQuestion = question;
  renderQuestion(question);
  playQuestionAnimation();
  speakQuestion(question);
}

function generateSingleTypeQuestion(level) {
  let attack;
  let defense;
  let effect;

  do {
    attack = randomItem(typeIds);
    defense = randomItem(typeIds);
    effect = getEffectiveness(attack, defense);
  } while (level === "beginner" && effect === 0);

  return {
    attack,
    defenses: [defense],
    effect,
    parts: [{ defense, effect }]
  };
}

function generateMasterQuestion() {
  const attack = randomItem(typeIds);
  const [def1, def2] = randomItem(dualTypePool);

  const e1 = getEffectiveness(attack, def1);
  const e2 = getEffectiveness(attack, def2);
  const finalEffect = normalizeEffect(e1 * e2);

  return {
    attack,
    defenses: [def1, def2],
    effect: finalEffect,
    parts: [
      { defense: def1, effect: e1 },
      { defense: def2, effect: e2 }
    ]
  };
}

function normalizeEffect(value) {
  if (value === 0) return 0;
  if (value === 0.25) return 0.25;
  if (value === 0.5) return 0.5;
  if (value === 1) return 1;
  if (value === 2) return 2;
  if (value === 4) return 4;
  return value;
}

function getEffectiveness(attack, defense) {
  return chart[attack]?.[defense] ?? 1;
}

function renderQuestion(question) {
  const attack = types[question.attack];
  const defenses = question.defenses.map((id) => types[id]);

  if ($("attackBadge")) {
    $("attackBadge").style.background = attack.color;
    $("attackBadge").textContent = attack.icon;
  }

  if ($("attackName")) {
    $("attackName").textContent = attack.name;
  }

  if ($("defenseBadges")) {
    $("defenseBadges").innerHTML = defenses
      .map((d) => {
        return `<div class="defense-badge" style="background:${d.color}">${d.icon}</div>`;
      })
      .join("");
  }

  if ($("defenseName")) {
    $("defenseName").textContent = defenses.map((d) => d.name).join(" + ");
  }

  const defenseText = defenses.map((d) => d.name).join(" + ");

  if ($("questionText")) {
    $("questionText").textContent = `${attack.name} 攻擊 ${defenseText}，效果如何？`;
  }

  const options = getOptionsByLevel();

  if ($("answerOptions")) {
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
        checkAnswer(Number(btn.dataset.effect), btn);
      });
    });
  }
}

function getOptionsByLevel() {
  if (state.level === "beginner") return [2, 1, 0.5];
  if (state.level === "standard") return [2, 1, 0.5, 0];
  return [4, 2, 1, 0.5, 0.25, 0];
}

/**
 * 答題邏輯：
 * 第一次答錯 → 留在原題再試一次
 * 第二次答錯 / 看答案 → 顯示解析
 * 答對 → 星星動畫 + 解析
 */
function checkAnswer(userAnswer, clickedButton = null) {
  const q = state.currentQuestion;
  if (!q) return;

  const isCorrect = userAnswer === q.effect;

  if (isCorrect) {
    const firstTryCorrect = state.attemptsOnCurrentQuestion === 0;

    state.correct += 1;

    if (firstTryCorrect) {
      state.combo += 1;
    } else {
      state.combo = 0;
    }

    state.bestCombo = Math.max(state.bestCombo, state.combo);

    let baseScore = 10;
    if (state.level === "standard") baseScore = 15;
    if (state.level === "master") baseScore = 20;

    if (firstTryCorrect) {
      state.score += baseScore + Math.min(state.combo * 2, 20);
    } else {
      state.score += Math.floor(baseScore * 0.6);
    }

    if ($("scoreText")) $("scoreText").textContent = state.score;
    if ($("comboText")) $("comboText").textContent = state.combo;

    hideRetryPanel();
    setQuestionRetrying(false);
    disableAnswerButtons();
    clickedButton?.classList.add("correct-glow");

    playCorrectAnimation();
    speak("答對了！太棒了！");

    setTimeout(() => {
      renderFeedback(true, userAnswer);
      showScreen("feedbackScreen");
    }, 850);

    return;
  }

  /**
   * 第一次答錯：不跳解析，讓小孩再試一次。
   */
  if (state.attemptsOnCurrentQuestion === 0) {
    state.attemptsOnCurrentQuestion = 1;
    state.firstWrongAnswer = userAnswer;
    state.combo = 0;

    if ($("comboText")) $("comboText").textContent = state.combo;

    clickedButton?.classList.add("wrong-flash");
    clickedButton?.classList.add("disabled");

    const attackName = types[q.attack].name;
    const defenseNames = q.defenses.map((id) => types[id].name).join(" + ");

    playWrongAnimation();
    setQuestionRetrying(true);

    showRetryPanel(
      `差一點！${attackName} 攻擊 ${defenseNames} 不是「${effectLabels[userAnswer]}」，再試一次看看。`
    );

    speak("差一點，再試一次！");
    return;
  }

  /**
   * 第二次還錯：公布答案。
   */
  playWrongAnimation();
  revealAnswerAfterWrong(userAnswer);
}

function revealAnswerAfterWrong(secondWrongAnswer = null) {
  const q = state.currentQuestion;
  if (!q) return;

  state.combo = 0;
  if ($("comboText")) $("comboText").textContent = state.combo;

  state.wrongAnswers.push({
    question: q,
    userAnswer: state.firstWrongAnswer ?? secondWrongAnswer ?? q.effect,
    secondWrongAnswer,
    correctAnswer: q.effect
  });

  hideRetryPanel();
  setQuestionRetrying(false);
  disableAnswerButtons();

  setTimeout(() => {
    renderFeedback(false, state.firstWrongAnswer ?? secondWrongAnswer ?? q.effect);
    showScreen("feedbackScreen");
  }, 450);
}

function renderFeedback(isCorrect, userAnswer) {
  const q = state.currentQuestion;
  if (!q) return;

  const attack = types[q.attack];
  const defenseNames = q.defenses.map((id) => types[id].name).join(" + ");

  if ($("feedbackTitle")) {
    $("feedbackTitle").textContent = isCorrect ? "答對了！" : "再記一次！";
  }

  if ($("feedbackIcon")) {
    $("feedbackIcon").textContent = isCorrect ? "🎉" : "😣";
  }

  if ($("feedbackMain")) {
    $("feedbackMain").textContent = `${attack.name} 攻擊 ${defenseNames} 是「${effectLabels[q.effect]}」，倍率是 ${q.effect}x。`;
  }

  let explainHtml = "";

  if (q.defenses.length === 1) {
    explainHtml = `
      <strong>解析：</strong><br>
      <div class="explain-line">
        ${attack.name} 攻擊 ${defenseNames} 的效果是 <strong>${q.effect}x</strong>。
      </div>
      <div class="explain-line">
        你的答案：${effectLabels[userAnswer]} ${userAnswer}x
      </div>
      <div class="formula-box">
        ${getSimpleReason(q.attack, q.defenses[0], q.effect)}
      </div>
    `;
  } else {
    const part1 = q.parts[0];
    const part2 = q.parts[1];

    explainHtml = `
      <strong>雙屬性解析：</strong><br>
      <div class="explain-line">
        ${attack.name} 攻擊 ${types[part1.defense].name} = <strong>${part1.effect}x</strong>
      </div>
      <div class="explain-line">
        ${attack.name} 攻擊 ${types[part2.defense].name} = <strong>${part2.effect}x</strong>
      </div>

      <div class="formula-box">
        雙屬性計算方式：${part1.effect} × ${part2.effect} = <strong>${q.effect}x</strong>
      </div>

      <div class="explain-line">
        你的答案：${effectLabels[userAnswer]} ${userAnswer}x
      </div>
    `;
  }

  if ($("feedbackExplain")) {
    $("feedbackExplain").innerHTML = explainHtml;
  }

  const speechText = isCorrect
    ? `答對了！${attack.name}攻擊${defenseNames}是${effectLabels[q.effect]}，倍率是${effectVoice[q.effect]}。`
    : `正確答案是${effectLabels[q.effect]}，倍率是${effectVoice[q.effect]}。`;

  speak(speechText);
}

function getSimpleReason(attackId, defenseId, effect) {
  const attackName = types[attackId].name;
  const defenseName = types[defenseId].name;

  if (effect === 2) {
    return `${attackName} 對 ${defenseName} 很有效，所以是 2x。`;
  }

  if (effect === 0.5) {
    return `${defenseName} 會抵抗 ${attackName} 的攻擊，所以是 0.5x。`;
  }

  if (effect === 0) {
    return `${defenseName} 可以讓 ${attackName} 的攻擊無效，所以是 0x。`;
  }

  return `${attackName} 對 ${defenseName} 沒有特別優勢或劣勢，所以是 1x。`;
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
  if ($("correctText")) $("correctText").textContent = `${state.correct} / ${TOTAL_QUESTIONS}`;
  if ($("bestComboText")) $("bestComboText").textContent = state.bestCombo;
  if ($("finalScoreText")) $("finalScoreText").textContent = state.score;

  if (!$("wrongList")) return;

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
          第一次答案：${effectLabels[item.userAnswer]} ${item.userAnswer}x<br>
          ${
            item.secondWrongAnswer !== null && item.secondWrongAnswer !== undefined
              ? `第二次答案：${effectLabels[item.secondWrongAnswer]} ${item.secondWrongAnswer}x<br>`
              : ""
          }
          正確答案：${effectLabels[item.correctAnswer]} ${item.correctAnswer}x
        </div>
      `;
    })
    .join("");
}

/**
 * 動畫
 */
function playQuestionAnimation() {
  const card = document.querySelector(".question-card");
  const attackBadge = $("attackBadge");
  const defenseBadges = document.querySelectorAll(".defense-badge");

  if (card) {
    card.classList.remove("question-pop");
    void card.offsetWidth;
    card.classList.add("question-pop");
  }

  if (attackBadge) {
    attackBadge.classList.remove("type-pulse");
    void attackBadge.offsetWidth;
    attackBadge.classList.add("type-pulse");
  }

  defenseBadges.forEach((badge) => {
    badge.classList.remove("type-pulse");
    void badge.offsetWidth;
    badge.classList.add("type-pulse");
  });
}

function playCorrectAnimation() {
  document.body.classList.remove("correct-burst");
  void document.body.offsetWidth;
  document.body.classList.add("correct-burst");

  setTimeout(() => {
    document.body.classList.remove("correct-burst");
  }, 900);
}

function playWrongAnimation() {
  const card = document.querySelector(".question-card");
  if (!card) return;

  card.classList.remove("wrong-shake");
  void card.offsetWidth;
  card.classList.add("wrong-shake");

  setTimeout(() => {
    card.classList.remove("wrong-shake");
  }, 520);
}

function hideRetryPanel() {
  $("retryPanel")?.classList.add("hidden");
}

function showRetryPanel(text) {
  if ($("retryText")) $("retryText").textContent = text;
  $("retryPanel")?.classList.remove("hidden");
}

function setQuestionRetrying(isRetrying) {
  document.querySelector(".question-card")?.classList.toggle("retrying", isRetrying);
}

function disableAnswerButtons() {
  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.classList.add("disabled");
  });
}

function enableAnswerButtons() {
  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.classList.remove("disabled", "wrong-flash", "correct-glow");
  });
}

/**
 * 相剋表
 */
function renderChartButtons() {
  const container = $("chartTypeButtons");
  if (!container) return;

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
  $("chartModal")?.classList.add("active");
  renderChartDetail(typeId);
}

function closeChart() {
  $("chartModal")?.classList.remove("active");
}

function renderChartDetail(attackId) {
  if (!$("chartDetail")) return;

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

    if (effect === 2) groups[2].push(defenseId);
    else if (effect === 0.5) groups[0.5].push(defenseId);
    else if (effect === 0) groups[0].push(defenseId);
    else groups[1].push(defenseId);
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

/**
 * 語音
 * 使用瀏覽器內建語音，透過 pitch 模擬比較像小朋友的聲音。
 * 注意：不同裝置可用聲音會不同，無法保證完全是兒童聲。
 */
function speakQuestion(question) {
  const attack = types[question.attack].name;
  const defenses = question.defenses.map((id) => types[id].name).join("加");

  if (question.defenses.length === 2) {
    speak(`${attack}屬性攻擊${defenses}雙屬性，效果如何？`);
  } else {
    speak(`${attack}屬性攻擊${defenses}屬性，效果如何？`);
  }
}

function speak(text) {
  if (!state.voiceEnabled) return;
  if (!("speechSynthesis" in window)) return;

  cancelSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-TW";

  // 模擬小朋友語氣：較高音、稍微活潑
  utterance.rate = state.voiceRate || 0.95;
  utterance.pitch = 1.45;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();

  const zhVoice =
    voices.find((v) => v.lang === "zh-TW") ||
    voices.find((v) => v.lang === "zh-HK") ||
    voices.find((v) => v.lang === "zh-CN") ||
    voices.find((v) => v.lang && v.lang.startsWith("zh"));

  if (zhVoice) {
    utterance.voice = zhVoice;
  }

  window.speechSynthesis.speak(utterance);
}

function cancelSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * 小工具
 */
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
