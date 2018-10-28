const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
const rand = function (num) {
  return Math.floor(Math.random() * num) + 1;
};
const colorArr = ["black", "red", "yellow"]
const createBoxes = function (count, canvasWidth, canvasHeight) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    const obj = {
      x: rand(canvasWidth - 40),
      y: rand(canvasHeight - 40),
      width: 30,
      height: 30,
      xDelta: 1,
      yDelta: 1,
      color: colorArr[rand(colorArr.length) - 1],
      draw: function () {
        context.fillStyle = this.color,
        context.fillRect(this.x, this.y, this.width, this.height)
      },
        update: function () {
        this.x += this.xDelta;
        this.y += this.yDelta;
        if (this.x + this.width >= canvasWidth || this.x <= 0) { this.xDelta = this.xDelta * -1; }
        if (this.y <= 0 || this.y + this.height >= canvasHeight) {
          this.yDelta = this.yDelta * -1;
        }

      }
    };
    arr[i] = obj;
  };
  return arr;
};
const draw = function () {
  context.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < objects.length; i++) {
    objects[i].draw();
  };
};
const update = function () {
  for (let i = 0; i < objects.length; i++) {
    objects[i].update();
  };
};
const animation = function () {
  requestAnimationFrame(animation);
  draw();
  update();
};
let objects = createBoxes(15, canvas.width, canvas.height);
animation();