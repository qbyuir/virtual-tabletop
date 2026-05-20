export default class ToolManager {
  constructor() {
    this.currentTool = null;
  }

  setTool(tool) {
    if (this.currentTool) {
      this.currentTool.disable();
    }
    this.currentTool = tool;
    this.currentTool.enable();
  }

  getCurrentTool() {
    return this.currentTool;
  }
}
