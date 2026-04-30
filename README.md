# 第八週期末專案：電商系統整合

## 情境說明

整合前七週所學，建立完整的電商系統應用程式，包含 API 模組、工具函式、以及產品、購物車、訂單三大服務模組。
API 串接練習延續使用學院的 [LiveJS 電商 API](https://hexschool.github.io/hexschoolliveswagger/)。

---

## 快速開始

### Step 1：環境準備

1. 確認 Node.js 版本 >= 18
2. 下載此作業專案後，需打開終端機輸入 `npm install`

### Step 2：設定環境變數

在專案根目錄建立 `.env` ，並在 `.env` 檔案中設定環境變數：

```bash
API_PATH=your-api-path
API_KEY=your-admin-token
```

如果還未註冊學院的 [LiveJS 電商 API](https://hexschool.github.io/hexschoolliveswagger/)：
1. 請進入到[此網站](https://livejs-api.hexschool.io/)，並點選「註冊」，註冊帳號成功後，登入到網站
2. 登入後即可進入到 API 申請畫面，請依照說明建立 API Path，也可以取得 API Key

### Step 3：開始寫作業

依序開啟以下檔案，按照註解提示完成所有函式：

| 檔案 | 說明 |
|------|------|
| `api.js` | API 相關函式 |
| `utils.js` | 工具函式 |
| `services/productService.js` | 產品服務 |
| `services/cartService.js` | 購物車服務 |
| `services/orderService.js` | 訂單服務 |

### Step 4：測試你的程式碼

```bash
# 執行快速測試（看基本輸出）
npm start

# 執行完整 Jest 測試（看通過/失敗）
npm test
```

---

## 專案架構

```text
js-camp-week8/
├── package.json              # 專案設定
├── config.js                 # API 設定（已完成）
├── api.js                    # API 相關函式
├── utils.js                  # 工具函式
├── services/
│   ├── productService.js     # 產品服務
│   ├── cartService.js        # 購物車服務
│   └── orderService.js       # 訂單服務
├── app.js                    # 主程式入口
├── test.js                   # Jest 測試
```

---

## 主線任務

本週作業分為五個任務，請依照說明，完成對應的功能要求：

| 任務 | 檔案 |
|------|------|
| 任務一 | `api.js` |
| 任務二 | `utils.js` |
| 任務三 | `services/productService.js` |
| 任務四 | `services/cartService.js` |
| 任務五 | `services/orderService.js` |

### 【任務一：API 模組 (api.js)】

**客戶端 API：**

- `fetchProducts()` - 取得產品列表
- `fetchCart()` - 取得購物車
- `addToCart(productId, quantity)` - 加入購物車
- `updateCartItem(cartId, quantity)` - 更新購物車數量
- `deleteCartItem(cartId)` - 刪除購物車項目
- `clearCart()` - 清空購物車
- `createOrder(userInfo)` - 建立訂單

**管理員 API（需認證）：**

- `fetchOrders()` - 取得訂單列表
- `updateOrderStatus(orderId, isPaid)` - 更新訂單狀態
- `deleteOrder(orderId)` - 刪除訂單

### 【任務二：工具函式 (utils.js)】

- `getDiscountRate(product)` - 計算產品折扣率
- `getAllCategories(products)` - 取得所有產品分類（不重複）
- `formatDate(timestamp)` - 格式化日期
- `getDaysAgo(timestamp)` - 計算距今天數
- `validateOrderUser(data)` - 驗證訂單使用者資料
- `validateCartQuantity(quantity)` - 驗證購物車數量
- `formatCurrency(amount)` - 格式化金額

### 【任務三：產品服務 (services/productService.js)】

- `getProducts()` - 取得所有產品
- `getProductsByCategory(category)` - 依分類篩選產品
- `getProductById(productId)` - 根據 ID 取得單一產品
- `getCategories()` - 取得所有不重複分類
- `displayProducts(products)` - 輸出產品資訊

### 【任務四：購物車服務 (services/cartService.js)】

- `getCart()` - 取得購物車
- `addProductToCart(productId, quantity)` - 加入商品到購物車
- `updateProduct(cartId, quantity)` - 更新購物車商品數量
- `removeProduct(cartId)` - 移除商品
- `emptyCart()` - 清空購物車
- `getCartTotal()` - 計算購物車總金額
- `displayCart(cart)` - 輸出購物車內容

### 【任務五：訂單服務 (services/orderService.js)】

- `placeOrder(userInfo)` - 建立新訂單
- `getOrders()` - 取得所有訂單
- `getUnpaidOrders()` - 取得未付款訂單
- `getPaidOrders()` - 取得已付款訂單
- `updatePaymentStatus(orderId, isPaid)` - 更新訂單付款狀態
- `removeOrder(orderId)` - 刪除訂單
- `formatOrder(order)` - 格式化訂單資訊
- `displayOrders(orders)` - 輸出訂單列表

---

## 測試與驗證

本作業使用 **Jest** 進行自動化測試。

### 測試指令

1. 執行快速測試（看基本輸出）：`npm start`
2. 完整測試（需真實 API）：`npm test`

### 測試結果說明

- ✓ 表示測試通過
- ✕ 表示測試失敗

### 測試項目（共 75 項）

| 群組 | 測試數量 |
|----------|---------|
| 測試一：API 模組 | 13 項 |
| 測試二：工具函式 | 33 項 |
| 測試三：產品服務 | 9 項 |
| 測試四：購物車服務 | 8 項 |
| 測試五：訂單服務 | 12 項 |

---

## 繳交方式

1. 完成所有檔案中的函式
2. 執行 `npm test` 確保所有測試通過
3. 將程式碼上傳至 GitHub
4. 提交 GitHub 連結

---

## 常見問題

**Q: 測試失敗時，可先檢查跟確認以下：**

1. 確認 `.env` 設定正確
2. 確認網路連線正常
3. 檢查各函式是否有正確回傳值
4. 確認 async/await 語法正確使用

