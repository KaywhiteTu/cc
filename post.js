// ================== POSTS DATA ==================
const posts = {
  news: [
    {
      title: "Zero-Day mới trên Windows",
      content: "Một lỗ hổng zero-day vừa được công bố, cho phép attacker leo thang đặc quyền.",
      link: "https://thehackernews.com/"
    }
  ],

  tutorials: [
    {
      title: "SQL Injection cơ bản",
      content: "Hướng dẫn cách khai thác SQL Injection trên web app không an toàn.",
      code: "' OR '1'='1\n' UNION SELECT null, username, password FROM users --"
    }
  ],

  tools: [
    {
      title: "Port Scanner",
      content: "Tool scan port đơn giản với Python.",
      code:
`import socket

target = "127.0.0.1"
for port in range(1,1000):
    s = socket.socket()
    s.settimeout(0.5)
    try:
        s.connect((target, port))
        print("Port open:", port)
    except:
        pass`,
      filename: "port_scanner.py"
    }
  ]
};

// ================== RENDER POSTS ==================
function renderPosts() {
  // News
  const newsContainer = document.getElementById("news");
  posts.news.forEach(post => {
    newsContainer.innerHTML += `
      <div class="card">
        <h2>📡 ${post.title}</h2>
        <p>${post.content}</p>
        <a href="${post.link}" target="_blank">
          <button class="btn read-btn">🔗 Read More</button>
        </a>
      </div>`;
  });

  // Tutorials
  const newsContainer = document.getElementById("tutorials");
  posts.tutorials.forEach(post => {
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.className = "language-sql";
    code.textContent = post.code; // giữ format, highlight ok
    pre.appendChild(code);
  
    tutContainer.appendChild(makeCard(post.title, post.content, pre, post.code));
  });
  
  // Tools
  const newsContainer = document.getElementById("tools");
  posts.tools.forEach(post => {
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.className = "language-python";
    code.textContent = post.code; // <-- sửa innerText => textContent
    pre.appendChild(code);
  
    toolContainer.appendChild(makeCard(post.title, post.content, pre, post.code, post.filename));
  });


  hljs.highlightAll();
}

// ================== HELPERS ==================
function makeCard(title, content, preEl, codeStr, filename) {
  const card = document.createElement("div");
  card.className = "card";

  const h2 = document.createElement("h2");
  h2.textContent = title;
  const p = document.createElement("p");
  p.textContent = content;

  card.appendChild(h2);
  card.appendChild(p);
  card.appendChild(preEl);

  // copy button
  const copyBtn = document.createElement("button");
  copyBtn.className = "btn copy-btn";
  copyBtn.textContent = "📋 Copy";
  copyBtn.onclick = () => copyCode(codeStr);
  card.appendChild(copyBtn);

  // download button (nếu có filename)
  if (filename) {
    const dlBtn = document.createElement("button");
    dlBtn.className = "btn download-btn";
    dlBtn.textContent = "⬇ Download";
    dlBtn.onclick = () => downloadCode(codeStr, filename);
    card.appendChild(dlBtn);
  }

  return card;
}

// ================== FUNCTIONS ==================
function copyCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    alert("✅ Code copied to clipboard!");
  });
}

function downloadCode(code, filename) {
  const blob = new Blob([code], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".content").forEach(c => c.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add("active");
}

document.addEventListener("DOMContentLoaded", renderPosts);
