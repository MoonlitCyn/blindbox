// localStorage 安全读写封装
export function getLocal(key, defVal) {
  try {
    const v = localStorage.getItem(key);
    return v == null ? defVal : JSON.parse(v);
  } catch {
    return defVal;
  }
}

export function setLocal(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}
