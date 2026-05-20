export default class MoveTokenAction {
  constructor(token, from, to) {
    this.token = token;
    this.from = from;
    this.to = to;
  }

  execute() {
    this.token.position(this.to);
    this.token.getLayer().batchDraw();
  }

  undo() {
    this.token.position(this.from);
    this.token.getLayer().batchDraw();
  }
}
