import { reqAddressInfo, reqOrderInfo } from "@/api"
// 数据仓库
const state = {
    addressInfo: [],
    orderInfo:{}
}

// 修改数据仓库数据
const mutations = {
    GETADDRESSINFO(state, value) {
        state.addressInfo = value
    },
    GETORDERINFO(state, value) {
        state.orderInfo = value
    }
}

// 向mutation提交数据，可以书写业务逻辑
const actions = {
    // 获取用户地址数据
    async getAddressInfo(context) {
        const res = await reqAddressInfo()
        if (res.code === 200) {
            context.commit('GETADDRESSINFO', res.data)
        }
    },
    // 获取交易页订单数据
    async getOrderInfo(context) {
        const res = await reqOrderInfo()
        if (res.code === 200) {
            context.commit('GETORDERINFO', res.data)
        }
    }
}

// 计算属性，简化数据获取
const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}