const posts = {
  news: [
    { title: "Cập nhật lỗ hổng mới CVE-2025-1234", content: "Mô tả về lỗ hổng mới và cách khai thác...", date: "2025-08-15" }
  ],
  tutorials: [
    { title: "Hướng dẫn SQL Injection cơ bản", content: "SQLi là một trong những lỗ hổng phổ biến...", date: "2025-08-10" }
  ],
  tools: [
    { title: "Tool BruteForce v1.0", content: "Công cụ brute force hỗ trợ SSH, FTP, RDP...", date: "2025-08-12" }
  ]
};

function renderPosts() {
  for (let section in posts) {
    let container = document.getElementById(section);
    if (container) {
      posts[section].forEach(p => {
        container.innerHTML += `
          <div class="card">
            <h2>${p.title}</h2>
            <p>${p.content}</p>
            <div class="meta">📅 ${p.date}</div>
          </div>
        `;
      });
    }
  }
}

renderPosts();
