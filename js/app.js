import { renderMeta, renderDeleteList, renderSongCount } from "./ui.js";
import {
  addSingle, addBulk, deleteSelected,
  openBoxByNumber, openRandom, doReshuffle,
  exportJSON, importJSONFile
} from "./handlers.js";
import { loadSongs, saveSongs } from "./songs.js";
import { fixOrReshuffleMapping } from "./mapping.js";

function bind() {
  document.getElementById("btn-open").addEventListener("click", openBoxByNumber);
  document.getElementById("btn-random").addEventListener("click", openRandom);
  document.getElementById("btn-shuffle").addEventListener("click", doReshuffle);

  document.getElementById("btn-add-single").addEventListener("click", addSingle);
  document.getElementById("btn-add-bulk").addEventListener("click", addBulk);
  document.getElementById("btn-delete").addEventListener("click", deleteSelected);

  document.getElementById("btn-export").addEventListener("click", exportJSON);
  document.getElementById("import-file").addEventListener("change", importJSONFile);
}

function init() {
  // 第一次渲染：规范化数据并刷新 UI
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
