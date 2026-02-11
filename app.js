const handOptions = {
  top: [
    { label: "ハイカード", points: 0 },
    { label: "ワンペア 66", points: 1 },
    { label: "ワンペア 77", points: 2 },
    { label: "ワンペア 88", points: 3 },
    { label: "ワンペア 99", points: 4 },
    { label: "ワンペア TT", points: 5 },
    { label: "ワンペア JJ", points: 6 },
    { label: "ワンペア QQ", points: 7 },
    { label: "ワンペア KK", points: 8 },
    { label: "ワンペア AA", points: 9 },
    { label: "トリップス 222", points: 10 },
    { label: "トリップス 333", points: 11 },
    { label: "トリップス 444", points: 12 },
    { label: "トリップス 555", points: 13 },
    { label: "トリップス 666", points: 14 },
    { label: "トリップス 777", points: 15 },
    { label: "トリップス 888", points: 16 },
    { label: "トリップス 999", points: 17 },
    { label: "トリップス TTT", points: 18 },
    { label: "トリップス JJJ", points: 19 },
    { label: "トリップス QQQ", points: 20 },
    { label: "トリップス KKK", points: 21 },
    { label: "トリップス AAA", points: 22 }
  ],
  middle: [
    { label: "ハイカード", points: 0 },
    { label: "ワンペア", points: 0 },
    { label: "ツーペア", points: 0 },
    { label: "トリップス", points: 2 },
    { label: "ストレート", points: 4 },
    { label: "フラッシュ", points: 8 },
    { label: "フルハウス", points: 12 },
    { label: "フォーカード", points: 20 },
    { label: "ストレートフラッシュ", points: 30 },
    { label: "ロイヤルフラッシュ", points: 50 },
    { label: "ファイブカード", points: 100 }
  ],
  bottom: [
    { label: "ハイカード", points: 0 },
    { label: "ワンペア", points: 0 },
    { label: "ツーペア", points: 0 },
    { label: "スリーカード", points: 0 },
    { label: "ストレート", points: 2 },
    { label: "フラッシュ", points: 4 },
    { label: "フルハウス", points: 6 },
    { label: "フォーカード", points: 10 },
    { label: "ストレートフラッシュ", points: 15 },
    { label: "ロイヤルフラッシュ", points: 25 },
    { label: "ファイブカード", points: 50 }
  ]
};

const selects = {
  top: document.getElementById("topSelect"),
  middle: document.getElementById("middleSelect"),
  bottom: document.getElementById("bottomSelect")
};

const setupView = document.getElementById("setupView");
const resultView = document.getElementById("resultView");
const breakdownRow = document.getElementById("breakdownRow");
const totalScoreEl = document.getElementById("totalScore");
const totalUnitEl = document.getElementById("totalUnit");
const toastEl = document.getElementById("toast");
const markBustInputBtn = document.getElementById("markBustInput");
const resetAllBottomBtn = document.getElementById("resetAllBottom");

function renderOptions() {
  Object.entries(selects).forEach(([key, select]) => {
    select.innerHTML = "";
    handOptions[key].forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt.points;
      option.textContent = `${opt.label} (+${opt.points})`;
      select.appendChild(option);
    });
  });
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.remove("hidden");
  setTimeout(() => toastEl.classList.add("hidden"), 2400);
}

function showResultView() {
  setupView.classList.add("hidden");
  resultView.classList.remove("hidden");
}

function showSetupView() {
  resultView.classList.add("hidden");
  setupView.classList.remove("hidden");
}

function updateBreakdown(breakdown, isBust = false) {
  breakdownRow.innerHTML = "";
  if (isBust) {
    const badge = document.createElement("span");
    badge.className = "badge danger";
    badge.textContent = "バースト";
    breakdownRow.appendChild(badge);
    return;
  }

  breakdown.forEach((item) => {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.innerHTML = `<span>${item.name}</span><span class="points">+${item.points}</span>`;
    breakdownRow.appendChild(badge);
  });
}

function setTotalDisplay(value, isBust = false) {
  totalScoreEl.textContent = isBust ? "バースト" : value;
  totalUnitEl.textContent = isBust ? "" : "pt";
}

function calculateTotal() {
  const breakdown = [
    { name: "上段", points: Number(selects.top.value) },
    { name: "中段", points: Number(selects.middle.value) },
    { name: "下段", points: Number(selects.bottom.value) }
  ];
  const total = breakdown.reduce((sum, item) => sum + item.points, 0);
  updateBreakdown(breakdown);
  setTotalDisplay(total);
}

function resetAll() {
  Object.values(selects).forEach((select) => (select.selectedIndex = 0));
  setTotalDisplay(0);
  breakdownRow.innerHTML = "";
  showToast("入力をリセットしました。");
  showSetupView();
}

function markBust() {
  updateBreakdown([], true);
  setTotalDisplay(0, true);
  showResultView();
  showToast("バースト扱いにしました。");
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // no-op: registration failure can be ignored for now
    });
  }
}

document.getElementById("handForm").addEventListener("submit", (e) => {
  e.preventDefault();
  calculateTotal();
  showResultView();
});

document.getElementById("editChoices").addEventListener("click", showSetupView);
document.getElementById("resetAll").addEventListener("click", resetAll);
resetAllBottomBtn.addEventListener("click", resetAll);
markBustInputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  markBust();
});

renderOptions();
registerServiceWorker();

