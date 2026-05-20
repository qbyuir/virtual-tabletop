import "@hotwired/turbo-rails";
import "./controllers";

import CanvasEngine from "./engine/CanvasEngine";
import Camera from "./engine/Camera";
import ToolManager from "./engine/ToolManager";
import Grid from "./ui/Grid";
import TokenManager from "./managers/TokenManager";
import HistoryManager from "./managers/HistoryManager";
import PasteManager from "./managers/PasteManager";
import SelectTool from "./tools/SelectTool";
import PanTool from "./tools/PanTool";

document.addEventListener("turbo:load", () => {
  const stageContainer = document.getElementById("stage");
  if (!stageContainer) return;

  const engine = new CanvasEngine(stageContainer);
  const camera = new Camera(engine.stage);
  const grid = new Grid(engine.stage, engine.layers.grid);

  const historyManager = new HistoryManager();
  const tokenManager = new TokenManager(engine.stage, engine.layers.tokens);
  const pasteManager = new PasteManager(
    engine.stage,
    engine.layers.tokens,
    historyManager,
  );

  const selectTool = new SelectTool(
    engine.stage,
    engine.layers.tokens,
    engine.layers.ui,
    tokenManager,
  );
  const panTool = new PanTool(engine.stage);
  const toolManager = new ToolManager();

  toolManager.setTool(selectTool);
  panTool.enable();

  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "z") {
      e.preventDefault();
      historyManager.redo();
      engine.stage.stopDrag();
    } else if (e.ctrlKey && e.key.toLowerCase() === "z") {
      e.preventDefault();
      historyManager.undo();
      engine.stage.stopDrag();
    }
  });

  window.addEventListener("mouseup", () => {
    engine.stage.find(".token").forEach((node) => node.stopDrag());
  });

  window.addEventListener("resize", () => {
    engine.stage.width(window.innerWidth);
    engine.stage.height(window.innerHeight);
    grid.draw();
  });
});
