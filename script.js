let count = 0;
let timer;
let countdownTimer;
let timeLeft = 10;

const countDisplay = document.getElementById("count");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const tapBtn = document.getElementById("tapBtn");
const showResultBtn = document.getElementById("showResultBtn");
const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const rankingList = document.getElementById("rankingList");

// ランキング読み込み
function loadRanking() {
  const scores = JSON.parse(localStorage.getItem("ranking")) || [];
  rankingList.innerHTML = "";
  scores.forEach((score, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}位：${score} 回`;
    rankingList.appendChild(li);
  });

  if (scores.length > 0) {
    resetBtn.style.display = "block";
  } else {
    resetBtn.style.display = "none";
  }
}

// ランキング更新
function updateRanking(newScore) {
  let scores = JSON.parse(localStorage.getItem("ranking")) || [];
  scores.push(newScore);
  scores.sort((a, b) => b - a);
  scores = scores.slice(0, 3);
  localStorage.setItem("ranking", JSON.stringify(scores));
  loadRanking();
}

// カウントダウン開始
function startCountdown() {
  timeLeft = 10;
  timerDisplay.textContent = `残り：${timeLeft}秒`;

  countdownTimer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `残り：${timeLeft}秒`;
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  count = 0;
  countDisplay.textContent = count;
  message.textContent = "スタート！";
  tapBtn.disabled = false;
  tapBtn.style.display = "inline-block";
  startBtn.style.display = "none";
  showResultBtn.style.display = "none";
  restartBtn.style.display = "none";

  startCountdown();

  timer = setTimeout(() => {
    tapBtn.disabled = true;
    message.textContent = "終了！";

    // 3秒後に「結果を表示」ボタン
    setTimeout(() => {
      showResultBtn.style.display = "inline-block";
    }, 3000);
  }, 10000);
});

tapBtn.addEventListener("click", () => {
  count++;
  countDisplay.textContent = count;
});

showResultBtn.addEventListener("click", () => {
  message.textContent = `スコアは ${count} 回！`;
  updateRanking(count);
  showResultBtn.style.display = "none";

  // 3秒後に「再スタート」ボタン表示
  setTimeout(() => {
    restartBtn.style.display = "inline-block";
  }, 3000);
});

restartBtn.addEventListener("click", () => {
  location.reload(); // ページリロードでリセット
});

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("ranking");
  loadRanking();
  message.textContent = "記録をリセットしました。";
});

loadRanking();