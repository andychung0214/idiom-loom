# 字字成章（Idiom Loom）

純 HTML、CSS 與 Vanilla JavaScript 製作的交錯成語填空遊戲。選擇入門、熟手或博學難度，點選空格並從候選字盤填字；完成後可由連結查詢教育部《成語典》。

## 執行與測試

不需安裝套件。以任一靜態 HTTP 伺服器開啟專案根目錄，例如 `python -m http.server 4173`，再瀏覽 `http://localhost:4173`。執行 `npm test` 驗證題組、盤面、填答、提示與重設；執行 `npm run check:data` 檢查所有題組。

## 操作

選擇難度後，點選空白字格，再選候選字。可使用「揭示一字」與「重設本局」。按 Esc 取消選取；所有按鈕皆可用 Tab 與 Enter 操作。

## 專案結構

`scripts/data` 為題組，`scripts/game` 為純遊戲邏輯，`scripts/ui` 為畫面，`tests` 為 Node.js 內建測試。`styles` 儲存視覺變數與響應式樣式。

## GitHub Pages

將本分支合併至 `main` 後，在 GitHub Repository Settings → Pages 選擇 **Deploy from a branch**、`main`、`/(root)`。所有資源皆使用相對路徑。

## 限制與授權

首版使用人工整理的內建題庫，沒有帳號、雲端排行榜與即時擷取成語資料。題庫僅含成語和自撰提示；教育部《成語典》內容及其著作權歸原權利人所有。本專案程式碼採 [MIT License](LICENSE)。
