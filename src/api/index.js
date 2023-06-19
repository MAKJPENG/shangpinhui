// 统一管理api接口文档
import requests from "./requests"
import mockRequests from './mockRequests'

// 首页三级分类请求地址 /api/product/getBaseCategoryList
export const reqCategoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

// 轮播图数据请求地址 /mock/banner
export const reqBannerList = () => {
    return mockRequests({
        url: '/banner',
        method: 'get'
    })
}

// floor组件数据请求地址 /mock/banner
export const reqFloorList = () => {
    return mockRequests({
        url: '/floor',
        method: 'get'
    })
}

// Search组件数据请求地址/api/list
export const reqGetSearchInfo = (params) => {
    return requests({
        url: '/list',
        method: 'post',
        data: params
    })
}

// Detail详情页数据请求地址/api/
export const reqGetGoodInfo = (goodId) => {
    return requests({
        url: `/item/${goodId}`,
        method: 'get'
    })
}

// 添加到购物车(对已有物品进行数量改动)/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpDataShopCar = (skuId, skuNum) => {
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}

// 获取购物车列表/api/cart/cartList
export const reqCartList = () => {
    return requests({
        url: '/cart/cartList',
        method: 'get'
    })
}

// 删除购物车商品/api/cart/deleteCart/{skuId}
export const reqDeleteCart = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}

// 切换商品选中状态/api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdataChecked = (skuId, isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}

// 获取手机注册码/api/user/passport/sendCode/{phone}
export const reqCode = (phone) => {
    return requests({
        url: `user/passport/sendCode/${phone}`,
        method: 'get'
    })
}

// 注册用户/api/user/passport/register
export const reqRegister = (data) => {
    return requests({
        url: '/user/passport/register',
        method: 'post',
        data: data
    })
}

// 用户登录/api/user/passport/login
export const reqLogin = (data) => {
    return requests({
        url: '/user/passport/login',
        method: 'post',
        data: data
    })
}

// 获取用户信息/api/user/passport/auth/getUserInfo
export const reqUserInfo = () => {
    return requests({
        url: '/user/passport/auth/getUserInfo',
        method: 'get'
    })
}

// 退出登录/api/user/passport/logout
export const reqLogOut = () => {
    return requests({
        url: '/user/passport/logout',
        method: 'get'
    })
}

// 获取用户地址信息/api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => {
    return requests({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'get'
    })
}

// 获取交易页订单信息/api/order/auth/trade
export const reqOrderInfo = () => {
    return requests({
        url: '/order/auth/trade',
        method: 'get'
    })
}

// 提交订单/api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'post',
        data
    })
}

// 获取订单信息/api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get'
    })
}

// 查询订单支付状态/api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => {
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get'
    })
}

// 获取我的订单列表/api/order/auth/{page}/{limit}
export const reqMyOrder = (page, limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: 'get'
    })
}