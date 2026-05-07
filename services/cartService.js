// ========================================
// 購物車服務
// ========================================

const {
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} = require("../api");
const {
  getErrorMessage,
  validateCartQuantity,
  formatCurrency,
} = require("../utils");

/**
 * 取得購物車
 * @returns {Promise<Object>}
 */
async function getCart() {
  // 請實作此函式
  // 提示：呼叫 fetchCart() 取得購物車資料並回傳
  try {
    // const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
    const response = await fetchCart();
    // console.log("getCart(),response=", response);
    const { carts, total, finalTotal } = response;

    return {
      carts,
      total,
      finalTotal,
    };
  } catch (error) {
    console.error("錯誤：", error.message);

    // 保持回傳格式一致（避免測資炸掉）
    return {
      carts: [],
      total: 0,
      finalTotal: 0,
    };
  }
}

/**
 * 加入商品到購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>}
 */
async function addProductToCart(productId, quantity) {
  // 請實作此函式
  // 提示：先用 utils validateCartQuantity() 驗證數量，驗證失敗時回傳 { success: false, error: ... }
  // 驗證通過後，呼叫 addToCart() 加入購物車
  // 回傳格式：{ success: true, data: ... } / { success: false, error: ... }

  try {
    // 1. 驗證數量
    const validateError = validateCartQuantity(quantity);
    if (!validateError.isValid) {
      return {
        success: false,
        error: "quantity is not valid",
      };
    }
    // console.log("addProductToCart():", validateError);
    // 2. API 呼叫（注意：LiveJS 正確格式是 data 包一層）
    const result = await addToCart(productId, quantity);

    // // 3. 直接取 response.data（不要用 status 判斷 API 成功）
    // const result = response.data;

    // 4. 基本防呆
    if (!result) {
      return {
        success: false,
        error: "API response is empty",
      };
    }

    // 5. 成功回傳（測資要求重點）
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("addProductToCart() error:", error);

    const errMsg = getErrorMessage(error);
    return { success: false, error: errMsg };
  }
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>}
 */
async function updateProduct(cartId, quantity) {
  // 請實作此函式
  // 提示：先用 utils validateCartQuantity() 驗證數量，驗證失敗時回傳 { success: false, error: ... }
  // 驗證通過後，呼叫 updateCartItem() 更新數量
  // 回傳格式：{ success: true, data: ... } / { success: false, error: ... }
  try {
    if (!validateCartQuantity(quantity).isValid) {
      return { success: false, error: validation.error };
    }

    const result = await updateCartItem(cartId, quantity);
    if (!result) {
      return { success: false, error: "updateCartItem 回傳異常" };
    }

    // console.log("updateProduct", result);
    return { success: true, data: result };
  } catch (error) {
    // return { success: false, error: error.message };
    const errMsg = getErrorMessage(error);
    return { success: false, error: errMsg };
  }
}

/**
 * 移除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>}
 */
async function removeProduct(cartId) {
  // 請實作此函式
  // 提示：呼叫 deleteCartItem()
  // 回傳格式：{ success: true, data: ... } / { success: false, error: ... }
  try {
    if (!cartId || typeof cartId !== "string") {
      return { success: false, error: validation.error };
    }

    const result = await deleteCartItem(cartId);
    if (!result) {
      return { success: false, error: result.error };
    }

    // console.log("removeProduct", result);
    return { success: true, data: result };
  } catch (error) {
    // return { success: false, error: error.message };
    const errMsg = getErrorMessage(error);
    return { success: false, error: errMsg };
  }
}

/**
 * 清空購物車
 * @returns {Promise<Object>}
 */
async function emptyCart() {
  // 請實作此函式
  // 提示：呼叫 clearCart()
  // 回傳格式：{ success: true, data: ... }

  // 回傳格式：{ success: true, data: ... } / { success: false, error: ... }
  try {
    const result = await clearCart();
    if (!result) {
      return { success: false, error: result.error };
    }

    // console.log("emptyCart", result);
    return { success: true, data: result };
  } catch (error) {
    // return { success: false, error: error.message };
    const errMsg = getErrorMessage(error);
    return { success: false, error: errMsg };
  }
}

/**
 * 計算購物車總金額
 * @returns {Promise<Object>}
 */
async function getCartTotal() {
  // 請實作此函式
  // 提示：呼叫 fetchCart() 取得購物車資料
  // 回傳格式：{ total: 原始金額, finalTotal: 折扣後金額, itemCount: 商品筆數 }
  try {
    const result = await fetchCart();

    if (!result || !Array.isArray(result.carts)) {
      throw new Error("購物車資料異常");
    }

    const { total = 0, finalTotal = 0, carts } = result;

    // 商品筆數（幾種商品）
    const itemCount = carts.length;

    return {
      total,
      finalTotal,
      itemCount,
    };
  } catch (error) {
    console.error("getCartTotal error:", error.message);

    return {
      total: 0,
      finalTotal: 0,
      itemCount: 0,
    };
  }
}

/**
 * 顯示購物車內容
 * @param {Object} cart - 購物車資料
 */
function displayCart(cart) {
  // 請實作此函式
  // 提示：先判斷購物車是否為空（cart.carts 不存在或長度為 0），若空則輸出「購物車是空的」
  // 會使用到 utils formatCurrency() 來格式化金額
  //
  // 預期輸出格式：
  // 購物車內容：
  // ----------------------------------------
  // 1. 產品名稱
  //    數量：2
  //    單價：NT$ 800
  //    小計：NT$ 1,600
  // ----------------------------------------
  // 商品總計：NT$ 1,600
  // 折扣後金額：NT$ 1,600

  //判斷購物車是否為空（cart.carts 不存在或長度為 0）
  if (!cart?.carts || cart?.carts.length === 0) {
    console.log("購物車是空的");
    return;
  }
  console.log("購物車內容：");
  console.log("----------------------------------------");

  // 顯示每個商品
  cart.carts.forEach((item, index) => {
    const productName = item?.product?.title;
    const quantity = Number(item?.quantity);
    const price = Number(item?.product?.price);
    const subtotal = quantity * price;

    console.log(`${index + 1}. ${productName}`);
    console.log(`   數量：${quantity}`);
    console.log(`   單價：${formatCurrency(price)}`);
    console.log(`   小計：${formatCurrency(subtotal)}`);
    console.log("----------------------------------------");
  });

  // 顯示總計
  console.log(`商品總計：${formatCurrency(Number(cart?.total ?? 0))}`);
  console.log(`折扣後金額：${formatCurrency(Number(cart?.final_total))}`);
}

module.exports = {
  getCart,
  addProductToCart,
  updateProduct,
  removeProduct,
  emptyCart,
  getCartTotal,
  displayCart,
};
