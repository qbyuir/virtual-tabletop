export default class SelectTool {
  constructor(stage, tokenLayer, uiLayer, tokenManager) {
    this.stage = stage;
    this.tokenLayer = tokenLayer;
    this.uiLayer = uiLayer;
    this.tokenManager = tokenManager;
    this.dragSelecting = false;
    this.rect = null;
    this.start = null;
    this.clickStart = null;
  }

  enable() {
    let draggingToken = null;
    let dragOffset = { x: 0, y: 0 };

    this.stage.on("mousedown.select", (e) => {
      const pos = this.stage.getPointerPosition();
      const scale = this.stage.scaleX();
      const stagePos = this.stage.position();
      const worldPos = {
        x: (pos.x - stagePos.x) / scale,
        y: (pos.y - stagePos.y) / scale,
      };
      const tokens = this.tokenLayer.find(".token");
      const clicked = tokens.find((token) => {
        const box = token.getClientRect({ relativeTo: this.tokenLayer });
        return (
          worldPos.x >= box.x &&
          worldPos.x <= box.x + box.width &&
          worldPos.y >= box.y &&
          worldPos.y <= box.y + box.height
        );
      });

      if (!clicked) {
        this.tokenManager.deselect();
        return;
      }

      this.tokenManager.select([clicked]);
      draggingToken = clicked;
      dragOffset = {
        x: worldPos.x - clicked.x(),
        y: worldPos.y - clicked.y(),
      };
    });

    this.stage.on("mousemove.select", (e) => {
      if (draggingToken !== null) {
        const pos = this.stage.getPointerPosition();
        const scale = this.stage.scaleX();
        const stagePos = this.stage.position();
        const worldPos = {
          x: (pos.x - stagePos.x) / scale,
          y: (pos.y - stagePos.y) / scale,
        };
        draggingToken.position({
          x: worldPos.x - dragOffset.x,
          y: worldPos.y - dragOffset.y,
        });
        this.tokenLayer.batchDraw();
      }
    });

    this.stage.on("mouseup.select", (e) => {
      draggingToken = null;
    });
  }

  disable() {
    this.stage.off(".select");
  }
}
