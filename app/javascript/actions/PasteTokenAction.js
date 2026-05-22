export default class PasteTokenAction {
  constructor(layer, token) {
    this.layer = layer;
    this.token = token;
  }

  execute() {
    this.layer.add(this.token);
    this.layer.draw();
    this.token.clearCache();
    this.token.cache();
    this.layer.draw();
  }

  undo() {
    this.token.remove();
    this.layer.batchDraw();
  }
}
