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
      code: "python recon.py --target example.com", 
      filename: "recon.py" 
    },
    { 
      title: "🐞 Exploit Framework", 
      code: "python exploit.py --rhost 127.0.0.1 --rport 8080", 
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
  // Render news
  const newsContainer = document.getElementById("news");
  newsContainer.innerHTML = posts.news.map(p => `
    <div class="card">
      <h2>${p.title}</h2>
      <p>${p.content}</p>
      <button onclick="window.open('${p.link}','_blank')" class="tab-btn">Read</button>
    </div>
  `).join("");

  // Render tutorials
  const tutorialContainer = document.getElementById("tutorials");
  tutorialContainer.innerHTML = posts.tutorials.map(p => `
    <div class="card">
      <h2>${p.title}</h2>
      <pre><code>${p.code}</code></pre>
      <button onclick="copyCode(\`${p.code}\`)" class="tab-btn">Copy</button>
    </div>
  `).join("");

  // Render tools
  const toolContainer = document.getElementById("tools");
  toolContainer.innerHTML = posts.tools.map(p => `
    <div class="card">
      <h2>${p.title}</h2>
      <pre><code>${p.code}</code></pre>
      <button onclick="copyCode(\`${p.code}\`)" class="tab-btn">Copy</button>
      <button onclick="downloadCode('${p.filename}', \`${p.code}\`)" class="tab-btn">Download</button>
    </div>
  `).join("");
}

renderPosts();
