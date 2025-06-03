let count = 0;
let timer;
let countdownTimer;
let timeLeft = 10;

const countDisplay = document.getElementById("count");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const tapBtn = document.getElementById("tapBtn");
const message = document.getElementById("message");
const rankingList = document.getElementById("rankingList");

// ランキング読み込み（前のままでOK）
function loadRanking() {
  const scores = JSON.parse(localStorage.getItem("ranking")) || [];
  rankingList.innerHTML = "";
  scores.forEach((score, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}位：${score} 回`;
    rankingList.appendChild(li);
  });
}

function updateRanking(newScore) {
  let scores = JSON.parse(localStorage.getItem("ranking")) || [];
  scores.push(newScore);
  scores.sort((a, b) => b - a);
  scores = scores.slice(0, 3);
  localStorage.setItem("ranking", JSON.stringify(scores));
}

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
  message.textContent = "よーい、スタート！";
  tapBtn.disabled = false;
  startBtn.disabled = true;
  timerDisplay.textContent = `残り：10秒`;

  startCountdown();

  timer = setTimeout(() => {
    tapBtn.disabled = true;
    startBtn.disabled = false;
    message.textContent = `終了！あなたのスコアは ${count} 回！`;
    updateRanking(count);
    loadRanking();
  }, 10000);
});

tapBtn.addEventListener("click", () => {
  count++;
  countDisplay.textContent = count;
});

loadRanking();