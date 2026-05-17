window.api = {
  async get(path) {
    const res = await fetch(path);
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`GET ${path} -> ${res.status}: ${body}`);
    }
    return res.json();
  },
  async post(path, body) {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body || {}),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`POST ${path} -> ${res.status}: ${text}`);
    }
    return res.json();
  },
  async del(path) {
    const res = await fetch(path, { method: "DELETE" });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`DELETE ${path} -> ${res.status}: ${text}`);
    }
    return true;
  },
};

window.pantry = {
  KEY: "pantry-plate.pantry",
  get() {
    try {
      const v = JSON.parse(localStorage.getItem(this.KEY) || "[]");
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  },
  set(list) {
    localStorage.setItem(this.KEY, JSON.stringify(list));
  },
  add(item) {
    const cleaned = String(item || "").trim().toLowerCase();
    if (!cleaned) return false;
    const list = this.get();
    if (list.includes(cleaned)) return false;
    list.push(cleaned);
    this.set(list);
    return true;
  },
  remove(item) {
    this.set(this.get().filter((x) => x !== item));
  },
  clear() {
    this.set([]);
  },
};

window.setStatus = function setStatus(elId, text, kind) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = text || "";
  el.classList.remove("error", "success");
  if (kind) el.classList.add(kind);
};
