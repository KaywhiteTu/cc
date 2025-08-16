var posts = [];

/* === Giới thiệu === */
posts.push({
  tab:"intro",
  title:"👥 Hacker Malware Team",
  date:"2025-08-01",
  author:"Admin",
  tag:"Intro",
  tagColor:"#9C27B0",
  content:`
    <p>Chào mừng bạn đến với <b>Hacker Malware Team</b> – một nhóm hacker hoạt động trong lĩnh vực khai thác và nghiên cứu bảo mật. 
    Đây là nơi chia sẻ kiến thức, tool và kinh nghiệm thực tế.</p>
    <p>Chúng tôi không chịu trách nhiệm về việc lạm dụng thông tin.</p>
  `
});

/* === News === */
posts.push({
  tab:"news",
  title:"🚨 Hacker Malware Team Ra Mắt",
  date:"2025-08-02",
  author:"TC3B4",
  tag:"News",
  tagColor:"#2196F3",
  content:`
    <p>Hacker Malware Team chính thức ra mắt diễn đàn công khai.</p>
  `
});

posts.push({
  tab:"news",
  title:"🌐 Deface 10 Website Liên Tiếp",
  date:"2025-08-05",
  author:"Anon",
  tag:"News",
  tagColor:"#2196F3",
  content:`
    <p>Nhóm vừa hoàn thành một đợt deface 10 site nhỏ để test hệ thống.</p>
  `
});

/* === Tutorials === */
posts.push({
  tab:"tutorials",
  title:"💻 Python Exploit Cơ Bản",
  date:"2025-08-07",
  author:"TC3B4",
  tag:"Tutorial",
  tagColor:"#FFC107",
  content:`
    <pre><code class="language-python">
print("Hello Hacker Malware")
    </code></pre>
  `
});

posts.push({
  tab:"tutorials",
  title:"📜 Hướng Dẫn SQL Injection",
  date:"2025-08-09",
  author:"Admin",
  tag:"Tutorial",
  tagColor:"#FFC107",
  content:`
    <p>Bài viết hướng dẫn kỹ thuật SQL Injection cơ bản.</p>
  `
});

/* === Tools === */
posts.push({
  tab:"tools",
  title:"🛠 SQL Injection Scanner",
  date:"2025-08-11",
  author:"TC3B4",
  tag:"Tool",
  tagColor:"#FF9800",
  content:`
    <pre><code class="language-python">
import requests
url = "http://target.com/index.php?id=1"
payload = "' OR '1'='1"
r = requests.get(url+payload)
print(r.text)
    </code></pre>
  `
});

posts.push({
  tab:"tools",
  title:"🔑 Brute Force Tool",
  date:"2025-08-12",
  author:"Anon",
  tag:"Tool",
  tagColor:"#FF9800",
  content:`
    <p>Tool brute force cơ bản với wordlist.</p>
  `
});
