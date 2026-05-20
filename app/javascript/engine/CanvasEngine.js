export default class CanvasEngine {
  constructor(container) {
    this.stage = new Konva.Stage({
      container: container,
      width: window.innerWidth,
      height: window.innerHeight,
      draggable: false,
    });

    this.layers = {
      grid: new Konva.Layer(),
      tokens: new Konva.Layer(),
      ui: new Konva.Layer(),
    };

    this.stage.add(this.layers.tokens);
    this.stage.add(this.layers.ui);
  }
}
