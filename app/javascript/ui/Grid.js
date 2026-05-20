export default class Grid {
  constructor(stage, layer) {
    this.stage = stage;
    this.layer = layer;
    this.cellSize = 50;
    this.color = "rgba(255, 255, 255, 0.15)";

    this.draw();

    this.stage.on("xChange yChange scaleXChange scaleYChange", () => {
      this.draw();
    });
  }

  draw() {
    this.layer.destroyChildren();

    const scale = this.stage.scaleX();
    const stagePos = this.stage.position();
    const width = this.stage.width();
    const height = this.stage.height();
    const cell = this.cellSize * scale;

    const offsetX = ((-stagePos.x % cell) + cell) % cell;
    const offsetY = ((-stagePos.y % cell) + cell) % cell;

    for (let x = offsetX; x < width + cell; x += cell) {
      this.layer.add(
        new Konva.Line({
          points: [x, 0, x, height],
          stroke: this.color,
          strokeWidth: 1,
          listening: false,
        }),
      );
    }

    for (let y = offsetY; y < height + cell; y += cell) {
      this.layer.add(
        new Konva.Line({
          points: [0, y, width, y],
          stroke: this.color,
          strokeWidth: 1,
          listening: false,
        }),
      );
    }

    this.layer.batchDraw();
  }
}
