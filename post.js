const posts = {
  news: [
    { title: "📡 Hacker VN News 2025", content: "Tin tức mới nhất về an ninh mạng Việt Nam." },
    { title: "🔥 Zero-Day Exploit", content: "Phát hiện lỗ hổng mới trong Windows." }
  ],
  tutorials: [
    { title: "💻 SQL Injection Tutorial", content: "Hướng dẫn chi tiết cách khai thác SQLi." },
    { title: "🔐 Password Cracking", content: "Giới thiệu các kỹ thuật brute-force và wordlist." }
  ],
  tools: [
    { title: "🛠 Recon Tool", content: "Tool thu thập thông tin mục tiêu." },
    { title: "🐞 Exploit Framework", content: "Framework khai thác lỗ hổng." }
  ]
};

function renderPosts() {
  Object.keys(posts).forEach(tab => {
    const container = document.getElementById(tab);
    if (container) {
      container.innerHTML = posts[tab].map(p => `
        <div class="card">
          <h2>${p.title}</h2>
          <p>${p.content}</p>
        </div>
      `).join("");
    }
  });
}

renderPosts();
