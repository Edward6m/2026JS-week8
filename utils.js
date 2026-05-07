// ========================================
// 工具函式
// ========================================

const dayjs = require("dayjs");

function getErrorMessage(error) {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (typeof error?.response?.data === "string") {
    return error.response.data;
  }

  if (error?.response?.data) {
    return JSON.stringify(error.response.data);
  }

  return error?.message || "未知錯誤";
}

/**
 * 計算產品折扣率
 * @param {Object} product - 產品物件
 * @returns {string} - 例如 '8折'
 */
function getDiscountRate(product) {
  // 請實作此函式
  if (
    !product ||
    typeof product.origin_price !== "number" ||
    typeof product.price !== "number"
  ) {
    throw new Error("Invalid product data");
  }
  const { origin_price, price } = product;
  if (price === 0) return "0折";

  if (origin_price <= 0 || price < 0) {
    throw new Error("Price values must be valid numbers");
  }

  // 計算折扣（例如 0.8）
  const discount = price / origin_price;

  // 轉成「幾折」並四捨五入到 幾折
  const rate = Math.round(discount * 10);

  return `${rate}折`;
}

/**
 * 取得所有產品分類（不重複）
 * @param {Array} products - 產品陣列
 * @returns {Array} - 分類陣列
 */
function getAllCategories(products) {
  // 請實作此函式
  // 1. 參數檢查
  if (!Array.isArray(products)) {
    throw new Error("products array is invalid");
  }

  // 2. 收集分類 + 防呆 + 正規化
  const categories = products
    .filter((item) => item && typeof item.category === "string")
    .map((item) => item.category.trim().toLowerCase())
    .filter(Boolean); // 移除空字串

  // 3. 去重
  const uniqueCategories = [...new Set(categories)];

  return uniqueCategories;
}

/**
 * 格式化日期
 * @param {number} timestamp - Unix timestamp
 * @returns {string} - 格式 'YYYY/MM/DD HH:mm'，例如 '2024/01/01 08:00'
 */
function formatDate(timestamp) {
  // 請實作此函式
  // 提示：dayjs.unix...
  return dayjs.unix(timestamp).format("YYYY/MM/DD HH:mm");
}

/**
 * 計算距今天數
 * @param {number} timestamp - Unix timestamp
 * @returns {string} - 例如 '3 天前'
 */
function getDaysAgo(timestamp) {
  // 請實作此函式
  // 提示：
  // 1. 用 dayjs() 取得今天
  // 2. 用 dayjs.unix(timestamp) 取得日期
  // 3. 用 .diff() 計算天數差異
  const today = dayjs().startOf("day"); // 今天零點
  const orderDate = dayjs.unix(timestamp).startOf("day"); // 訂單日期零點

  const diffDays = today.diff(orderDate, "day");

  if (diffDays === 0) {
    return "今天";
  } else if (diffDays === 1) {
    return "昨天";
  } else if (diffDays > 1) {
    return `${diffDays} 天前`;
  } else {
    return "未來日期"; // 如果 timestamp 是未來的
  }
}

/**
 * 驗證訂單使用者資料
 * @param {Object} data - 使用者資料
 * @returns {Object} - { isValid: boolean, errors: string[] }
 *
 * 驗證規則：
 * - name: 不可為空
 * - tel: 必須是 09 開頭的 10 位數字
 * - email: 必須包含 @ 符號
 * - address: 不可為空
 * - payment: 必須是 'ATM', 'Credit Card', 'Apple Pay' 其中之一
 */
function validateOrderUser(data) {
  // 請實作此函式
  const errors = [];
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {
      isValid: false,
      errors: ["資料格式錯誤"],
    };
  }
  // 解構 + 預設值
  let { name = "", tel = "", email = "", address = "", payment = "" } = data;

  // 統一轉字串 + trim
  name = String(name).trim();
  tel = String(tel).trim();
  email = String(email).trim();
  address = String(address).trim();
  payment = String(payment).trim();

  if (!name || name.trim() === "") {
    errors.push("姓名不可為空");
  }
  if (!tel || !/^09\d{8}$/.test(tel)) {
    errors.push("tel必須是 09 開頭的 10 位數字");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push("Email 格式不正確");
  }
  if (!address || address.trim() === "") {
    errors.push("address不可為空");
  }
  // 驗證付款方式（大小寫容錯）
  const validPayments = ["ATM", "Credit Card", "Apple Pay"];
  const normalizedPayment = payment.toLowerCase().replace(/\s+/g, " ").trim();

  const paymentMap = {
    atm: "ATM",
    "credit card": "Credit Card",
    "apple pay": "Apple Pay",
  };

  if (!paymentMap[normalizedPayment]) {
    errors.push("付款方式需為 ATM、Credit Card 或 Apple Pay");
  }
  return { isValid: errors.length === 0, errors };
}

/**
 * 驗證購物車數量
 * @param {number} quantity - 數量
 * @returns {Object} - { isValid: boolean, error?: string }
 *
 * 驗證規則：
 * - 必須是正整數
 * - 不可小於 1
 * - 不可大於 99
 */
function validateCartQuantity(quantity) {
  // 請實作此函式
  // 1. 型別檢查
  if (typeof quantity !== "number" || isNaN(quantity)) {
    return {
      isValid: false,
      error: "quantity must be a number",
    };
  }

  // 2. 是否為整數
  if (!Number.isInteger(quantity)) {
    return {
      isValid: false,
      error: "quantity must be an integer",
    };
  }

  // 3. 範圍檢查
  if (quantity < 1 || quantity > 99) {
    return {
      isValid: false,
      error: "quantity must be between 1 and 99",
    };
  }

  // 4. 通過驗證
  return {
    isValid: true,
  };
}

/**
 * 格式化金額
 * @param {number} amount - 金額
 * @returns {string} - 格式化後的金額
 *
 * 格式化規則：
 * - 加上 "NT$ " 前綴
 * - 數字需要千分位逗號分隔（例如：1000 → 1,000）
 * - 使用台灣格式（zh-TW）
 *
 * 範例：
 * formatCurrency(1000) → "NT$ 1,000"
 * formatCurrency(1234567) → "NT$ 1,234,567"
 *
 */
function formatCurrency(amount) {
  // 請實作此函式
  // 先轉成數字
  let num = Number(amount);

  // 驗證是否為有效數字
  if (isNaN(num) || num < 0) {
    num = isNaN(num) || num < 0 ? 0 : num;
  }

  // 回傳台灣格式金額
  return `NT$ ${num.toLocaleString("zh-TW")}`;
}

module.exports = {
  getErrorMessage,
  getDiscountRate,
  getAllCategories,
  formatDate,
  getDaysAgo,
  validateOrderUser,
  validateCartQuantity,
  formatCurrency,
};
