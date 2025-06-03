let count = 0;
let timer = 10;
let interval;
let resultShown = false;

const startBtn = document.getElementById("startBtn");
const tapBtn = document.getElementById("tapBtn");
const showResultBtn = document.getElementById("showResultBtn");
const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetBtn");
const countDisplay = document.getElementById("count");
const timerDisplay = document.getElementById("timer");
const message = document.getElementById("message");
const rankingList = document.getElementById("rankingList");
const recordSection = document.getElementById("recordSection");

function loadRanking() {
  const scores = JSON.parse(localStorage.getItem("ranking")) || [];
  rankingList.innerHTML = "";
  scores.forEach((score, index) => {
    const li = document.createElement("li");
    li.textContent = `${["1位", "2位", "3位"][index]}：${score} 回`;
    rankingList.appendChild(li);
  });

  if (scores.length > 0) {
    recordSection.style.display = "block";
    resetBtn.style.display = "block";
  }
}

function updateRanking(newScore) {
  let scores = JSON.parse(localStorage.getItem("ranking")) || [];
  scores.push(newScore);
  scores.sort((a, b) => b - a);
  scores = scores.slice(0, 3);
  localStorage.setItem("ranking", JSON.stringify(scores));
  loadRanking();
}

function resetApp() {
  count = 0;
  timer = 10;
  countDisplay.textContent = "0";
  timerDisplay.textContent = "準備中...";
  message.textContent = "";
  startBtn.style.display = "block";
  tapBtn.style.display = "none";
  showResultBtn.style.display = "none";
  restartBtn.style.display = "none";
  tapBtn.disabled = false;
  tapBtn.style.backgroundColor = "#03a9f4";
}

startBtn.addEventListener("click", () => {
  count = 0;
  countDisplay.textContent = count;
  timer = 10;
  startBtn.style.display = "none";
  tapBtn.style.display = "block";
  showResultBtn.style.display = "none";
  restartBtn.style.display = "none";
  message.textContent = "";

  interval = setInterval(() => {
    timer--;
    timerDisplay.textContent = `残り ${timer} 秒`;
    if (timer <= 0) {
      clearInterval(interval);
      tapBtn.disabled = true;
      tapBtn.style.backgroundColor = "#777";
      timerDisplay.textContent = "終了！";
      setTimeout(() => {
        showResultBtn.style.display = "block";
      }, 2000);
    }
  }, 1000);
});

tapBtn.addEventListener("click", () => {
  count++;
  countDisplay.textContent = count;
});

showResultBtn.addEventListener("click", () => {
  message.textContent = `あなたの記録は ${count} 回です！`;
  showResultBtn.style.display = "none";
  updateRanking(count); // ← 結果表示でランキングを更新

  setTimeout(() => {
    restartBtn.style.display = "block";
  }, 2000);
});

restartBtn.addEventListener("click", () => {
  resetApp();
});

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("ranking");
  rankingList.innerHTML = "";
  recordSection.style.display = "none";
  resetBtn.style.display = "none";
});

// 初回読み込み時にランキング表示
loadRanking();