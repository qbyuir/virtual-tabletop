import PasteTokenAction from "../actions/PasteTokenAction";
import Token from "../objects/Token";

export default class PasteManager {
  constructor(stage, tokenLayer, historyManager) {
    this.stage = stage;
    this.tokenLayer = tokenLayer;
    this.historyManager = historyManager;

    window.addEventListener("paste", (e) => {
      const items = e.clipboardData.items;

      for (const item of items) {
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          const url = URL.createObjectURL(file);

          const rawPos = this.stage.getPointerPosition() || { x: 200, y: 200 };
          const pos = {
            x: (rawPos.x - this.stage.x()) / this.stage.scaleX(),
            y: (rawPos.y - this.stage.y()) / this.stage.scaleY(),
          };

          const token = new Token(
            this.tokenLayer,
            url,
            pos.x,
            pos.y,
            this.historyManager,
          );
          token.onReady = () => {
            console.log(
              "imagem pronta, layer do grupo:",
              token.group.getLayer(),
            );
            this.historyManager.execute(
              new PasteTokenAction(this.tokenLayer, token.group),
            );
            this.tokenLayer.draw();
            console.log(
              "após execute, layer do grupo:",
              token.group.getLayer(),
            );
          };
        }
      }
    });
  }
}
