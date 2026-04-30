// ========================================
// 產品服務
// ========================================

const { fetchProducts } = require("../api");
const {
  getErrorMessage,
  getDiscountRate,
  getAllCategories,
  formatCurrency,
} = require("../utils");

/**
 * 取得所有產品
 * @returns {Promise<Object>}
 */
async function getProducts() {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得產品陣列
  // 回傳格式：{ products, count: 產品數量 }
  const products = await fetchProducts();
  return { products, count: products.length };
}

/**
 * 根據分類篩選產品
 * @param {string} category - 分類名稱
 * @returns {Promise<Array>}
 */
async function getProductsByCategory(category) {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得所有產品後，篩選出符合 category 的產品
  // 回傳格式：篩選後的產品陣列

  try {
    // 1. 參數檢查
    if (typeof category !== "string" || !category.trim()) {
      throw new Error("Invalid category parameter");
    }

    // 標準化 category（去空白 + 小寫）
    const normalizedCategory = category.trim().toLowerCase();

    // 2. 取得產品資料
    const products = await fetchProducts();

    // 3. 資料結構檢查
    if (!Array.isArray(products)) {
      throw new Error("Invalid product data structure");
    }

    // 4. 篩選
    const filtered = products.filter((item) => {
      // 防呆：確保 item 有 category
      if (!item || typeof item.category !== "string") return false;

      return item.category.toLowerCase() === normalizedCategory;
    });

    return filtered;
  } catch (error) {
    console.error("getProductsByCategory error:", error);
    return []; // 保持函式穩定回傳
  }
}

/**
 * 根據 ID 取得單一產品
 * @param {string} productId - 產品 ID
 * @returns {Promise<Object|null>}
 */
async function getProductById(productId) {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得所有產品後，找出 id 符合的產品
  // 若找不到，回傳 null

  try {
    // 1. 參數檢查
    if (typeof productId !== "string" || !productId.trim()) {
      throw new Error("Invalid productId parameter");
    }

    // 標準化 productId（去空白 + 小寫）
    const normalizedProductID = productId.trim().toLowerCase();

    // 2. 取得產品Array
    const products = await fetchProducts();

    // 3. 資料結構檢查
    if (!Array.isArray(products)) {
      throw new Error("Invalid product data structure");
    }

    // 4. 篩選
    const product = products.find((item) => {
      if (!item || typeof item.id !== "string") return false;
      return item.id.trim().toLowerCase() === normalizedProductID;
    });

    // 5. 找不到回傳 null
    return product || null;
  } catch (error) {
    console.error("getProductById error:", error);
    return null; // 保持函式穩定回傳
  }
}

/**
 * 取得所有分類（不重複）
 * @returns {Promise<Array>}
 */
async function getCategories() {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得所有產品後，代入到 utils getAllCategories()
  try {
    // 直接就是 array
    const products = await fetchProducts();

    if (!Array.isArray(products)) {
      throw new Error("Invalid products data");
    }

    //  呼叫工具函式（加一層保護）
    const categories = getAllCategories(products);

    // 確保回傳格式正確
    return Array.isArray(categories) ? categories : [];
  } catch (error) {
    console.error("getCategories error:", error);
    return []; // 保持穩定輸出
  }
}

/**
 * 顯示產品列表
 * @param {Array} products - 產品陣列
 */
function displayProducts(products) {
  // 請實作此函式
  // 提示：使用 forEach 遍歷產品陣列，依序輸出每筆產品資訊
  // 會使用到 utils getDiscountRate() 計算折扣率，以及 utils formatCurrency() 格式化金額
  //
  // 預期輸出格式：
  // 產品列表：
  // ----------------------------------------
  // 1. 產品名稱
  //    分類：xxx
  //    原價：NT$ 1,000
  //    售價：NT$ 800 (8折)
  // ----------------------------------------

  if (!Array.isArray(products)) {
    throw new Error("Invalid products data structure");
  }
  let result = "產品列表：\n";
  result += "----------------------------------------\n";

  //items 已經是單一產品，不是陣列
  products.forEach((item, index) => {
    // console.log(formatCurrency(item.original_price));
    // console.log(formatCurrency(item.price));

    result += `${index + 1}. ${item.title}\n`;
    result += `   分類：${item.category}\n`;
    result += `   原價：${formatCurrency(item.original_price)}\n`;
    result += `   售價：${formatCurrency(item.price)} (${getDiscountRate(item)})\n`;
    result += "----------------------------------------\n";
  });

  console.log(result);
}

module.exports = {
  getProducts,
  getProductsByCategory,
  getProductById,
  getCategories,
  displayProducts,
};
