import { renderMeta, renderDeleteList, renderSongCount } from "./ui.js";
import {
  addSingle, addBulk, deleteSelected,
  openBoxByNumber, openRandom, doReshuffle,
  exportJSON, importJSONFile
} from "./handlers.js";
import { loadSongs, saveSongs } from "./songs.js";
import { fixOrReshuffleMapping } from "./mapping.js";

function bind() {
  // 抽取/洗牌
  document.getElementById("btn-open").addEventListener("click", openBoxByNumber);
  document.getElementById("btn-random").addEventListener("click", openRandom);
  document.getElementById("btn-shuffle").addEventListener("click", doReshuffle);

  // 添加/批量/删除
  document.getElementById("btn-add-single").addEventListener("click", addSingle);
  document.getElementById("btn-add-bulk").addEventListener("click", addBulk);
  document.getElementById("btn-delete").addEventListener("click", deleteSelected);

  // 导入/导出
  document.getElementById("btn-export").addEventListener("click", exportJSON);
  document.getElementById("import-file").addEventListener("change", importJSONFile);
}

function init() {
  // 归一化数据并首次渲染
  saveSongs(loadSongs());
  renderSongCount();
  fixOrReshuffleMapping();
  renderMeta();
  renderDeleteList();
  bind();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// ✅ 自检标记：模块已成功执行（供 index.html 里的兜底脚本检查）
window.__APP_LOADED__ = true;
