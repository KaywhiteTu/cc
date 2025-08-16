document.addEventListener("DOMContentLoaded", function () {
  const posts = {
    news: `
      <div style="text-align: center; padding: 20px;">
        <h2 style="color:#f44336;">Tin tức mới nhất</h2>
        <p style="max-width: 900px; margin: 0 auto; line-height: 1.6; color: #e0e0e0;">
          Cập nhật tin tức an ninh mạng, các lỗ hổng bảo mật, và xu hướng hacking trên toàn thế giới.
        </p>
        <ul style="max-width: 800px; margin: 20px auto; text-align: left; color: #e0e0e0; line-height: 1.6;">
          <li>[2025-08] Lỗ hổng zero-day mới được phát hiện trên Windows 11.</li>
          <li>[2025-07] Hacker Malware Team ra mắt công cụ test bảo mật phiên bản 2.0.</li>
          <li>[2025-06] Nhiều website chính phủ bị tấn công DDoS.</li>
        </ul>
      </div>
    `,
    tutorials: `
      <div style="text-align: center; padding: 20px;">
        <h2 style="color:#f44336;">Hướng dẫn & Tutorials</h2>
        <p style="max-width: 900px; margin: 0 auto; line-height: 1.6; color: #e0e0e0;">
          Chia sẻ kiến thức về bảo mật, khai thác lỗ hổng, viết tool, và kỹ thuật tấn công/phòng thủ trong thực tế.
        </p>
        <ul style="max-width: 800px; margin: 20px auto; text-align: left; color: #e0e0e0; line-height: 1.6;">
          <li>Hướng dẫn cơ bản về SQL Injection (SQLi).</li>
          <li>Cách sử dụng Burp Suite để kiểm tra bảo mật web.</li>
          <li>Viết script Python để tự động hóa scanning.</li>
        </ul>
      </div>
    `,
    tools: `
      <div style="text-align: center; padding: 20px;">
        <h2 style="color:#f44336;">Tools & Công cụ</h2>
        <p style="max-width: 900px; margin: 0 auto; line-height: 1.6; color: #e0e0e0;">
          Các công cụ do Hacker Malware Team phát triển và chia sẻ, phục vụ cho việc nghiên cứu bảo mật và 
          học tập hacking có trách nhiệm.
        </p>
        <ul style="max-width: 800px; margin: 20px auto; text-align: left; color: #e0e0e0; line-height: 1.6;">
          <li><b>ReconTool</b> - Công cụ thu thập thông tin mục tiêu.</li>
          <li><b>ExploitKit</b> - Framework thử nghiệm khai thác lỗ hổng.</li>
          <li><b>AutoDDoS</b> - Công cụ mô phỏng tấn công từ chối dịch vụ (chỉ dùng cho lab).</li>
        </ul>
      </div>
    `
  };

  function showTab(tab) {
    document.getElementById("content").innerHTML = posts[tab];
  }

  // Mặc định hiển thị News
  showTab("news");

  // Sự kiện click
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const tab = this.getAttribute("data-tab");
      showTab(tab);
    });
  });
});
