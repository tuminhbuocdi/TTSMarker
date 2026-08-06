# TTS Studio — Trang giới thiệu (static)

Web tĩnh HTML/CSS, không cần build. Deploy lên Cloudflare Pages, GitHub Pages hoặc Nginx.

## Assets

- `assets/images/home.png` — Màn hình chào mừng
- `assets/images/tts-audio.png` — Tab Chuyển đổi Audio
- `assets/images/dubbing.png` — Tab Lồng Tiếng

Khi cập nhật UI app, chụp lại screenshot và thay file tương ứng.

## Hỗ trợ

- Trang `/support` — danh sách kênh liên hệ (sửa `js/support-data.js` để thêm link mới).
- App desktop luôn mở `https://tts-marker.vercel.app/support` — không cần cập nhật app khi đổi kênh hỗ trợ.

## Chạy local

Mở `index.html` bằng trình duyệt, hoặc:

```bash
cd tts-studio-site
python -m http.server 8080
```

Truy cập http://localhost:8080

## Deploy

Upload toàn bộ thư mục lên static hosting. Giữ đường dẫn tương đối `css/` và `guides/` như hiện tại.
