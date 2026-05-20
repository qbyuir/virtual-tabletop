export default class PanTool {
  constructor(stage) {
    this.stage = stage;
    this.spaceDown = false;
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
  }

  _onKeyDown(e) {
    if (e.code === "Space" && !this.spaceDown) {
      e.preventDefault();
      this.spaceDown = true;
      this.stage.draggable(true);
      this.stage.container().style.cursor = "grab";
    }
  }

  _onKeyUp(e) {
    if (e.code === "Space") {
      this.spaceDown = false;
      this.stage.draggable(false);
      this.stage.container().style.cursor = "default";
    }
  }

  enable() {
    window.addEventListener("keydown", this._onKeyDown);
    window.addEventListener("keyup", this._onKeyUp);
  }

  disable() {
    window.removeEventListener("keydown", this._onKeyDown);
    window.removeEventListener("keyup", this._onKeyUp);
  }
}
