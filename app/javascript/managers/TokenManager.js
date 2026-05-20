export default class TokenManager {
  constructor(stage, tokenLayer) {
    this.stage = stage;
    this.tokenLayer = tokenLayer;
    this.selected = [];

    this.transformer = new Konva.Transformer({
      rotateEnabled: true,
      keepRatio: false,
      borderStroke: "#4a90e2",
      anchorStroke: "#4a90e2",
      anchorFill: "#fff",
      anchorSize: 10,
      anchorCornerRadius: 3,
    });

    this.tokenLayer.add(this.transformer);
  }

  select(tokens) {
    this.selected = Array.isArray(tokens) ? tokens : [tokens];
    this.transformer.nodes(this.selected);
    this.tokenLayer.batchDraw();
  }

  deselect() {
    this.selected = [];
    this.transformer.nodes([]);
    this.tokenLayer.batchDraw();
  }

  getSelected() {
    return this.selected;
  }
}
