# 題庫擴充與宗師難度 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將遊戲擴充至四個難度、每級十六個有效的交錯成語題組。

**Architecture:** 保持既有固定題組資料模型與純函式驗證；只擴充 `PUZZLES`、`DIFFICULTIES` 和介面渲染。測試將以資料分布與宗師提示行為鎖定規格。

**Tech Stack:** Vanilla JavaScript ES Modules、Node.js `node:test`、HTML、CSS。

## Global Constraints

- 每個難度剛好十六個題組，合計六十四個。
- 題組只收錄成語與自撰提示；不得複製教育部釋義。
- 宗師難度為 12 格空白、0 次提示、6 個干擾字。
- 所有新行為先有失敗測試，再實作最小程式碼。

---

### Task 1: 鎖定題庫分布與宗師規則

**Files:** Modify `tests/puzzle.test.js`, `tests/state.test.js`。

- [ ] 新增測試，斷言 `beginner`、`intermediate`、`advanced`、`master` 各有 16 個題組，並先執行 `npm test`，預期因缺少 `master` 與數量不足失敗。
- [ ] 新增測試，建立宗師盤後斷言 `hintsLeft === 0`，且 `useHint` 回傳同一個狀態。
- [ ] 執行 `npm test`，確認失敗原因是規格尚未實作。

### Task 2: 擴充題組與抽題資料

**Files:** Modify `scripts/data/puzzles.js`。

- [ ] 新增每個既有難度 14 個人工驗證題組，並新增 16 個宗師題組；每盤含至少一個一致的交叉字。
- [ ] 將 `DIFFICULTIES` 新增 `master: { label: '宗師', blanks: 12, hints: 0, decoys: [...] }`。
- [ ] 執行 `npm run check:data` 與 `npm test`，預期 64 個題組全數有效。
- [ ] 提交：`feat: 擴充四級成語題庫`。

### Task 3: 顯示宗師難度與零提示狀態

**Files:** Modify `scripts/ui/render.js`, `styles/game.css`。

- [ ] 將選難度版面渲染為四個按鈕，加入「宗師／提示 0 次」。
- [ ] 當 `hintsLeft === 0` 時顯示「本局無提示」且不渲染「揭示一字」按鈕。
- [ ] 在本機 HTTP 伺服器中開始宗師局，確認候選字、提示文案與重設流程可用。
- [ ] 提交：`feat: 新增宗師難度介面`。

### Task 4: 最終驗證

**Files:** Modify 必要檔案。

- [ ] 執行 `npm test`、`npm run check:data`、`git diff --check`。
- [ ] 在瀏覽器驗證四個難度可開局；連續開局不會取得同一題組；宗師不顯示提示按鈕。
- [ ] 提交：`test: 驗證題庫擴充與宗師難度`。
