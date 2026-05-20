export default class Grid {
  constructor(stage, layer) {
    this.stage = stage;
    this.cellSize = 50;
    this.color = "rgba(65, 65, 65, 0.5)";

    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.pointerEvents = "none";
    this.ctx = this.canvas.getContext("2d");

    stage.container().insertBefore(this.canvas, stage.container().firstChild);

    this.draw();

    this.stage.on("xChange yChange scaleXChange scaleYChange", () => {
      this.draw();
    });
  }

  draw() {
    const scale = this.stage.scaleX();
    const stagePos = this.stage.position();
    const width = this.stage.width();
    const height = this.stage.height();

    this.canvas.width = width;
    this.canvas.height = height;

    const ctx = this.ctx;
    const cell = this.cellSize * scale;

    const offsetX = ((stagePos.x % cell) + cell) % cell;
    const offsetY = ((stagePos.y % cell) + cell) % cell;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;

    ctx.beginPath();
    for (let x = offsetX - cell; x < width + cell; x += cell) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = offsetY - cell; y < height + cell; y += cell) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }
}
