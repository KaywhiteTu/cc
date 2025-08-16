// ======== post.js (drop-in, paste code thẳng) ========
(function () {
  // ---- DỮ LIỆU MẪU (sửa tùy ý). Dán code thẳng vào giữa cặp backtick ` ... ` ----
  const posts = {
    news: [
      {
        title: "Thông báo diễn đàn",
        summary: "Ra mắt giao diện tab mới: News / Tutorials / Tools.",
        link: "#", // đổi sang link thật nếu có
      },
      {
        title: "Cập nhật hệ thống",
        summary: "Tối ưu tốc độ tải và bổ sung nút Download cho Tools.",
        link: "#",
      },
    ],

    tutorials: [
      {
        title: "Ví dụ Python cơ bản",
        lang: "python",
        code: `
# demo.py
def hello():
    print("Hello, world!")

if __name__ == "__main__":
    hello()
        `,
      },
      {
        title: "Shell script demo",
        lang: "bash",
        code: `
#!/usr/bin/env bash
echo "This is a demo script"
        `,
      },
    ],

    tools: [
      {
        title: "Tool CLI ví dụ",
        lang: "bash",
        // Code HIỂN THỊ (snippet)
        displayCode: `
./tool.sh --input data.txt --verbose
        `,
        // Code TẢI VỀ (full file)
        downloadCode: `
#!/usr/bin/env bash
# tool.sh - demo CLI tool
set -e

usage() {
  echo "Usage: $0 --input <file> [--verbose]"
}

INPUT=""
VERBOSE=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --input) INPUT="$2"; shift 2 ;;
    --verbose) VERBOSE=1; shift ;;
    *) echo "Unknown arg: $1"; usage; exit 1 ;;
  esac
done

[[ -z "$INPUT" ]] && { echo "Missing --input"; usage; exit 1; }

[[ $VERBOSE -eq 1 ]] && echo "[*] Processing: $INPUT"
wc -l "$INPUT"
        `,
        filename: "tool.sh",
      },
      {
        title: "Tool Python ví dụ",
        lang: "python",
        displayCode: `
python app.py --file sample.json
        `,
        downloadCode: `
# app.py - demo tool
import argparse, json, sys

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--file", required=True)
    args = p.parse_args()

    with open(args.file, "r", encoding="utf-8") as f:
        data = json.load(f)
    print("Keys:", list(data.keys()))

if __name__ == "__main__":
    main()
        `,
        filename: "app.py",
      },
    ],
  };

  // --- Map để giữ code tải về theo codeId, tránh nhét chuỗi dài vào HTML ---
  const downloadMap = {};

  // ---- RENDER NEWS ----
  function renderNews() {
    const el = document.getElementById("news");
    if (!el) return;
    el.innerHTML = posts.news
      .map(
        (p, i) => `
      <div class="card">
        <h2>${p.title}</h2>
        <p>${p.summary}</p>
        <button class="btn-sm" data-read="${p.link || "#"}">Read</button>
      </div>
    `
      )
      .join("");
  }

  // ---- RENDER TUTORIALS (code + Copy) ----
  function renderTutorials() {
    const el = document.getElementById("tutorials");
    if (!el) return;
    el.innerHTML = posts.tutorials
      .map((p, i) => {
        const codeId = `tut-code-${i}`;
        // chèn khung, còn textContent sẽ set sau để không cần escape
        return `
        <div class="card">
          <h2>${p.title}</h2>
          <pre><code id="${codeId}" class="language-${p.lang || "plaintext"}"></code></pre>
          <button class="btn-sm" data-copy="${codeId}">Copy</button>
        </div>
      `;
      })
      .join("");

    // set textContent để giữ nguyên format y như dán từ VSCode
    posts.tutorials.forEach((p, i) => {
      const codeId = `tut-code-${i}`;
      const node = document.getElementById(codeId);
      if (node) node.textContent = (p.code || "").trim();
    });
  }

  // ---- RENDER TOOLS (displayCode + Copy + Download dùng downloadCode) ----
  function renderTools() {
    const el = document.getElementById("tools");
    if (!el) return;
    el.innerHTML = posts.tools
      .map((p, i) => {
        const codeId = `tool-code-${i}`;
        // Lưu code tải về vào map (ưu tiên downloadCode; fallback displayCode)
        downloadMap[codeId] = (p.downloadCode || p.displayCode || "").trim();

        return `
        <div class="card">
          <h2>${p.title}</h2>
          <pre><code id="${codeId}" class="language-${p.lang || "plaintext"}"></code></pre>
          <button class="btn-sm" data-copy="${codeId}">Copy</button>
          <button class="btn-sm" data-download="${codeId}" data-filename="${p.filename || "code.txt"}">Download</button>
        </div>
      `;
      })
      .join("");

    // set textContent cho phần hiển thị
    posts.tools.forEach((p, i) => {
      const codeId = `tool-code-${i}`;
      const node = document.getElementById(codeId);
      if (node) node.textContent = (p.displayCode || p.downloadCode || "").trim();
    });
  }

  // ---- ACTIONS (Copy / Download / Read) ----
  function wireActions() {
    // Copy
    document.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-copy");
        const node = document.getElementById(id);
        if (!node) return;
        const code = node.textContent;
        navigator.clipboard
          .writeText(code)
          .then(() => (btn.textContent = "✅ Copied"))
          .catch(() => alert("Copy thất bại"));
        setTimeout(() => (btn.textContent = "Copy"), 1200);
      });
    });

    // Download (lấy đúng code từ downloadMap)
    document.querySelectorAll("[data-download]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-download");
        const filename = btn.getAttribute("data-filename") || "code.txt";
        const code = downloadMap[id] || "";
        const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    });

    // Read
    document.querySelectorAll("[data-read]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const url = btn.getAttribute("data-read") || "#";
        window.open(url, "_blank");
      });
    });
  }

  // ---- INIT ----
  function init() {
    renderNews();
    renderTutorials();
    renderTools();
    wireActions();
    // bật highlight nếu có highlight.js
    if (window.hljs && typeof hljs.highlightAll === "function") {
      hljs.highlightAll();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
