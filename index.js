//language
let arrLang = new Array();
arrLang["en"] = new Array();
arrLang["cn"] = new Array();

// English content
arrLang["en"]["title"] = "Simon";
arrLang["en"]["start"] = "Start";
arrLang["en"]["power"] = "Power";
arrLang["en"]["strict"] = "Strict";
arrLang["en"]["turn"] = "Turn";
arrLang["en"]["rule1"] = "Rule";
arrLang["en"]["rule2"] =
  "The device has four colored buttons, each producing a particular tone when it is pressed or activated by the device. A round in the game consists of the device lighting up one or more buttons in a random order, after which the player must reproduce that order by pressing the buttons. As the game progresses, the number of buttons to be pressed increases.";

// Chinese content

arrLang["cn"]["title"] = "西蒙";
arrLang["cn"]["start"] = "开始";
arrLang["cn"]["power"] = "电源";
arrLang["cn"]["strict"] = "困难";
arrLang["cn"]["turn"] = "轮次";
arrLang["cn"]["rule1"] = "规则";
arrLang["cn"]["rule2"] =
  "该设备有四个彩色按钮，每个按钮在被按下或被激活时都会产生特定的声音。 游戏中，设备以随机顺序点亮一个或多个按钮，然后玩家必须通过按下按钮来重现该顺序。 随着游戏的进行，点亮的按钮数量增加。";

// Process translation
$(function () {
  $(".translate").click(function () {
    var lang = $(this).attr("id");

    $(".lang").each(function (index, item) {
      $(this).text(arrLang[lang][$(this).attr("key")]);
    });
  });
});

//simon

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
const rickImg = document.querySelector("img.Rick");
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
  if (on || win) {
    document.getElementById("clip6").play();
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
  for (let i = 1; i <= 10; i++) {
    document.querySelector(`.Man${i}`).style.display = "none";
  }

  for (let i = 0; i < 10; i++) {
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

function turn(event) {
  if (!on) return;

  playerOrder.push(event.target.id); 
  check(); 

  if (event.target.id === 1) one();
  if (event.target.id === 2) two();
  if (event.target.id === 3) three();
  if (event.target.id === 4) four();
  if (!win) setTimeout(clearColor, 300); 
}

tl.addEventListener("click", turn);
tr.addEventListener("click", turn);
bl.addEventListener("click", turn);
br.addEventListener("click", turn);

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 10 && good) {
    winGame();
  }

  if (good == false) {
    document.getElementById("clip7").play();
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
    document.querySelector(`.Man${turn - 1}`).style.display = "block";
    document.getElementById("clip9").play();
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

function winGame() {
  document.querySelector(".Man10").style.display = "block";
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
  document.getElementById("clip5").play();
}

rickImg.addEventListener("click", () => {
  document.getElementById("clip8").play();
});
