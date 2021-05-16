import { Howl } from "howler";

const turret = document.querySelector(".turret");
const leftPart = document.querySelector(".body-container .left.part");
const rightPart = document.querySelector(".body-container .right.part");
const iris = document.querySelector(".iris");
const sounds = {
  turretFire: new Howl({
    src: ["turret-fire.ogg"],
    loop: true
  }),
  turretHola: new Howl({
    src: ["turret-hola.mp3"]
  }),
  turretHayAlguienAhi: new Howl({
    src: ["turret-hay-alguien-ahi.mp3"]
  }),
  turretHoraDeLaSiesta: new Howl({
    src: ["turret-hora-de-la-siesta.mp3"]
  }),
  turretModoSiestaActivo: new Howl({
    src: ["turret-modo-siesta-activo.mp3"]
  }),
  fxDespliegue: new Howl({
    src: ["turret-fx-despliegue.mp3"]
  }),
  fxCierre: new Howl({
    src: ["turret-cierre.mp3"]
  })
};

const checkTurret = () => {
  const isLeftOpen = leftPart.classList.contains("open");
  const isRightOpen = rightPart.classList.contains("open");

  if (isLeftOpen && isRightOpen) {
    sounds.fxDespliegue.play();
    sounds.turretHola.play();
    setTimeout(() => sounds.turretHayAlguienAhi.play(), 1000);
  }

  if (!isLeftOpen && !isRightOpen) {
    sounds.fxCierre.play();
    const r = ~~(Math.random() * 2);
    if (r === 0) { sounds.turretHoraDeLaSiesta.play(); } else { sounds.turretModoSiestaActivo.play(); }
  }
};

document.body.addEventListener("click", (ev) => {
  if (ev.detail === 2 || ev.detail === 1) {
    leftPart.classList.toggle("open");
  }
  if (ev.detail === 3 || ev.detail === 1) {
    rightPart.classList.toggle("open");
  }

  checkTurret();
});

const moveIris = () => {
  const x = ~~(Math.random() * 5) - 2;
  const y = ~~(Math.random() * 5) - 2;
  iris.style.setProperty("--x", `${x}px`);
  iris.style.setProperty("--y", `${y}px`);
  const time = ~~(Math.random() * 600) + 150;
  setTimeout(() => moveIris(), time);
};

setTimeout(() => moveIris(), 500);

let times = 30;

const rotateTurret = () => {
  const rotate = ~~(Math.random() * 10) - 5;
  turret.style.setProperty("--turret-rotate", `${rotate}deg`);
  const time = ~~~(Math.random() * 750) + 250;

  if (times === 30) {
    sounds.turretFire.play();
  }
  times--;
  if (times > 0) {
    setTimeout(() => rotateTurret(), time);
  } else {
    sounds.turretFire.pause();
  }
};

// setTimeout(() => rotateTurret(), 500);
