export default class PasteTokenAction {
  constructor(layer, token) {
    this.layer = layer;
    this.token = token;
  }

  execute() {
    this.layer.add(this.token);
    // aguarda o próximo frame para garantir que a imagem já carregou
    requestAnimationFrame(() => {
      this.layer.batchDraw();
    });
  }

  undo() {
    this.token.remove();
    this.layer.batchDraw();
  }
}
