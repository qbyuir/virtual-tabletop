export default class HistoryManager {
  constructor() {
    this.undoStack = [];
    this.redoStack = [];
  }

  execute(action) {
    action.execute();
    this.undoStack.push(action);
    this.redoStack = [];
  }

  undo() {
    const action = this.undoStack.pop();
    if (!action) return;
    action.undo();
    this.redoStack.push(action);
  }

  redo() {
    const action = this.redoStack.pop();
    if (!action) return;
    action.execute();
    this.undoStack.push(action);
  }
}
