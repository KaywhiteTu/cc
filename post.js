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
      code: `# SQLi Test Payload
' OR '1'='1
' UNION SELECT null, username, password FROM users --`
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
  const tutContainer = document.getElementById("tutorials");
  posts.tutorials.forEach(post => {
    tutContainer.innerHTML += `
      <div class="card">
        <h2>💻 ${post.title}</h2>
        <p>${post.content}</p>
        <pre><code class="language-python">${post.code}</code></pre>
        <button class="btn copy-btn" onclick="copyCode(\`${post.code}\`)">📋 Copy</button>
      </div>`;
  });

  // Tools
  const toolContainer = document.getElementById("tools");
  posts.tools.forEach(post => {
    toolContainer.innerHTML += `
      <div class="card">
        <h2>🛠 ${post.title}</h2>
        <p>${post.content}</p>
        <pre><code class="language-python">${post.code}</code></pre>
        <button class="btn copy-btn" onclick="copyCode(\`${post.code}\`)">📋 Copy</button>
        <button class="btn download-btn" onclick="downloadCode(\`${post.code}\`, '${post.filename}')">⬇ Download</button>
      </div>`;
  });

  // Highlight all code blocks
  hljs.highlightAll();
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

// Run
document.addEventListener("DOMContentLoaded", renderPosts);
