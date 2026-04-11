# Progress Tracking (進度追蹤)

## 專案狀態 (Project Status)

**目前狀態**: 🟢 初期開發完成 (MVP V1 上線準備)

## 已完成里程碑 (Completed Milestones)

1. **環境建置 (Environment Setup)**:
   - Next.js 15 (App Router) + Tailwind CSS v4 初始化完成。
   - 安裝 `lucide-react` 提供介面圖示。
2. **UI/UX 設計規範落實 (Design Tokens Implementation)**:
   - 於 `src/app/globals.css` 寫入由 UI/UX 專家定義的 Design Tokens。
   - 實作了 `.btn-primary` 與 `.input-field` 等共用 utility 類別。
3. **核心組件開發 (Core Components Development)**:
   - ✅ **`Hero.tsx`**: 滿版背景、吸睛標題與雙 CTA 導航。
   - ✅ **`Timeline.tsx`**: 6 大裝修流程視覺化卡片，利用 Hover Effect 提供微交互。
   - ✅ **`LeadForm.tsx`**: 兩步漸進式表單，內建基本的 Client-side 驗證與 Success 狀態反饋。
4. **頁面整合 (Page Integration)**:
   - 於 `src/app/page.tsx` 組合上述組件，完成一頁式落地頁架構。

## 下一步計劃 (Next Steps / Backlog)

1. 將表單資料串接後端 API (例如 Supabase 或直接發送 Email/WhatsApp Webhook)。
2. 進行更深度的無障礙 (A11y) 檢測與優化。
3. 加入更多真實作品集 (Portfolio) 區塊以提升轉化信任感。
