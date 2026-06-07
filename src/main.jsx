import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/* ──────────────────────────────────────────────────────────────────────
   storage shim
   원본은 Claude 아티팩트의 window.storage(서버 영구 저장)를 사용합니다.
   일반 웹에서는 그 API가 없으므로 동일한 비동기 인터페이스를
   브라우저 localStorage로 구현합니다.
   ⚠️ 데이터는 "방문자 브라우저"에만 저장됩니다.
      (회원/게시판이 여러 사용자 간 실시간 공유되지는 않습니다.)
   ────────────────────────────────────────────────────────────────────── */
(() => {
  if (window.storage) return;
  const ls = window.localStorage;
  const P = "lms:";
  window.storage = {
    async get(key) {
      const v = ls.getItem(P + key);
      return v === null ? null : { key, value: v };
    },
    async set(key, value /*, shared */) {
      ls.setItem(P + key, value);
      return { key, value };
    },
    async delete(key /*, shared */) {
      ls.removeItem(P + key);
      return { key, deleted: true };
    },
    async list(prefix = "" /*, shared */) {
      const keys = [];
      for (let i = 0; i < ls.length; i++) {
        const k = ls.key(i);
        if (k && k.startsWith(P)) {
          const real = k.slice(P.length);
          if (real.startsWith(prefix)) keys.push(real);
        }
      }
      return { keys, prefix };
    },
  };
})();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
