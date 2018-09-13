var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//constructores

class Space {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = "./images/darkspace.jpg";
  }
  draw() {
    if (this.y > +canvas.height) this.y = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x,
      this.y - this.height,
      this.width,
      this.height
    );
  }
}
class Explosion {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.newPos2 = function() {
      this.x += this.speedX;
      this.y += this.speedY;
    };
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = "./images/explosion.png";
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
class Ship {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY;
    };
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = "./images/spaceShip.png";
  }
  collision(otherobj) {
    var myleft = this.x + 73;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x + 75;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y + 53;
    var otherbottom = otherobj.y - 7;
    var crash = true;
    if (
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright ||
      mybottom < othertop
    ) {
      crash = false;
    }
    return crash;
  }
  collision2(item) {
    var myleft = this.x + 73;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = item.x + 75;
    var otherright = item.x + item.width;
    var othertop = item.y + 53;
    var otherbottom = item.y + 9;
    var crash = true;
    if (
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright ||
      mybottom < othertop
    ) {
      crash = false;
    }
    return crash;
  }
  collision3(item2) {
    var myleft = this.x + 73;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = item2.x - 24;
    var otherright = item2.x + 98;
    var othertop = item2.y + 35;
    var otherbottom = item2.y - 25;
    var crash = true;
    if (
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright ||
      mybottom < othertop
    ) {
      crash = false;
    }
    return crash;
  }
  draw() {
    //limites
    if (this.x > canvas.width - 133) this.x -= 5;
    if (this.x < 65 - 136) this.x += 5;
    if (this.y < 0 - 45) this.y += 5;
    if (this.y > canvas.height - 150) this.y -= 5; //limites
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
class Sound {
  constructor(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.play = function() {
      this.sound.play();
    };
    this.stop = function() {
      this.sound.pause();
    };
  }
}
class Square {
  constructor(pos2, y, width, height) {
    this.x = pos2;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    ctx.fillStyle = color2;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
class Bars {
  constructor(pos, y, width, height) {
    this.x = pos;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
class Bars_g {
  constructor(pos3, y, width, height) {
    this.x = pos3;
    this.y = y;
    this.angle = 0;
    this.width = width;
    this.height = height;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle =
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")";
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  }
}
