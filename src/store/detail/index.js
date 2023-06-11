import { reqGetGoodInfo, reqAddOrUpDataShopCar } from "@/api"
import {getUUID} from '@/utils/uuid_token'
// 数据仓库
const state = {
    goodInfo: {},
    uuid_token: getUUID()
}

// 修改数据仓库数据
const mutations = {
    GETGOODINFO(state, value) {
        state.goodInfo = value
    }
}

// 向mutation提交数据，可以书写业务逻辑
const actions = {
    //发送请求获取详情页数据
    async getGoodInfo(context, goodId) {
        const res = await reqGetGoodInfo(goodId)
        if (res.code === 200) {
            context.commit('GETGOODINFO', res.data)
        }
    },
    // 发送请求添加购物车或者更新购物车
    async addOrUpdataShopCar(context, { skuId, skuNum }) {
        const res = await reqAddOrUpDataShopCar(skuId, skuNum)
        if (res.code === 200) {
            // 返回成功结果
            return 'ok'
        } else {
            // 返回失败结果
            return Promise.reject(new Error('faile'))
        }
    }
}

// 计算属性，简化数据获取
const getters = {
    // 导航路劲区域
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 平台售卖属性
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}