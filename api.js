// ========================================
// API 請求函式
// ========================================

const axios = require("axios");
const { API_PATH, BASE_URL, ADMIN_TOKEN } = require("./config");

// ========== 客戶端 API ==========

/**
 * 取得產品列表
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  // 請實作此函式
  // 回傳 response.data.products
  try {
    const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`;

    const response = await axios.get(url);

    if (!response || !response.data || !Array.isArray(response.data.products)) {
      throw new Error("API 回傳格式錯誤");
    }
    // console.log("成功取得資料：", data);
    return response.data.products;
  } catch (error) {
    console.log("錯誤：", error.message);
    return [];
  }
}

/**
 * 取得購物車
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function fetchCart() {
  // 請實作此函式
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`,
    );

    if (
      !data ||
      !Array.isArray(data.carts) ||
      typeof data.total !== "number" ||
      typeof data.finalTotal !== "number"
    ) {
      throw new Error("API 回傳格式異常");
    }

    return {
      carts: data.carts,
      total: data.total,
      finalTotal: data.finalTotal,
    };
  } catch (error) {
    const message =
      error.response?.data?.message || error.response?.data || error.message;

    console.error("取得購物車失敗:", message);

    throw new Error(message);
  }
}

/**
 * 加入購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function addToCart(productId, quantity = 1) {
  // 請實作此函式
  if (!productId || typeof productId !== "string") {
    throw new Error("productId 為必填");
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("quantity 必須為正整數");
  }

  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`,
      { data: { productId, quantity } },
    );
    // API 回傳防呆（避免 undefined）
    if (!data || !data.carts) {
      throw new Error("API 回傳格式異常");
    }

    return {
      carts: data.carts,
      total: data.total ?? 0,
      finalTotal: data.finalTotal ?? 0,
    };
  } catch (error) {
    const message =
      error.response?.data?.message || error.response?.data || error.message;
    console.error("加入購物車失敗:", message);

    // 可選：轉成自訂錯誤（讓 UI 更好處理）
    throw new Error(message);
  }
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function updateCartItem(cartId, quantity) {
  // 請實作此函式

  if (!cartId) {
    throw new Error("cartId 為必填");
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("quantity 必須為正整數");
  }

  try {
    const { data } = await axios.patch(
      `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`,
      { data: { id: cartId, quantity } },
    );

    return {
      carts: data.carts,
      total: data.total ?? 0,
      finalTotal: data.finalTotal ?? 0,
    };
  } catch (error) {
    console.error("更新購物車失敗:", error.response?.data || error.message);
    throw error; // 保留錯誤讓外層處理
  }
}

/**
 * 刪除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function deleteCartItem(cartId) {
  // 請實作此函式
  if (!cartId) {
    throw new Error("cartId 為必填");
  }
  try {
    const { data } = await axios.delete(
      `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts/${cartId}`,
    );

    return {
      carts: data.carts,
      total: data.total ?? 0,
      finalTotal: data.finalTotal ?? 0,
    };
  } catch (error) {
    console.error("更新購物車失敗:", error.response?.data || error.message);
    throw error; // 保留錯誤讓外層處理
  }
}

/**
 * 清空購物車
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function clearCart() {
  // 請實作此函式
  try {
    const { data } = await axios.delete(
      `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`,
    );
    if (!data || !Array.isArray(data.carts)) {
      throw new Error("API 回傳格式異常");
    }

    // 強制回傳「清空後狀態」（關鍵）
    return {
      carts: [],
      total: 0,
      finalTotal: 0,
    };
  } catch (error) {
    const message =
      error.response?.data?.message || error.response?.data || error.message;

    console.error("清空購物車失敗:", message);
    throw new Error(message);
  }
}

/**
 * 建立訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function createOrder(userInfo) {
  // 請實作此函式
  try {
    if (!userInfo || typeof userInfo !== "object") {
      throw new Error("userInfo is not valid");
    }

    const { data } = await axios.post(
      `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/orders`,
      {
        data: {
          user: userInfo,
        },
      },
    );
    if (!data || !data.id) {
      throw new Error("API 回傳格式異常");
    }

    return data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.response?.data || error.message;

    console.error("建立訂單失敗:", message);

    throw new Error(message);
  }
}

// ========== 管理員 API ==========

/**
 * 管理員 API 需加上認證
 * 提示：
    headers: {
      authorization: ADMIN_TOKEN
    }
 */

/**
 * 取得訂單列表
 * @returns {Promise<Array>}
 */
async function fetchOrders() {
  // 請實作此函式
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`,
      {
        headers: {
          authorization: ADMIN_TOKEN,
        },
      },
    );

    if (!data || !Array.isArray(data.orders)) {
      throw new Error("API 回傳格式異常");
    }

    return data.orders;
  } catch (error) {
    const message =
      error.response?.data?.message || error.response?.data || error.message;

    console.error("取得訂單列表失敗:", message);

    throw new Error(message);
  }
}

/**
 * 更新訂單狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, isPaid) {
  // 請實作此函式
  try {
    if (!orderId || typeof orderId !== "string") {
      return {
        success: false,
        error: "orderId is not valid",
      };
    }
    if (typeof isPaid !== "boolean") {
      return {
        success: false,
        error: "isPaid is not valid",
      };
    }
    const { data } = await axios.put(
      `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`,
      {
        data: {
          id: orderId,
          paid: isPaid,
        },
      },
      {
        headers: {
          authorization: ADMIN_TOKEN,
        },
      },
    );
    // console.log("updateOrderStatus(),data=", data);
    if (!data || !data.status) {
      return {
        success: false,
        error: data?.message || "更新訂單狀態失敗",
      };
    }

    return {
      success: true,
      data: data.orders,
    };
  } catch (error) {
    const message =
      error.response?.data?.message || error.response?.data || error.message;

    console.error("更新訂單狀態失敗:", message);

    return {
      success: false,
      error: message,
    };
  }
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function deleteOrder(orderId) {
  // 請實作此函式
  const { data } = await axios.delete(
    `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders/${orderId}`,
    {
      headers: {
        authorization: ADMIN_TOKEN,
      },
    },
  );
  return data;

  // try {
  //   const res = await axios.delete(
  //     `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders/${orderId}`,
  //     {
  //       headers: {
  //         authorization: ADMIN_TOKEN,
  //       },
  //     },
  //   );
  //   return res.data;
  // } catch (error) {
  //   const message =
  //     error.response?.data?.message || error.response?.data || error.message;

  //   console.error("刪除訂單失敗:", message);

  //   return {
  //     status: false,
  //     message,
  //   };
  // }
}

module.exports = {
  fetchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
};
