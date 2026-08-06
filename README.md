# TTS Studio — Trang giới thiệu (static)

Web tĩnh HTML/CSS cho [TTS Studio](https://github.com/tuminhbuocdi/TTSMarker). Không cần build.

**Live (GitHub Pages):** bật Pages trong repo → Settings → Pages → Branch `main`, folder `/ (root)`.

## Assets

- `assets/images/home.png` — Màn hình chào mừng
- `assets/images/tts-audio.png` — Tab Chuyển đổi Audio
- `assets/images/dubbing.png` — Tab Lồng Tiếng

Khi cập nhật UI app, chụp lại screenshot và thay file tương ứng.

## Chạy local

Mở `index.html` bằng trình duyệt, hoặc:

```bash
cd tts-studio-site
python -m http.server 8080
```

Truy cập http://localhost:8080

## Deploy

Upload toàn bộ thư mục lên static hosting. Giữ đường dẫn tương đối `css/` và `guides/` như hiện tại.
