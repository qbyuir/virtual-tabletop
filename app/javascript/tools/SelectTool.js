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
    this.stage.on("mousedown.select", (e) => {
      console.log("target:", e.target);
      console.log("hasName token:", e.target.hasName("token"));
      console.log("ancestor:", e.target.findAncestor(".token"));

      if (this.stage.isDragging()) return;

      if (e.target.hasName("token") || e.target.findAncestor(".token")) return;

      const pointer = this.stage.getPointerPosition();
      this.clickStart = pointer;
      this.start = {
        x: (pointer.x - this.stage.x()) / this.stage.scaleX(),
        y: (pointer.y - this.stage.y()) / this.stage.scaleY(),
      };

      this.rect = new Konva.Rect({
        x: this.start.x,
        y: this.start.y,
        width: 0,
        height: 0,
        stroke: "blue",
        fill: "blue",
        opacity: 0.15,
        dash: [4, 4],
        listening: false,
      });

      this.dragSelecting = true;
      this.uiLayer.add(this.rect);
      this.uiLayer.draw();
    });

    this.stage.on("mousemove.select", () => {
      if (this.stage.isDragging()) return;
      if (!this.rect) return;

      const pointer = this.stage.getPointerPosition();
      const pos = {
        x: (pointer.x - this.stage.x()) / this.stage.scaleX(),
        y: (pointer.y - this.stage.y()) / this.stage.scaleY(),
      };

      this.rect.position({
        x: Math.min(pos.x, this.start.x),
        y: Math.min(pos.y, this.start.y),
      });
      this.rect.size({
        width: Math.abs(pos.x - this.start.x),
        height: Math.abs(pos.y - this.start.y),
      });
      this.uiLayer.batchDraw();
    });

    this.stage.on("mouseup.select", () => {
      if (!this.rect) return;

      const box = this.rect.getClientRect({ relativeTo: this.stage });
      const tokens = this.tokenLayer.find(".token");
      const selected = tokens.filter((token) =>
        Konva.Util.haveIntersection(
          box,
          token.getClientRect({ relativeTo: this.stage }),
        ),
      );
      this.dragSelecting = false;
      this.tokenManager.select(selected);
      this.rect.destroy();
      this.rect = null;
      this.uiLayer.batchDraw();
    });

    window.addEventListener("mouseup", () => {
      if (!this.rect) return;
      this.rect.destroy();
      this.rect = null;
      this.uiLayer.batchDraw();
    });

    this.stage.on("click.select", (e) => {
      if (!this.clickStart) return;
      const pos = this.stage.getPointerPosition();
      const dist = Math.hypot(
        pos.x - this.clickStart.x,
        pos.y - this.clickStart.y,
      );
      if (dist > 5) return;
      if (this.dragSelecting) return;

      let token = e.target;
      if (!token.hasName("token")) {
        token = token.findAncestor(".token");
      }

      if (!token) {
        if (!e.evt.shiftKey && !e.evt.ctrlKey) this.tokenManager.deselect();
        return;
      }

      const current = this.tokenManager.getSelected();

      if (e.evt.shiftKey || e.evt.ctrlKey) {
        if (current.includes(token)) {
          this.tokenManager.select(current.filter((t) => t !== token));
        } else {
          this.tokenManager.select([...current, token]);
        }
      } else {
        this.tokenManager.select([token]);
      }
    });
  }

  disable() {
    this.stage.off(".select");
  }
}
