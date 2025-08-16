const posts = {
  news: [
    { 
      title: "📡 Hacker VN News 2025", 
      content: "Tin tức mới nhất về an ninh mạng Việt Nam.", 
      link: "https://example.com/news1" 
    },
    { 
      title: "🔥 Zero-Day Exploit", 
      content: "Phát hiện lỗ hổng mới trong Windows.", 
      link: "https://example.com/news2" 
    }
  ],
  tutorials: [
    { 
      title: "💻 SQL Injection Tutorial", 
      code: "SELECT * FROM users WHERE username = 'admin' --;" 
    },
    { 
      title: "🔐 Password Cracking", 
      code: "hashcat -a 0 -m 0 hash.txt wordlist.txt" 
    }
  ],
  tools: [
    { 
      title: "🛠 Recon Tool", 
      displayCode: "python recon.py --target example.com",   // hiển thị trên web
      downloadCode: `# recon.py
import requests

def scan(target):
    print(f"Scanning target: {target}")
    try:
        r = requests.get(f"http://{target}")
        print("Status:", r.status_code)
    except:
        print("Error connecting")

if __name__ == "__main__":
    scan("example.com")`,
      filename: "recon.py"
    },
    { 
      title: "🐞 Exploit Framework", 
      displayCode: "python exploit.py --rhost 127.0.0.1 --rport 8080",  // hiển thị
      downloadCode: `# exploit.py
import socket

def exploit(rhost, rport):
    print(f"Exploiting {rhost}:{rport}")
    s = socket.socket()
    s.connect((rhost, int(rport)))
    payload = b"A" * 1024
    s.send(payload)
    print("Payload sent!")

if __name__ == "__main__":
    exploit("127.0.0.1", 8080)`,
      filename: "exploit.py"
    }
  ]
};

// ====== Utility functions ======
function copyCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    alert("✅ Code copied to clipboard!");
  });
}

function downloadCode(filename, code) {
  const blob = new Blob([code], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// ====== Render posts ======
function renderPosts() {
  // News
  document.getElementById("news").innerHTML = posts.news.map(p => `
    <div class="card">
      <h2>${p.title}</h2>
      <p>${p.content}</p>
      <button onclick="window.open('${p.link}','_blank')" class="tab-btn">Read</button>
    </div>
  `).join("");

  // Tutorials
  document.getElementById("tutorials").innerHTML = posts.tutorials.map(p => `
    <div class="card">
      <h2>${p.title}</h2>
      <pre><code class="language-bash">${p.code}</code></pre>
      <button onclick="copyCode(\`${p.code}\`)" class="tab-btn">Copy</button>
    </div>
  `).join("");

  // Tools
  document.getElementById("tools").innerHTML = posts.tools.map(p => `
    <div class="card">
      <h2>${p.title}</h2>
      <pre><code class="language-python">${p.displayCode}</code></pre>
      <button onclick="copyCode(\`${p.displayCode}\`)" class="tab-btn">Copy</button>
      <button onclick="downloadCode('${p.filename}', \`${p.downloadCode}\`)" class="tab-btn">Download</button>
    </div>
  `).join("");

  // Kích hoạt highlight.js
  document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
}

renderPosts();
