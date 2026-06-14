# AI 室內改造 SaaS 開發指引

## 1. 文件目標

本文件作為 `PHP + CodeIgniter 4` 版本的完整開發指引，目標是讓團隊在不過度設計的前提下，快速建立一個可商業化的 AI 室內改造 SaaS。

本文件覆蓋以下內容：

1. 技術棧與基礎原則
2. 專案目錄結構
3. 模組分層規範
4. 資料表與核心資料模型
5. 路由與頁面規劃
6. AI 任務管線
7. 點數與支付設計
8. 測試策略
9. 部署與維運
10. 開發順序與交付節點

## 2. 產品與 MVP 定位

### 2.1 產品核心

此產品是一個讓使用者上傳室內照片或戶型圖，選擇風格模板，然後由 AI 生成 2D 室內設計提案圖的 Web SaaS。

### 2.2 MVP 核心路徑

第一版只聚焦以下主路徑：

1. 使用者註冊 / 登入
2. 建立專案
3. 上傳照片或戶型圖
4. 選擇空間類型與風格模板
5. 建立生成任務
6. 等待任務完成
7. 查看結果圖
8. 扣除免費額度或點數

### 2.3 明確不做

- 不做原生 LiDAR 掃描 SDK
- 不做高精度 3D 編輯器
- 不做 CAD / BIM 工具
- 不做多人即時協作
- 不做施工估價與報價系統

## 3. 技術選型

### 3.1 核心技術棧

- 語言：`PHP 8.2+`
- 框架：`CodeIgniter 4`
- 資料庫：`MySQL 8+` 或 `PostgreSQL 15+`
- 前端：`CodeIgniter Views + Tailwind CSS` 或簡單 CSS 架構
- JavaScript：原生 JS 或少量 Alpine.js / HTMX 類輕互動
- 驗證與安全：`CodeIgniter Validation`、`Filters`、`CSRF`
- 認證：建議 `CodeIgniter Shield`
- 任務處理：`DB Queue + CLI Commands + cron`
- 儲存：本地儲存抽象層或 S3 相容物件儲存
- 支付：香港本地手動收款，支援 `FPS / PayMe / AlipayHK` 二維碼與收據上傳審核
- AI：第三方影像生成/編修 API

### 3.2 為什麼選 CodeIgniter 4

- 架構簡單，適合單體 SaaS 快速落地
- MVC 清楚，方便團隊分工
- 可快速建立後台與表單型流程
- CLI command、migration、filter、validation 都足夠支撐 MVP
- 比純手寫 PHP 更有結構，但不會像大型框架一樣沉重

## 4. Clean Code 規範

### 4.1 強制原則

1. Controller 薄層化
2. 商業邏輯集中於 Service
3. 資料存取集中於 Model / Repository
4. 第三方整合集中於 Adapter / Library
5. 狀態列舉與常數集中管理
6. API Key、Secret、Webhook Token 一律走 `.env`

### 4.2 禁止事項

- 禁止在 controller 直接拼大段商業流程
- 禁止在 view 裡判斷複雜商業規則
- 禁止把 AI prompt 規則散落各檔案
- 禁止直接 hardcode API key
- 禁止用模糊命名如 `data`, `temp`, `info`

## 5. 專案目錄結構建議

```text
project-root/
├─ app/
│  ├─ Commands/
│  ├─ Config/
│  ├─ Controllers/
│  │  ├─ Admin/
│  │  ├─ Api/
│  │  ├─ Auth/
│  │  └─ App/
│  ├─ Database/
│  │  ├─ Migrations/
│  │  └─ Seeds/
│  ├─ Entities/
│  ├─ Filters/
│  ├─ Libraries/
│  │  ├─ Ai/
│  │  ├─ Billing/
│  │  ├─ Import/
│  │  └─ Storage/
│  ├─ Models/
│  ├─ Services/
│  │  ├─ Auth/
│  │  ├─ Billing/
│  │  ├─ Generation/
│  │  ├─ Project/
│  │  └─ Upload/
│  ├─ Validation/
│  └─ Views/
│     ├─ admin/
│     ├─ auth/
│     ├─ dashboard/
│     ├─ landing/
│     └─ partials/
├─ public/
├─ writable/
│  ├─ uploads/
│  ├─ logs/
│  └─ cache/
├─ tests/
├─ .env
└─ spark
```

## 6. 分層責任規範

### 6.1 Controllers

職責：

- 接收請求
- 驗證登入狀態與權限
- 呼叫 validation
- 將資料交給 service
- 回傳 view 或 JSON

不負責：

- 不處理完整商業規則
- 不直接呼叫第三方 API
- 不直接決定點數扣除邏輯

### 6.2 Services

職責：

- 實作商業流程
- 組合多個 model / adapter
- 控制狀態轉移
- 寫入點數紀錄
- 建立任務與觸發 worker

典型 service：

- `ProjectService`
- `AssetService`
- `GenerationJobService`
- `CreditService`
- `BillingService`
- `StylePresetService`

### 6.3 Models / Repository

職責：

- 封裝資料表操作
- 提供查詢方法
- 管理常見條件查詢

注意：

- 複雜跨表商業規則不要寫在 model
- Model 名稱需對應實體，例如 `ProjectModel`

### 6.4 Entities

職責：

- 表達資料結構
- 集中欄位與型別
- 讓資料傳遞更清楚

### 6.5 Libraries / Adapters

職責：

- 封裝第三方供應商差異
- 提供統一呼叫介面

建議 adapter：

- `AiProviderAdapterInterface`
- `StripePaymentAdapter`
- `LocalStorageAdapter`
- `S3StorageAdapter`
- `RoomPlanImportAdapter`

### 6.6 Commands

職責：

- 執行背景任務
- 批次重試失敗工作
- 清理過期素材
- 同步帳務或重建縮圖

## 7. 模組切分

### 7.1 Auth 模組

功能：

- 註冊
- 登入
- 登出
- 忘記密碼
- Email 驗證
- 方案欄位

建議：

- 優先整合 `CodeIgniter Shield`
- 自訂 user profile 欄位與 plan 欄位

### 7.2 Project 模組

功能：

- 建立專案
- 編輯專案名稱
- 設定空間類型
- 查看專案狀態

狀態建議：

- `draft`
- `ready_for_generation`
- `processing`
- `completed`
- `failed`
- `archived`

### 7.3 Asset 模組

功能：

- 上傳照片
- 上傳戶型圖
- 預覽素材
- 刪除素材
- 驗證檔案

支援格式：

- `jpg`
- `jpeg`
- `png`
- `webp`
- `pdf`（僅限戶型圖）

### 7.4 StylePreset 模組

功能：

- 風格模板管理
- 房間類型分類
- prompt 模板規則
- 前台風格選擇器

第一版建議風格：

- 現代極簡
- 北歐風
- 日式奶油風
- 輕奢風
- 工業風

### 7.5 Generation 模組

功能：

- 建立生成任務
- 記錄任務狀態
- 呼叫 AI provider
- 儲存輸出結果
- 失敗重試

### 7.6 Billing 模組

功能：

- 免費額度
- 點數消耗
- 點數充值
- 付款方式說明頁
- 收據上傳
- 人工審核
- 交易紀錄

### 7.7 Admin 模組

功能：

- 使用者統計
- 任務監控
- 失敗任務查看
- 點數消耗統計
- 模板管理

## 8. 資料表設計指引

### 8.1 users

欄位建議：

- `id`
- `email`
- `password_hash`
- `display_name`
- `plan_type`
- `credit_balance`
- `free_generation_remaining`
- `email_verified_at`
- `status`
- `created_at`
- `updated_at`

### 8.2 user_profiles

欄位建議：

- `id`
- `user_id`
- `phone`
- `avatar_path`
- `locale`
- `timezone`
- `created_at`
- `updated_at`

### 8.3 projects

欄位建議：

- `id`
- `user_id`
- `name`
- `space_type`
- `design_goal`
- `status`
- `primary_style_preset_id`
- `created_at`
- `updated_at`

### 8.4 project_assets

欄位建議：

- `id`
- `project_id`
- `asset_type`
- `original_name`
- `mime_type`
- `file_path`
- `thumbnail_path`
- `file_size`
- `width`
- `height`
- `sort_order`
- `validation_status`
- `created_at`

### 8.5 style_presets

欄位建議：

- `id`
- `slug`
- `name`
- `space_type`
- `prompt_template`
- `negative_prompt`
- `cover_image`
- `is_active`
- `sort_order`
- `created_at`
- `updated_at`

### 8.6 generation_jobs

欄位建議：

- `id`
- `user_id`
- `project_id`
- `style_preset_id`
- `status`
- `provider_name`
- `input_payload`
- `credit_cost`
- `started_at`
- `finished_at`
- `error_code`
- `error_message`
- `retry_count`
- `created_at`
- `updated_at`

### 8.7 generation_results

欄位建議：

- `id`
- `job_id`
- `result_type`
- `image_path`
- `thumbnail_path`
- `version_label`
- `width`
- `height`
- `metadata`
- `created_at`

### 8.8 credit_ledgers

欄位建議：

- `id`
- `user_id`
- `delta`
- `balance_after`
- `reason`
- `reference_type`
- `reference_id`
- `created_at`

### 8.9 payment_orders

欄位建議：

- `id`
- `user_id`
- `payment_method`
- `package_name`
- `amount`
- `currency`
- `credit_amount`
- `status`
- `payment_reference`
- `paid_at`
- `reviewed_by`
- `reviewed_at`
- `review_note`
- `created_at`
- `updated_at`

### 8.10 payment_proofs

欄位建議：

- `id`
- `payment_order_id`
- `receipt_file_path`
- `receipt_original_name`
- `receipt_mime_type`
- `receipt_file_size`
- `payer_note`
- `review_status`
- `submitted_at`
- `created_at`
- `updated_at`

### 8.11 queue_jobs

欄位建議：

- `id`
- `queue_name`
- `job_type`
- `payload`
- `status`
- `available_at`
- `locked_at`
- `attempts`
- `max_attempts`
- `last_error`
- `created_at`
- `updated_at`

## 9. Migration 規則

1. 每張表一個 migration
2. 命名需可讀，例如 `CreateGenerationJobsTable`
3. 外鍵與索引一開始就建好
4. 狀態欄位與常查欄位要加 index
5. 不允許手動改 production schema 而不補 migration

## 10. 路由規劃

### 10.1 公開頁面

```text
GET    /
GET    /pricing
GET    /examples
GET    /faq
GET    /contact
```

### 10.2 認證頁面

```text
GET    /login
POST   /login
GET    /register
POST   /register
POST   /logout
GET    /forgot-password
POST   /forgot-password
```

### 10.3 使用者工作台

```text
GET    /app
GET    /app/projects
GET    /app/projects/create
POST   /app/projects
GET    /app/projects/{id}
POST   /app/projects/{id}/assets
POST   /app/projects/{id}/generate
GET    /app/projects/{id}/results
GET    /app/billing
GET    /app/billing/top-up
POST   /app/billing/orders
GET    /app/billing/orders/{id}
POST   /app/billing/orders/{id}/receipt
GET    /app/settings
```

### 10.4 API 路由

```text
GET    /api/projects/{id}/jobs
GET    /api/jobs/{id}
GET    /api/jobs/{id}/results
DELETE /api/assets/{id}
```

### 10.5 後台路由

```text
GET    /admin
GET    /admin/users
GET    /admin/jobs
GET    /admin/jobs/{id}
GET    /admin/payments
GET    /admin/payments/{id}
POST   /admin/payments/{id}/approve
POST   /admin/payments/{id}/reject
GET    /admin/style-presets
POST   /admin/style-presets
```

## 11. Controller 設計範例

建議拆分如下：

- `LandingController`
- `PricingController`
- `Auth\LoginController`
- `Auth\RegisterController`
- `App\DashboardController`
- `App\ProjectController`
- `App\ProjectAssetController`
- `App\GenerationController`
- `App\BillingController`
- `Api\JobController`
- `Admin\AdminDashboardController`
- `Admin\GenerationJobController`
- `Admin\PaymentReviewController`
- `Admin\StylePresetController`

## 12. Service 設計範例

### 12.1 ProjectService

負責：

- 建立專案
- 更新專案資料
- 驗證使用者是否可操作該專案

### 12.2 AssetService

負責：

- 驗證檔案格式與大小
- 儲存檔案
- 建立素材紀錄
- 刪除素材與縮圖

### 12.3 GenerationJobService

負責：

- 驗證專案是否可生成
- 計算所需點數
- 建立 generation job
- 寫入 queue job
- 更新 job 狀態

### 12.4 CreditService

負責：

- 扣點
- 加點
- 記錄 ledger
- 驗證是否餘額足夠

### 12.5 BillingService

負責：

- 建立付款訂單
- 產生付款方式與對應 QR 顯示資料
- 接收收據上傳
- 審核付款憑證
- 完成審核後加點

## 13. AI Provider Adapter 規範

### 13.1 介面建議

介面至少包含：

- `generateInteriorDesign(array $payload): AiGenerationResponse`
- `getJobStatus(string $providerJobId): AiJobStatusResponse`
- `normalizeResult(array $providerResponse): array`

### 13.2 Payload 建議內容

- `room_type`
- `style_name`
- `design_goal`
- `asset_urls`
- `color_preferences`
- `material_preferences`
- `quality_level`

### 13.3 設計要求

- 所有 provider 回傳都要正規化
- provider error code 要映射成內部錯誤碼
- prompt builder 與 provider adapter 分離

## 14. Prompt Builder 指引

應獨立建立 `PromptBuilderService`，輸入：

- 空間類型
- 風格模板
- 使用者偏好
- 素材類型

輸出：

- `positive_prompt`
- `negative_prompt`
- `render_settings`

原則：

- 模板固定化，避免使用者任意 prompt 造成品質失控
- 不把 prompt 拼接寫在 controller

## 15. 檔案上傳與儲存策略

### 15.1 上傳流程

1. 驗證副檔名與 mime type
2. 驗證大小限制
3. 儲存原圖
4. 產生縮圖
5. 建立資料表紀錄
6. 回傳 preview URL

### 15.2 限制建議

- 單檔大小：10MB 以內
- 單專案素材數：第一版限制 10 張
- 非圖片型戶型圖：先轉圖片再進入生成流程

### 15.3 儲存抽象

需建立：

- `StorageAdapterInterface`
- `LocalStorageAdapter`
- `S3StorageAdapter`

## 16. AI 任務與 Queue 設計

### 16.1 任務狀態

- `queued`
- `processing`
- `succeeded`
- `failed`
- `cancelled`

### 16.2 背景流程

1. 使用者送出生成請求
2. `GenerationJobService` 驗證與扣點
3. 建立 `generation_jobs`
4. 寫入 `queue_jobs`
5. cron 定時執行 `php spark jobs:work`
6. worker 讀取 queue
7. 呼叫 AI provider
8. 儲存結果圖
9. 更新 job 狀態
10. 若失敗，記錄錯誤與重試次數

### 16.3 建議 Commands

- `jobs:work`
- `jobs:retry-failed`
- `assets:cleanup`
- `billing:sync-pending`

## 17. 點數與支付規則

### 17.1 點數設計

建議第一版規則：

- 免費註冊送 3 次生成額度
- 一次標準生成消耗 1 點或 1 次免費額度
- 高清輸出可額外消耗點數
- 重新生成再次扣點

### 17.2 扣點順序

1. 先扣免費額度
2. 免費額度用完後再扣點數餘額
3. 若餘額不足，阻擋任務建立

### 17.3 支付流程

1. 使用者選擇點數包
2. 建立 `payment_orders`
3. 顯示 `FPS / PayMe / AlipayHK` 付款說明與二維碼
4. 使用者完成掃碼付款後上傳收據
5. 後台審核收據
6. `BillingService` 審核成功後加點
7. 寫入 `credit_ledgers`

### 17.4 payment_orders 狀態建議

- `pending_payment`
- `proof_uploaded`
- `approved`
- `rejected`
- `cancelled`

### 17.5 payment_proofs 審核狀態建議

- `pending_review`
- `approved`
- `rejected`

## 18. View 與前端規範

### 18.1 頁面層級

- 官網頁：SEO 與產品說明優先
- Dashboard：任務與專案操作優先
- Admin：可讀性與效率優先

### 18.2 View 原則

- partials 拆分可重用區塊
- 表單錯誤與成功狀態統一樣式
- Loading / Empty / Error / Success 狀態必須存在
- 不把複雜業務判斷放進 template

### 18.3 前端互動建議

- 上傳預覽
- 任務輪詢刷新
- 圖片比較滑桿
- 點數餘額即時提示
- 收據上傳預覽

## 19. 安全規範

1. 啟用 CSRF 防護
2. 啟用認證 filter 與 admin filter
3. 所有檔案上傳都需做白名單驗證
4. 收據審核需記錄操作人與操作時間
5. 專案與結果查詢必須驗證 `user_id`
6. 敏感設定全部放 `.env`
7. 錯誤訊息不可直接曝光第三方 provider 原始敏感內容

## 20. 日誌與監控

### 20.1 必須記錄

- 登入失敗
- 檔案上傳失敗
- 任務建立失敗
- AI provider 回應錯誤
- 收據上傳失敗
- 付款審核拒絕
- 點數扣除異常

### 20.2 建議監控指標

- 每日註冊數
- 每日生成次數
- 生成成功率
- 平均生成耗時
- 每日點數消耗
- 免費轉付費率

## 21. 測試策略

### 21.1 單元測試

優先測：

- `CreditService`
- `PromptBuilderService`
- `GenerationJobService`
- 狀態轉移邏輯

### 21.2 Feature 測試

優先測：

- 註冊 / 登入流程
- 建立專案流程
- 上傳素材流程
- 建立生成任務流程
- 點數不足時的阻擋邏輯

### 21.3 不要寫的低價值測試

- 只是重複 framework 內建行為的測試
- 單純檢查 view 是否存在某個靜態文字

## 22. 開發流程建議

### 22.1 第一階段：骨架

1. 建立 `CodeIgniter 4` 專案
2. 建立 migration
3. 接入認證
4. 建立 layout 與基礎 routing

### 22.2 第二階段：核心功能

1. 專案建立
2. 素材上傳
3. 風格模板
4. generation job
5. 結果頁

### 22.3 第三階段：變現

1. 點數系統
2. Stripe checkout
3. webhook
4. Billing 頁

### 22.4 第四階段：維運

1. Admin dashboard
2. 任務監控
3. 失敗重試
4. 清理與同步 commands

## 23. Sprint 建議

### Sprint 1

- 認證
- 專案資料表
- 專案建立頁
- 基礎 Dashboard

### Sprint 2

- 上傳流程
- 素材資料表
- 預覽頁
- 風格模板資料

### Sprint 3

- generation job
- queue worker
- 結果頁
- 任務狀態輪詢

### Sprint 4

- 點數系統
- 付款指引頁
- 收據上傳與審核
- Billing 頁

### Sprint 5

- Admin
- 監控
- 重試與清理 commands
- 安全與效能收尾

## 24. 第一個可交付版本定義

若要快速驗證產品價值，第一個可上線版本至少要達成：

1. 註冊與登入
2. 建立專案
3. 上傳 1 張室內照片
4. 選 1 個風格模板
5. 建立 1 次 AI 任務
6. 顯示 1 張結果圖
7. 免費額度扣減

## 25. 部署建議

### 25.1 基本環境

- Linux Server
- Nginx 或 Apache
- PHP-FPM
- MySQL / PostgreSQL
- cron
- SSL

### 25.2 環境分離

- local
- staging
- production

### 25.3 部署後檢查

- `.env` 是否正確
- migration 是否完成
- writable 權限是否正常
- cron 是否正常觸發
- 收據上傳流程是否正常
- 上傳與結果圖 URL 是否可讀

## 26. 建議的 .env 類別

至少需要以下類型設定：

- App URL
- DB 連線
- Auth mail 設定
- Storage 設定
- AI provider API 設定
- FPS / PayMe / AlipayHK 收款資訊
- Queue worker 設定

## 27. 開發交付清單

每完成一個模組，至少交付：

1. Migration
2. Model / Entity
3. Service
4. Controller
5. View 或 API
6. 測試
7. 文件更新

## 28. 團隊開發守則

1. 新功能先補 migration 與資料結構說明
2. 跨模組流程先畫狀態流，再寫程式
3. 第三方整合一律先包 adapter
4. 任何扣點與支付邏輯必須可追蹤
5. 文件與代碼同步更新

## 29. 最後建議

對這個產品來說，最重要的不是一開始就把架構做得很重，而是把這條主路徑做穩：

`登入 -> 建立專案 -> 上傳素材 -> 選風格 -> 建任務 -> 出結果 -> 扣點`

只要這條路徑穩定，後面再逐步加：

- 更多風格
- 更好的結果比較
- 更高級的支付方案
- 第三方掃描資料匯入
- B2B 設計師功能
