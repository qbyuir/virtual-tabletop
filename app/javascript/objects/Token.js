import MoveTokenAction from "../actions/MoveTokenAction";

export default class Token {
  constructor(layer, url, x, y, history) {
    this.history = history;

    this.group = new Konva.Group({
      x: x,
      y: y,
      draggable: true,
      name: "token",
    });

    Konva.Image.fromURL(url, (image) => {
      image.width(500);
      image.height(800);
      this.group.add(image);
      layer.batchDraw();

      this.group.on("dragstart", () => {
        this.startPos = { ...this.group.position() };
      });

      this.group.on("dragend", () => {
        const endPos = { ...this.group.position() };
        if (!this.startPos) return;
        if (this.startPos.x === endPos.x && this.startPos.y === endPos.y)
          return;

        this.history.execute(
          new MoveTokenAction(this.group, this.startPos, endPos),
        );
      });
    });
  }
}
