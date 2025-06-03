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
  resetBtn.style.display = "none";
  resultShown = false;
}

startBtn.addEventListener("click", () => {
  count = 0;
  countDisplay.textContent = count;
  timer = 10;
  startBtn.style.display = "none";
  tapBtn.style.display = "block";
  showResultBtn.style.display = "none";
  restartBtn.style.display = "none";
  resetBtn.style.display = "none";
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
      }, 2000); // ← ここで2秒待って結果表示ボタン出現
    }
  }, 1000);

  tapBtn.disabled = false;
  tapBtn.style.backgroundColor = "#03a9f4";
});

tapBtn.addEventListener("click", () => {
  count++;
  countDisplay.textContent = count;
});

showResultBtn.addEventListener("click", () => {
  message.textContent = `あなたの記録は ${count} 回です！`;
  showResultBtn.style.display = "none";

  setTimeout(() => {
    restartBtn.style.display = "block";
    if (!resultShown) {
      resetBtn.style.display = "block";
      resultShown = true;
    }
  }, 2000); // ← 2秒後に再スタート表示
});

restartBtn.addEventListener("click", () => {
  resetApp();
});

resetBtn.addEventListener("click", () => {
  resetApp();
});