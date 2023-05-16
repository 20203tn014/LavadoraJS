// Obtener botones
const waterButton = document.querySelector(
  ".col-sm-2:nth-child(2) .btn.btn-info"
);
const washLevelButton = document.querySelector(
  ".col-sm-2:nth-child(3) .btn.btn-info"
);
const washTimeButton = document.querySelector(
  ".col-sm-2:nth-child(4) .btn.btn-info"
);
const rinseButton = document.querySelector(
  ".col-sm-2:nth-child(5) .btn.btn-info"
);
const powerButton = document.querySelector(
  ".col-sm-2:nth-child(1) .btn.btn-danger"
);
const startButton = document.querySelector(
  ".col-sm-2:nth-child(6) .btn.btn-success"
);

// Obtener badges
const badges = {
  water: document.querySelectorAll(".col-sm-2:nth-child(2) .badge"),
  washLevel: document.querySelectorAll(".col-sm-2:nth-child(3) .badge"),
  washTime: document.querySelectorAll(".col-sm-2:nth-child(4) .badge"),
  rinse: document.querySelectorAll(".col-sm-2:nth-child(5) .badge"),
};

// Variable para realizar el seguimiento del índice actual de cada columna
let currentIndex = {
  water: badges.water.length - 1,
  washLevel: badges.washLevel.length - 1,
  washTime: badges.washTime.length - 1,
  rinse: badges.rinse.length - 1,
};

// Lavadora encendida o apagada
let isPowerOn = false;
let buttonsDisabled = false;

// Elementos del DOM
const powerBadge = document.querySelector(".badge.bg-secondary");
const startBadge = document.querySelector(".badge.bg-secondary:last-of-type");

// Cambiar color del badge
powerButton.addEventListener("click", () => {
  isPowerOn = !isPowerOn; // Cambia estado

  if (isPowerOn) {
    // Habilita los botones
    waterButton.disabled = false;
    washLevelButton.disabled = false;
    washTimeButton.disabled = false;
    rinseButton.disabled = false;
    startButton.disabled = false;

    powerBadge.classList.remove("bg-secondary");
    powerBadge.classList.add("bg-success");
  } else {
    // Deshabilita los botones
    waterButton.disabled = true;
    washLevelButton.disabled = true;
    washTimeButton.disabled = true;
    rinseButton.disabled = true;
    startButton.disabled = true;

    // Restablecer badges
    Object.values(badges).forEach((badgeGroup) => {
      badgeGroup.forEach((badge) => {
        badge.classList.remove("bg-success");
        badge.classList.add("bg-secondary");
      });
    });
    powerBadge.classList.remove("bg-success");
    powerBadge.classList.add("bg-secondary");
    startButton.classList.remove("btn-warning");
    startButton.classList.add("btn-success");
  }
});

// Botón Lavar
startButton.addEventListener("click", () => {
  startButton.classList.toggle("btn-warning");
  buttonsDisabled = !buttonsDisabled;

  // Habilitar o deshabilitar botones
  waterButton.disabled = buttonsDisabled;
  washLevelButton.disabled = buttonsDisabled;
  washTimeButton.disabled = buttonsDisabled;
  rinseButton.disabled = buttonsDisabled;
});

// Botones
waterButton.addEventListener("click", function () {
  changeBadgeColor("water");
});

washLevelButton.addEventListener("click", function () {
  changeBadgeColor("washLevel");
});

washTimeButton.addEventListener("click", function () {
  changeBadgeColor("washTime");
});

rinseButton.addEventListener("click", function () {
  changeBadgeColor("rinse");
});

// Función para cambio de color del badge actual de la columna especificada
function changeBadgeColor(column) {
  // Restablecer badges
  badges[column].forEach(function (badge) {
    badge.classList.remove("bg-success");
    badge.classList.add("bg-secondary");
  });

  // Cambia de color del badge actual de la columna
  badges[column][currentIndex[column]].classList.remove("bg-secondary");
  badges[column][currentIndex[column]].classList.add("bg-success");

  // Decrementa del índice
  currentIndex[column] =
    (currentIndex[column] - 1 + badges[column].length) % badges[column].length;
}
