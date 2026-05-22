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
    let dragOffsets = new Map();

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

      if (e.evt.shiftKey == true) {
        const current = this.tokenManager.getSelected();
        this.tokenManager.select([...current, clicked]);
      } else {
        this.tokenManager.select([clicked]);
      }

      draggingToken = clicked;
      this.tokenManager.getSelected().forEach((token) => {
        dragOffsets.set(token, {
          x: worldPos.x - token.x(),
          y: worldPos.y - token.y(),
        });
      });
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

        this.tokenManager.getSelected().forEach((token) => {
          const offset = dragOffsets.get(token);
          token.position({
            x: worldPos.x - offset.x,
            y: worldPos.y - offset.y,
          });
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
