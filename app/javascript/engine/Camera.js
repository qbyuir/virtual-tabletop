export default class Camera {
  constructor(stage) {
    this.stage = stage;
    this.minScale = 0.1;
    this.maxScale = 5;
    this.scaleBy = 1.05;
    this._setupZoom();
  }

  _setupZoom() {
    this.stage.on("wheel", (e) => {
      e.evt.preventDefault();

      const oldScale = this.stage.scaleX();
      const pointer = this.stage.getPointerPosition();

      const mousePointTo = {
        x: (pointer.x - this.stage.x()) / oldScale,
        y: (pointer.y - this.stage.y()) / oldScale,
      };

      const direction = e.evt.deltaY > 0 ? -1 : 1;
      let newScale =
        direction > 0 ? oldScale * this.scaleBy : oldScale / this.scaleBy;

      newScale = Math.max(this.minScale, Math.min(this.maxScale, newScale));
      this.stage.scale({ x: newScale, y: newScale });

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };
      this.stage.position(newPos);
    });
  }
}
