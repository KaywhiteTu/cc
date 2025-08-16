// ================== POSTS DATA (giữ nguyên cấu trúc như bạn đang dùng) ==================
const posts = {
  news: [
    {
      title: "Zero-Day mới trên Windows",
      content:
        "Một lỗ hổng zero-day vừa được công bố, cho phép attacker leo thang đặc quyền thông qua dịch vụ Print Spooler.",
      link: "https://thehackernews.com/",
    },
    {
      title: "Anonymous tấn công chính phủ",
      content:
        "Nhóm hacker Anonymous đã công bố dữ liệu từ nhiều website chính phủ sau chiến dịch tấn công DDoS.",
      link: "https://www.reuters.com/",
    },
  ],

  tutorials: [
    {
      title: "SQL Injection cơ bản",
      content:
        "Hướng dẫn cách khai thác SQL Injection trên các ứng dụng web không an toàn.",
      code: `# SQLi Test Payload
' OR '1'='1
' UNION SELECT null, username, password FROM users --`,
      lang: "sql",
    },
    {
      title: "Bypass WAF cơ bản",
      content:
        "Cách vượt qua một số Web Application Firewall phổ biến bằng cách encode payload.",
      code: `# WAF Bypass Payload
admin'/**/OR/**/'1'='1
<script>alert(1)</script>`,
      lang: "plaintext",
    },
  ],

  tools: [
    {
      title: "Brute Force Facebook",
      content:
        "Tool Python brute-force login Facebook (dùng cho mục đích nghiên cứu).",
      code: `import requests

url = "https://facebook.com/login"
for pwd in ["123456", "password", "letmein"]:
    r = requests.post(url, data={"email":"victim","pass":pwd})
    if "Welcome" in r.text:
        print("Found password:", pwd)
        break`,
      download: "https://example.com/fb_bruteforce.py",
      lang: "python",
      filename: "fb_bruteforce.py",
    },
    {
      title: "Port Scanner",
      content: "Tool scan port đơn giản với Python.",
      code: `import socket

target = "127.0.0.1"
for port in range(1,1000):
    s = socket.socket()
    s.settimeout(0.5)
    try:
        s.connect((target, port))
        print("Port open:", port)
    except:
        pass`,
      download: "https://example.com/port_scanner.py",
      lang: "python",
      filename: "port_scanner.py",
    },
  ],
};

// ================== UTILS (an toàn) ==================
function safeURL(url) {
  try {
    const u = new URL(url, location.href);
    if (u.protocol === "http:" || u.protocol === "https:") return u.href;
  } catch (_) {}
  return "#";
}
function el(tag, cls) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
}

// ================== RENDER (không dùng innerHTML cho dữ liệu động) ==================
function renderNews() {
  const wrap = document.getElementById("news");
  if (!wrap) return;
  wrap.innerHTML = ""; // khung rỗng

  posts.news.forEach((p) => {
    const card = el("div", "card");

    const h2 = el("h2");
    h2.textContent = "📡 " + (p.title || "");
    const desc = el("p");
    desc.textContent = p.content || "";

    const a = el("a");
    a.href = safeURL(p.link || "#");
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const btn = el("button", "btn read-btn");
    btn.textContent = "🔗 Read More";
    a.appendChild(btn);

    card.append(h2, desc, a);
    wrap.appendChild(card);
  });
}

function renderTutorials() {
  const wrap = document.getElementById("tutorials");
  if (!wrap) return;
  wrap.innerHTML = "";

  posts.tutorials.forEach((p, i) => {
    const card = el("div", "card");
    const h2 = el("h2");
    h2.textContent = "💻 " + (p.title || "");
    const desc = el("p");
    desc.textContent = p.content || "";

    // code block
    const pre = el("pre");
    const code = el("code");
    code.id = `tut-${i}`;
    if (p.lang) code.className = `language-${p.lang}`;
    // QUAN TRỌNG: dùng textContent để không thực thi payload
    code.textContent = (p.code || "").trim();
    pre.appendChild(code);

    const copy = el("button", "btn copy-btn");
    copy.textContent = "📋 Copy";
    copy.dataset.copy = code.id;

    card.append(h2, desc, pre, copy);
    wrap.appendChild(card);
  });
}

const downloadMap = {};
function renderTools() {
  const wrap = document.getElementById("tools");
  if (!wrap) return;
  wrap.innerHTML = "";

  posts.tools.forEach((p, i) => {
    const card = el("div", "card");
    const h2 = el("h2");
    h2.textContent = "🛠 " + (p.title || "");
    const desc = el("p");
    desc.textContent = p.content || "";

    const pre = el("pre");
    const code = el("code");
    code.id = `tool-${i}`;
    if (p.lang) code.className = `language-${p.lang}`;
    code.textContent = (p.code || "").trim(); // không thực thi
    pre.appendChild(code);

    const copy = el("button", "btn copy-btn");
    copy.textContent = "📋 Copy";
    copy.dataset.copy = code.id;

    const dl = el("button", "btn download-btn");
    dl.textContent = "⬇ Download";
    dl.dataset.download = code.id;
    dl.dataset.filename = p.filename || "code.txt";
    downloadMap[code.id] = (p.download || p.code || "").trim();

    card.append(h2, desc, pre, copy, dl);
    wrap.appendChild(card);
  });
}

// ================== HÀNH ĐỘNG (Copy/Download an toàn) ==================
function wireActions() {
  document.addEventListener("click", (e) => {
    // Copy
    if (e.target.matches("[data-copy]")) {
      const id = e.target.getAttribute("data-copy");
      const node = document.getElementById(id);
      if (!node) return;
      const txt = node.textContent;
      navigator.clipboard
        .writeText(txt)
        .then(() => {
          e.target.textContent = "✅ Copied";
          setTimeout(() => (e.target.textContent = "📋 Copy"), 1200);
        })
        .catch(() => alert("Copy thất bại"));
    }

    // Download
    if (e.target.matches("[data-download]")) {
      const id = e.target.getAttribute("data-download");
      const filename = e.target.getAttribute("data-filename") || "code.txt";
      const content = downloadMap[id] || "";
      const blob = new Blob([content], {
        type: "text/plain;charset=utf-8",
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  });
}

// ================== INIT ==================
function init() {
  renderNews();
  renderTutorials();
  renderTools();
  wireActions();

  if (window.hljs && typeof hljs.highlightAll === "function") {
    hljs.highlightAll();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
