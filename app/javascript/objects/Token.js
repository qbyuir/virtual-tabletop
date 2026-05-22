import MoveTokenAction from "../actions/MoveTokenAction";

export default class Token {
  constructor(layer, url, x, y, history) {
    this.history = history;

    this.group = new Konva.Group({
      x: x,
      y: y,
      draggable: false,
      name: "token",
    });

    Konva.Image.fromURL(url, (image) => {
      image.width(500);
      image.height(800);
      image.listening(true);

      image.hitFunc((context) => {
        context.beginPath();
        context.rect(0, 0, image.width(), image.height());
        context.closePath();
        context.fillStrokeShape(image);
      });
      this.group.listening(true);
      this.group.add(image);

      this.group.cache();
      this.group.clearCache();

      this.group.on("dragstart", () => {
        console.log("dragstart disparado");
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

      if (this.onReady) this.onReady();
    });
  }
}
