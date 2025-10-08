import { loadSongs } from "./songs.js";
import { getLastShuffle } from "./mapping.js";

export function renderMeta() {
  document.getElementById("song-count").innerText = String(loadSongs().length);
  document.getElementById("last-shuffle").innerText = getLastShuffle() || "—";
}

export function renderSongCount() {
  document.getElementById("song-count").innerText = String(loadSongs().length);
}

export function renderDeleteList() {
  const sel = document.getElementById("delete-select");
  while (sel.firstChild) sel.removeChild(sel.firstChild);
  loadSongs().forEach((name, i) => {
    const opt = document.createElement("option");
    opt.value = String(i);
    opt.textContent = name;
    sel.appendChild(opt);
  });
}

export function showResult(text) {
  document.getElementById("result").textContent = text;
}
