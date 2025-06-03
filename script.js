let count = 0;
let timer;

const countDisplay = document.getElementById("count");
const startBtn = document.getElementById("startBtn");
const tapBtn = document.getElementById("tapBtn");
const message = document.getElementById("message");

startBtn.addEventListener("click", () => {
  count = 0;
  countDisplay.textContent = count;
  message.textContent = "よーい、スタート！";
  tapBtn.disabled = false;
  startBtn.disabled = true;

  timer = setTimeout(() => {
    tapBtn.disabled = true;
    startBtn.disabled = false;
    message.textContent = `終了！あなたのスコアは ${count} 回！`;
  }, 10000); // 10秒
});

tapBtn.addEventListener("click", () => {
  count++;
  countDisplay.textContent = count;
});