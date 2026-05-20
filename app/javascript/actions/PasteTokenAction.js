export default class PasteTokenAction {
  constructor(layer, token) {
    this.layer = layer;
    this.token = token;
  }

  execute() {
    this.layer.add(this.token);
    this.layer.batchDraw();
  }

  undo() {
    this.token.remove();
    this.layer.batchDraw();
  }
}
