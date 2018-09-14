document.getElementById("start-button").onclick = function startGame() {
  start();
  var frames = 0;
  var barras = [];
  var sq = [];
  var barrasG = [];
  var barrasG2 = [];
  var interval;
  var hue = 0;

  document.getElementById("derecha").addEventListener("click", derecha);
  document.getElementById("izquierda").addEventListener("click", izquierda);
  document.getElementById("arriba").addEventListener("click", arriba);
  document.getElementById("abajo").addEventListener("click", abajo);

  //instacias

  var ship = new Ship(260, 520, 200, 200);
  var exp = new Explosion(260, 520, 200, 200);
  var space = new Space();
  var hitSound = new Sound("./Sonidos/explosión.mp3");
  var backgroundSound = new Sound("./Sonidos/mi-cancion2.mp3");
  backgroundSound.loop = true;
  backgroundSound.volume = 0.3;

  //funciones

  function shiftHue(hue) {
    //función  para cambiar el color de los items
    return (hue + 1) % 360;
  }
  function derecha() {
    ship.speedX = +40;
    exp.speedX = +40;
  }
  function izquierda() {
    ship.speedX = -40;
    exp.speedX = -40;
  }
  function arriba() {
    ship.speedY = -40;
    exp.speedY = -40;
  }
  function abajo() {
    ship.speedY = +40;
    exp.speedY = +40;
  }
  function start() {
    interval = setInterval(update, 1000 / 60);
  }
  function points() {
    //función para sumar los puntos
    ctx.font = "40px Audiowide";
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 5;
    ctx.strokeRect(430, 0, 285, 60);
    ctx.fillStyle = "white";
    ctx.fillText("Score " + Math.round(frames / 10), 440, 50);
  }
  function gameOver() {
    clearInterval(interval);
    interval = undefined;
    ctx.font = "80px Audiowide";
    ctx.fillStyle = "yellow";
    ctx.fillText("Game Over", 130, 300);
    ctx.fillStyle = "white";
    ctx.fillText("X para reiniciar ", 30, 400);
  }
  function everyinterval(n) {
    if ((frames / n) % 1 == 0) {
      return true;
    }
    return false;
  }
  function update() {
    var pos = Math.floor(Math.random() * 500); //
    var pos2 = Math.floor(Math.random() * 600); //
    var pos3 = Math.floor(Math.random() * 550); // Posición en x random
    var pos4 = Math.floor(Math.random() * 700); //
    var width = Math.floor(Math.random() * canvas.width * 0.55 + 40); // Anchura random
    hue = shiftHue(hue); //////////////
    color = "hsl(" + hue + ",100%,50%)"; //
    color2 = "hsl(" + hue + ",20%,50%)"; // Transiciòn de colores

    for (i = 0; i < barras.length; i++) {
      if (
        ship.collision(barras[i]) ||
        ship.collision2(sq[i]) ||
        ship.collision3(barrasG[i]) ||
        ship.collision3(barrasG2[i])
      ) {
        // Colisiones
        gameOver();
        exp.draw();
        hitSound.play();
        backgroundSound.stop();
        return;
      }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frames++;
    space.draw();

    for (i = 0; i < barras.length; i++) {
      // Genera las barras
      barras[i].draw();
      barras[i].y += 2;
      if (
        Math.round(frames / 10) == 100 ||
        Math.round(frames / 10) == 300 ||
        Math.round(frames / 10) == 500 ||
        Math.round(frames / 10) == 700 ||
        Math.round(frames / 10) == 900 ||
        Math.round(frames / 10) == 1100 ||
        Math.round(frames / 10) == 1300 ||
        Math.round(frames / 10) == 1500 ||
        Math.round(frames / 10) == 1700
      ) {
        barras[i].y += 30;
      }
    }
    for (i = 0; i < sq.length; i++) {
      // Genera el cuadrado
      sq[i].y += 2;
      sq[i].draw();
      if (
        Math.round(frames / 10) == 200 ||
        Math.round(frames / 10) == 400 ||
        Math.round(frames / 10) == 600 ||
        Math.round(frames / 10) == 800 ||
        Math.round(frames / 10) == 1000 ||
        Math.round(frames / 10) == 1200 ||
        Math.round(frames / 10) == 1400 ||
        Math.round(frames / 10) == 1600 ||
        Math.round(frames / 10) == 1800
      ) {
        sq[i].y += 30;
      }
    }
    for (i = 0; i < barrasG.length; i++) {
      // Genera las barras giratorias
      barrasG[i].y += 4;
      barrasG[i].draw();
      barrasG[i].angle += (2 * Math.PI) / 180;
    }
    for (i = 0; i < barrasG2.length; i++) {
      // Genera las barras giratorias
      barrasG2[i].y += 4;
      barrasG2[i].draw();
      barrasG2[i].angle -= (2 * Math.PI) / 180;
    }
    if (frames == 1 || everyinterval(200)) {
      // intervalo dónde se generara el obstáculo
      barras.push(new Bars(pos, -150, width, 40));
    }
    if (frames == 1 || everyinterval(120)) {
      // intervalo dónde se generara el obstáculo
      sq.push(new Square(pos2, -300, 60, 60));
    }
    if (frames == 1 || everyinterval(200)) {
      // intervalo dónde se generara el obstáculo
      barrasG.push(new Bars_g(pos3, -700, 200, 40));
    }
    if (frames == 1 || everyinterval(200)) {
      // intervalo dónde se generara el obstáculo
      barrasG2.push(new Bars_g(pos4, -400, 200, 40));
    }

    ship.draw();
    ship.newPos();
    exp.newPos2();
    points();
    space.y++;
    backgroundSound.play();
    ship.speedX = 0;
    ship.speedY = 0;
    exp.speedX = 0;
    exp.speedY = 0;

    //teclas de juego

    if (canvas.key && canvas.key == 37) {
      exp.speedX = -5;
      ship.speedX = -5;
    }
    if (canvas.key && canvas.key == 39) {
      exp.speedX = 5;
      ship.speedX = 5;
    }
    if (canvas.key && canvas.key == 38) {
      exp.speedY = -5;
      ship.speedY = -5;
    }
    if (canvas.key && canvas.key == 40) {
      exp.speedY = 5;
      ship.speedY = 5;
    }
  }

  //teclas de Juego

  window.addEventListener("keydown", function(e) {
    canvas.key = e.keyCode;
  });
  window.addEventListener("keyup", function(e) {
    canvas.key = false;
  });
  window.addEventListener("keypress", function(e) {
    if (e.keyCode === 88) {
      clearInterval(interval);
      interval = undefined;
      backgroundSound.stop();
      frames = 0;
      barras = [];
      sq = [];
      barrasG = [];
      barrasG2 = [];
      startGame();
    }
  });
};
