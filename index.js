let order = [];
let playerOrder;
let flash;
let good;
const div = ["TL", "TR", "BL", "BR"];
let strict = false;
let win;
let on = false;
let intervalId;
let noise = true;
let turn;

const tl = document.querySelector(".TL");
const tr = document.querySelector(".TR");
const bl = document.querySelector(".BL");
const br = document.querySelector(".BR");
const powerBtn = document.querySelector(".Power");
const startBtn = document.querySelector(".Start");
const strictBtn = document.querySelector(".Strict");
const turnCounter = document.querySelector(".Turn");

//strick mode
strictBtn.addEventListener("click", (event) => {
  if (strictBtn.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

//power buttuon
powerBtn.addEventListener("click", (event) => {
  if (powerBtn.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

//start button
startBtn.addEventListener("click", (event) => {
  if (on) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;

  for (let i = 0; i < 5; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  console.log(order);
  compTurn = true;
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }
  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  tl.style.backgroundColor = "lightgreen";
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  tr.style.backgroundColor = "tomato";
}
function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bl.style.backgroundColor = "yellow";
}
function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  br.style.backgroundColor = "lightskyblue";
}

function clearColor() {
  tl.style.backgroundColor = "darkgreen";
  tr.style.backgroundColor = "darkred";
  bl.style.backgroundColor = "goldenrod";
  br.style.backgroundColor = "darkblue";
}

function flashColor() {
  tl.style.backgroundColor = "lightgreen";
  tr.style.backgroundColor = "tomato";
  bl.style.backgroundColor = "yellow";
  br.style.backgroundColor = "lightskyblue";
}

tl.addEventListener("click", (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

tr.addEventListener("click", (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bl.addEventListener("click", (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

br.addEventListener("click", (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 5 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();
      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 300);
    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}
