const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const rand = function (num) {
  return Math.floor(Math.random() * num);
}
canvas.width = 1000;
canvas.height = 600;

const BG = new Image();
BG.src = 'https://i.ytimg.com/vi/XaQD2-MxBC4/maxresdefault.jpg';

const hero = new Image();
hero.src = 'https://rpelm.com/images/iceberg-clipart-cute-penguin-17.png';

const badGuys = new Image();
badGuys.src = 'https://vignette.wikia.nocookie.net/tfbnebs/images/d/da/20130404-pig.png/revision/latest?cb=20140727201205';
const badGuyzz = function (count, canvasWidth, canvasHeight) {
  const arr = [];

  for (let i = 0; i < count; i++) {

    const piggies = {
      x: rand(canvasWidth - 50),
      y: rand(canvasHeight - 50),
      width: 50,
      height: 50,     
      xDelta: 3,
      yDelta: 3,
      image: badGuys,

      draw1: function () {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);

      },
      update1: function () {
        this.x += this.xDelta;
        this.y += this.yDelta;
        if (this.x + this.width >= canvasWidth || this.x <= 0) { 
          this.xDelta = this.xDelta * -1 }
        if (this.y <= 0 || this.y + this.height >= canvasHeight) { 
          this.yDelta = this.yDelta * -1}
      }
    };
    arr[i] = piggies;
  }
  return arr;
};
const penguin = {
  x: 0,
  y: 440,
  width: 115,
  height: 150,
  xDelta: 0,
  yDelta: 0,
  image: hero,
  draw: function () {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  },
  update: function () {
    this.x += this.xDelta;
    this.y += this.yDelta;
  },
};

let countObj = badGuyzz(6, canvas.width, canvas.height);
const draw1 = function () {

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(BG, 0, 0, canvas.width, canvas.height);
  for (let i = 0; i < countObj.length; i++) {

    countObj[i].draw1();

  }
}

const gameover = function () {
  for (let i = 0; i < countObj.length; i++) {
    if (countObj[i].x + countObj[i].width >= penguin.x && countObj[i].x <= penguin.x + penguin.width && countObj[i].y + countObj[i].height >= penguin.y && countObj[i].y <= penguin.y + penguin.height) {
      alert("Game over !!!")
    }
  }
}
const update1 = function () {
  for (let i = 0; i < countObj.length; i++) {
    countObj[i].update1();
  }
};


const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
document.addEventListener('keydown', function (event) {
  if (event.keyCode === rightKey) {
    penguin.xDelta = 4;
  } if (event.keyCode === leftKey) {
    penguin.xDelta = -4;
  };
}, false);
document.addEventListener('keydown', function (event) {
  if (event.keyCode === upKey) {
    penguin.yDelta = -4;
  } if (event.keyCode === downKey) {
    penguin.yDelta = 4;
  };
}, false);
document.addEventListener('keyup', function (event) {

  penguin.yDelta = 0;


}, false);

document.addEventListener('keyup', function (event) {

  penguin.xDelta = 0;


}, false);

const loop = function () {

  gameover();
  draw1();
  update1();
  penguin.draw();
  penguin.update();

  requestAnimationFrame(loop);
};
loop();
