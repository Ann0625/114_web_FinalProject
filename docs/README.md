# TeaRadar 茶韻雷達  
## 個人品茗日誌與風味視覺化系統

---

## 1. 專案簡介 (Introduction)

**TeaRadar 茶韻雷達** 是一款專為茶藝愛好者打造的全端 Web 應用系統，  
使用者可以紀錄不同茶葉的基本資料、產地、庫存與個人品茗評分，  
並透過 **風味雷達圖（Radar Chart）** 將主觀味覺感受轉化為直觀的視覺化數據。

本專案結合 **RESTful API 設計** 與 **前後端分離架構**，  
實作完整 CRUD 流程，作為 Web 程式設計課程之期末專題。

---

## 2. 核心功能 (Features)

- **茶葉資料管理（CRUD）**  
  - 新增 / 編輯 / 刪除 / 查詢茶葉資料  
  - 紀錄茶名、種類、產地與風味評分  

- **品茗紀錄系統**  
  - 每次沖泡可留下個人品飲心得紀錄  
  - 支援後續擴充成時間序列分析  

- **風味雷達圖視覺化**  
  - 使用 **ApexCharts** 將五大風味指標圖形化  
  - 即時反映資料變動  

- **前後端分離架構**  
  - 前端：純 HTML / CSS / JavaScript  
  - 後端：Node.js + Express REST API  

- **響應式設計 (RWD)**  
  - 支援桌機與行動裝置瀏覽  

---

## 3. 技術棧 (Tech Stack)

### 前端 (Frontend)
- HTML5  
- Vanilla JavaScript  
- CSS3  
- ApexCharts（雷達圖）  

### 後端 (Backend)
- Node.js  
- Express.js  

### 資料庫
- MongoDB  
- Mongoose ODM  

### 系統架構功能
- 前端透過 fetch() 與後端 API 溝通
- 後端負責商業邏輯與資料驗證
- MongoDB 儲存茶葉與品茗紀錄資料

---

## 4. 安裝與啟動方式
- **安裝後端套件**  
  - cd backend
  
- **啟動後端伺服器**
  - npm run dev

- **啟動前端**
  - 直接以瀏覽器開啟 frontend/index.html或搭配 Live Server 使用

---

## 5. 使用說明
- **使用說明**
  - 1. 開啟首頁後可瀏覽所有已建立的茶葉資料
  - 2. 填寫表單新增茶葉與風味評分
  - 3. 系統會自動生成風味雷達圖
  - 4. 可編輯或刪除既有茶葉紀錄

---

## 6. 未來擴充方向
- 使用者登入與個人化資料
- 圖表歷史比較功能
- 品茗數據分析與推薦系統
- 前端框架（React / Vue）重構
  
---

## 7. 系統架構說明

```114_web_FinalProject/
├── backend/
│   ├── controllers/
│   │   ├── teaController.js
│   │   └── logController.js
│   ├── models/
│   │   ├── Tea.js
│   │   └── BrewingLog.js
│   ├── routes/
│   │   ├── teaRoutes.js
│   │   └── logRoutes.js
│   ├── node_modules/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── docs/                  # 專案說明或補充文件
├── .gitignore
└── README.md
