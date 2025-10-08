import { getLocal, setLocal } from "./storage.js";
import { loadSongs } from "./songs.js";
import { nowStr } from "./utils.js";

export const KEY_MAP  = "blindbox_mapping";
export const KEY_TIME = "blindbox_last_shuffle";

export function getMapping() { return getLocal(KEY_MAP, []); }
export function setMapping(m) { setLocal(KEY_MAP, m); }
export function getLastShuffle() { return getLocal(KEY_TIME, null); }
export function setLastShuffle(s) { setLocal(KEY_TIME, s); }

// Fisher–Yates 洗牌
export function reshuffleMapping() {
  const n = loadSongs().length;
  const mapping = Array.from({length: n}, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mapping[i], mapping[j]] = [mapping[j], mapping[i]];
  }
  setMapping(mapping);
  setLastShuffle(nowStr());
}

export function fixOrReshuffleMapping() {
  const n = loadSongs().length;
  const m = getMapping();
  if (!m || m.length !== n) reshuffleMapping();
}
