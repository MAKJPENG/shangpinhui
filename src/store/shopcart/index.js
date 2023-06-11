import { reqCartList, reqDeleteCart, reqUpdataChecked } from "@/api"

// 数据仓库
const state = {
    cartList: []
}

// 修改数据仓库数据
const mutations = {
    GETCARTLIST(state, value) {
        state.cartList = value
    }
}

// 向mutation提交数据，可以书写业务逻辑
const actions = {
    // 获取购物车列表
    async getCartList(context) {
        const res = await reqCartList()
        if (res.code === 200) {
            context.commit('GETCARTLIST', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('falie'))
        }
    },
    // 删除购物车数据
    async getDeleteCart(context, skuId) {
        const res = await reqDeleteCart(skuId)
        if (res.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('falie'))
        }
    },
    // 修改商品选中状态
    async getUpdataChecked(context, { skuId, isChecked }) {
        const res = await reqUpdataChecked(skuId, isChecked)
        if (res.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('falie'))
        }
    },
    // 删除所有选中商品
    DeleteAllChecked(context) {
        const PromiseAll = []
        let res
        // 循环商品数据列表
        context.getters.cartList.cartInfoList.forEach((item) => {
            // 判断选中状态
            if (item.isChecked === 1) {
                res = context.dispatch('getDeleteCart', item.skuId)
            }
            PromiseAll.push(res)
        })
        // 返回成功状态
        return Promise.all(PromiseAll)
    },
    // 全选商品
    updataAllIsChecked(context, isChecked) {
        const PromiseAll = []
        let res
        context.getters.cartList.cartInfoList.forEach((item) => {
            res = context.dispatch('getUpdataChecked', { skuId: item.skuId, isChecked: isChecked })
        })
        PromiseAll.push(res)
        // 返回成功结果
        return Promise.all(PromiseAll)
    }
}

// 计算属性，简化数据获取
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}