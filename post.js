// post.js
const posts = [
  {
    category: "news",
    title: "Hacker Malware Team phát triển tool mới",
    content: "Nhóm vừa ra mắt một tool quét lỗ hổng mới hỗ trợ tự động nhận diện SQL Injection, XSS và RCE.",
    date: "2025-08-16"
  },
  {
    category: "news",
    title: "Cập nhật tình hình diễn đàn",
    content: "Diễn đàn Hacker Malware đã được cập nhật với giao diện mới, hỗ trợ phân loại bài viết theo từng tab.",
    date: "2025-08-15"
  },
  {
    category: "tutorials",
    title: "Hướng dẫn cơ bản về SQL Injection",
    content: "Trong bài viết này, chúng ta sẽ tìm hiểu cách thức hoạt động của SQL Injection và các kỹ thuật bypass cơ bản.",
    date: "2025-08-14"
  },
  {
    category: "tutorials",
    title: "Tutorial: Sử dụng BurpSuite để khai thác XSS",
    content: "BurpSuite là một công cụ mạnh mẽ để phân tích và khai thác lỗ hổng XSS. Đây là hướng dẫn chi tiết cách thực hiện.",
    date: "2025-08-12"
  },
  {
    category: "tools",
    title: "Tool: Auto Exploit Framework",
    content: "Framework khai thác tự động do team phát triển, hỗ trợ nhiều module như SQLi, LFI, RFI, XSS.",
    date: "2025-08-10"
  },
  {
    category: "tools",
    title: "Tool: Cookie Stealer JS",
    content: "Một script đơn giản giúp thu thập cookie của victim thông qua XSS attack.",
    date: "2025-08-08"
  }
];

// Load bài viết theo tab
function loadPosts() {
  ["news", "tutorials", "tools"].forEach(cat => {
    const container = document.getElementById(cat);
    container.innerHTML = ""; 

    const filtered = posts.filter(p => p.category === cat);
    filtered.forEach(p => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h2>${p.title}</h2>
        <p>${p.content}</p>
        <div class="meta">📅 ${p.date}</div>
      `;
      container.appendChild(card);
    });
  });
}

// Tab control
function openTab(tab) {
  document.querySelectorAll(".tab-content").forEach(c => c.style.display = "none");
  document.getElementById(tab).style.display = "block";
}

// Khi load xong thì mở tab "team" mặc định
document.addEventListener("DOMContentLoaded", () => {
  loadPosts();
  openTab("team");
});
