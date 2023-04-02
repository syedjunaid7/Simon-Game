let btn = document.getElementsByClassName("btn");

let colors = ["green", "red", "yellow", "blue"];

var colorsRandom = [];
let colorsClicked = [];
let started = false;
var level = 0;

document.addEventListener("keypress", () => {
  if (!started) {
    randomColors();
    started = true;
  }
});

for (const btns of btn) {
  btns.addEventListener("click", (e) => {
    animate(e.target.id);
    sound(e.target.id);
    colorsClicked.push(e.target.id);
    checkAns(colorsClicked.length - 1);
  });
}

function checkAns(value) {
  if (colorsRandom[value] === colorsClicked[value]) {
    console.log(colorsRandom[value]);
    console.log(colorsClicked[value]);
    console.log("succes");
    if (colorsRandom.length === colorsClicked.length) {
      setTimeout(() => {
        randomColors();
      }, 1000);
    }
  } else {
    var title = document.querySelector("#level-title");
    title.innerText = `Game Over, Press Any Key to Restart`;
    let body = document.querySelector("body");
    body.classList.add("game-over");
    setTimeout(() => {
      body.classList.remove("game-over");
    }, 100);
    restart();
  }
}

function randomColors() {
  colorsClicked = []; // Reset the colorsClicked array
  let randomC = Math.floor(Math.random() * 4); 
  colorsRandom.push(colors[randomC]);

  level++;
  var title = document.querySelector("#level-title");
  title.innerText = `Level ${level}`;

  const element = document.querySelector(`.${colors[randomC]}`);
  element.style.opacity = 0;
  setTimeout(() => {
    element.style.opacity = 1;
  }, 100);
  setTimeout(() => {
    element.style.opacity = 0;
  }, 100);
  setTimeout(() => {
    element.style.opacity = 1;
  }, 100);

  sound(colors[randomC]);
}

function animate(btn) {
  let color = document.querySelector(`.${btn}`);
  color.classList.add("pressed");
  setTimeout(() => {
    color.classList.remove("pressed");
  }, 100);
}

function sound(color) {
  let sound = new Audio(`sounds/${color}.mp3`);
  sound.play();
}

function restart(params) {
  colorsRandom = [];
  level = 0;
  started = false;
}
