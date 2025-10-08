import { loadSongs, saveSongs } from "./songs.js";
import { getMapping, fixOrReshuffleMapping, reshuffleMapping } from "./mapping.js";
import { renderMeta, renderSongCount, renderDeleteList, showResult } from "./ui.js";

// ---- 添加/批量/删除 ----
export function addSingle() {
  const inp = document.getElementById("single-title");
  const name = (inp.value || "").trim();
  if (!name) return;
  const songs = loadSongs();
  const set = new Set(songs.map(s => s.toLowerCase()));
  if (!set.has(name.toLowerCase())) {
    songs.push(name);
    saveSongs(songs);
    renderSongCount();
    renderDeleteList();
    fixOrReshuffleMapping();
    renderMeta();
  }
  inp.value = "";
}

export function addBulk() {
  const ta = document.getElementById("bulk-titles");
  const parts = (ta.value || "").split(/\n|,/).map(s => s.trim()).filter(Boolean);
  if (!parts.length) return;
  const songs = loadSongs();
  const set = new Set(songs.map(s => s.toLowerCase()));
  for (const s of parts) {
    if (!set.has(s.toLowerCase())) { songs.push(s); set.add(s.toLowerCase()); }
  }
  saveSongs(songs);
  renderSongCount();
  renderDeleteList();
  fixOrReshuffleMapping();
  renderMeta();
  ta.value = "";
}

export function deleteSelected() {
  const sel = document.getElementById("delete-select");
  const idxs = Array.from(sel.selectedOptions)
    .map(o => parseInt(o.value, 10))
    .sort((a,b)=>b-a);
  if (!idxs.length) return;
  const songs = loadSongs();
  for (const i of idxs) {
    if (i >= 0 && i < songs.length) songs.splice(i, 1);
  }
  saveSongs(songs);
  renderSongCount();
  renderDeleteList();
  fixOrReshuffleMapping();
  renderMeta();
}

// ---- 抽取/洗牌 ----
export function openBoxByNumber() {
  const val = document.getElementById("pick-number").value;
  const n = parseInt(val, 10);
  const songs = loadSongs();
  if (!songs.length) { showResult("歌单为空。"); return; }
  if (!Number.isInteger(n) || n < 1 || n > songs.length) {
    showResult("数字超出范围。"); return;
  }
  fixOrReshuffleMapping();
  const mapping = getMapping();
  showResult(`🎉 你的盲盒是：${songs[mapping[n-1]]}`);
}

export function openRandom() {
  const songs = loadSongs();
  if (!songs.length) { showResult("歌单为空。"); return; }
  fixOrReshuffleMapping();
  const mapping = getMapping();
  const pick = Math.floor(Math.random() * songs.length) + 1;
  showResult(`🎉 随机抽到：${songs[mapping[pick-1]]}（编号 ${pick}）`);
  document.getElementById("pick-number").value = String(pick);
}

export function doReshuffle() {
  reshuffleMapping();
  renderMeta();
}

// ---- 导入/导出 ----
export function exportJSON() {
  const data = JSON.stringify({ songs: loadSongs() }, null, 2);
  const blob = new Blob([data], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "songs.json"; a.click();
  URL.revokeObjectURL(url);
}

export function importJSONFile(evt) {
  const file = evt.target.files && evt.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result || "{}"));
      let arr = [];
      if (Array.isArray(data)) arr = data.map(String);
      else if (data && Array.isArray(data.songs)) arr = data.songs.map(String);
      else { alert('JSON 格式不正确：应为 {"songs":[...]} 或 [...].'); return; }

      saveSongs(arr);
      renderSongCount();
      renderDeleteList();
      fixOrReshuffleMapping();
      renderMeta();
    } catch (e) {
      alert("导入失败：" + e);
    } finally {
      evt.target.value = ""; // 允许再次导入同一文件
    }
  };
  reader.readAsText(file, "utf-8");
}
