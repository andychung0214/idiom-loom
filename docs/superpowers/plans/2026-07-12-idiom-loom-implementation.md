# 《字字成章》Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建構可於靜態網站託管環境執行、支援三段難度與行動觸控的交錯式成語填空遊戲。

**Architecture:** 題庫與固定盤面以資料模組定義；`game` 模組只處理可測試的資料驗證與狀態轉換；`ui` 模組把狀態渲染為可存取 DOM，並將操作轉回主程式。localStorage 與 Web Audio API 以可失敗的服務模組封裝，失敗時降級而不中斷遊戲。

**Tech Stack:** HTML、CSS、Vanilla JavaScript ES Modules、Node.js 內建 `node:test`、Web Audio API、localStorage。

## Global Constraints

- 僅使用 HTML、CSS、Vanilla JavaScript，不加入 React、Angular、Vue、TypeScript、後端服務或大型遊戲引擎。
- 所有資料檔只含成語、自撰提示與教育部查詢關鍵字，不複製官方釋義。
- 手機、平板、桌機皆可使用；主要觸控目標至少 44×44 CSS 像素。
- 所有領域邏輯先寫失敗測試，再寫最小程式碼讓測試通過。
- 不讀取、輸出、提交或推送憑證、token、`.env` 或私人金鑰。

---

## 檔案結構

| 路徑 | 責任 |
|---|---|
| `index.html` | 頁面骨架、Meta、Open Graph、Product JSON-LD |
| `styles/tokens.css`、`styles/game.css` | 視覺變數、版面、元件、響應式與減少動態 |
| `scripts/data/puzzles.js` | 題組與難度資料 |
| `scripts/game/puzzle.js` | 題組驗證、盤面、候選字與抽題 |
| `scripts/game/state.js` | 填答、提示、重設、分數與完成狀態 |
| `scripts/services/` | localStorage 與音效降級 |
| `scripts/ui/render.js`、`scripts/main.js` | 渲染與事件控制 |
| `tests/` | `node:test` 單元測試 |

### Task 1: 建立測試骨架與題組資料

**Files:** Create `package.json`, `.gitignore`, `scripts/data/puzzles.js`, `scripts/game/puzzle.js`, `tests/puzzle.test.js`。

- [ ] 寫測試要求 `validatePuzzle()` 拒絕交叉字不一致、越界或非四字答案，並先執行 `npm test -- tests/puzzle.test.js` 確認因模組不存在而失敗。
- [ ] 實作 `validatePuzzle(puzzle)`、`buildBoard(puzzle, blankCount)`、`buildChoices(board, decoys)`、`pickPuzzle(puzzles, difficulty, previousId)`，建立各難度至少兩盤人工驗證題組。
- [ ] 執行 `npm test`，確認所有題組有效且抽題不立即重複。
- [ ] 提交：`feat: 建立成語題組與驗證機制`。

### Task 2: 以 TDD 完成遊戲狀態

**Files:** Create `scripts/game/state.js`, `tests/state.test.js`。

- [ ] 先寫 `answerCell` 正確字鎖定與加分、錯字不覆寫並中斷連續答對、`useHint` 扣除提示且降低得分、`resetGame` 清空進度的測試；執行並確認失敗。
- [ ] 實作 `createGameState(board, difficulty)`、`answerCell(state, cellId, character)`、`useHint(state, cellId)`、`resetGame(state)`，所有轉換保持不可變。
- [ ] 執行 `npm test`；測試完成狀態、提示耗盡與已鎖定字格。
- [ ] 提交：`feat: 完成填答提示與計分狀態`。

### Task 3: 以 TDD 完成偏好與音效服務

**Files:** Create `scripts/services/preferences.js`, `scripts/services/audio.js`, `tests/preferences.test.js`。

- [ ] 先寫 localStorage 丟出例外時回傳預設偏好的測試，確認測試失敗。
- [ ] 實作安全的 `loadPreferences(storage)` 與 `savePreferences(storage, preferences)`；封裝 Web Audio API，無法建立音效時回傳 no-op 函式。
- [ ] 執行 `npm test`，確認服務故障不影響遊戲。
- [ ] 提交：`feat: 加入偏好儲存與音效降級`。

### Task 4: 建構語意化頁面與視覺系統

**Files:** Create `index.html`, `styles/tokens.css`, `styles/game.css`, `scripts/ui/render.js`。

- [ ] 建立含 Meta、Open Graph、JSON-LD、`main`、狀態通知與無 JavaScript 提示的頁面骨架。
- [ ] 套用深墨藍、和紙米白、朱砂紅、黃銅色與系統日系字型堆疊；做出米白字格、墨色格線、朱砂落印、候選字盤與結算紙卡。
- [ ] 實作 `renderApp(root, model)`，使用 `data-action`、`data-cell-id`，提供選難度、遊戲、結算三個畫面與可讀名稱。
- [ ] 以 `npx --yes serve . -l 4173` 開啟後確認首頁與所有資源無 404。
- [ ] 提交：`feat: 建立昭和風格遊戲介面`。

### Task 5: 串接完整遊戲循環

**Files:** Create `scripts/main.js`; Modify `index.html`, `scripts/ui/render.js`。

- [ ] 以事件委派實作難度選取、字格選取、候選字、提示、重設、下一局與音效切換。
- [ ] 支援 Tab、方向鍵、Enter、Esc；於正確、錯誤與完成時發出簡短 `aria-live` 訊息。
- [ ] 於結算畫面列出成語與教育部查詢連結；處理外部連結安全屬性。
- [ ] 以本機伺服器完成入門盤全流程、重設、提示、結算與下一局，檢查主控台無錯誤。
- [ ] 提交：`feat: 串接完整成語填空流程`。

### Task 6: 完成文件與部署設定

**Files:** Create `README.md`, `docs/ART-DIRECTION.md`, `docs/TEST-PLAN.md`, `CONTRIBUTING.md`, `LICENSE`, `robots.txt`, `sitemap.xml`；Modify `docs/PLAN.md`。

- [ ] README 涵蓋介紹、特色、操作、安裝、結構、測試、GitHub Pages、已知限制與授權。
- [ ] 視覺方向文件記錄色票、字體、元件、動畫原則與禁止事項；測試計畫列出功能、手動、行動裝置與無障礙清單。
- [ ] 建立 MIT LICENSE、貢獻規則、robots 與 sitemap，靜態資源保持相對路徑。
- [ ] 執行 `rg -n "TODO|TBD" README.md docs CONTRIBUTING.md`，確認無待填內容。
- [ ] 提交：`docs: 補齊遊戲文件與部署指南`。

### Task 7: 驗證與程式碼審查

**Files:** Modify 必要檔案以修正驗證結果。

- [ ] 執行 `npm test`、`git diff --check`、題庫驗證；結果必須零失敗且無空白錯誤。
- [ ] 使用瀏覽器在 375px、768px、1440px 完成一局；以鍵盤完成一局；啟用減少動態後確認無位移動畫。
- [ ] 審查題組資料、狀態不可變性、DOM 插入安全性、可存取名稱、相對資源路徑與敏感檔案；修正發現項目並重跑測試。
- [ ] 提交：`test: 驗證遊戲操作與資料完整性`。

### Task 8: 推送前檢查

- [ ] 執行 `git status --short`、`git log --oneline --max-count=5`、`git remote -v`、`git branch --show-current`。
- [ ] 向使用者顯示 remote、branch 和將推送的 commit；僅在使用者看過資訊後執行 `git push`。若沒有 remote，停止並要求儲存庫 URL。
