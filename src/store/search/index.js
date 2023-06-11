import { reqGetSearchInfo } from "@/api"

// 数据仓库
const state = {
    searchList: {}
}

// 修改数据仓库数据
const mutations = {
    // 修改searchList数据
    GETSRARCHLIST(state, value) {
        state.searchList = value
    }
}

// 向mutation提交数据，可以书写业务逻辑
const actions = {
    // 发请求获取数据
    async getsearchlist(context, params = {}) {
        const res = await reqGetSearchInfo(params)
        if (res.code === 200) {
            context.commit('GETSRARCHLIST', res.data)
        }
    }
}

// 计算属性，简化数据获取
const getters = {
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    total(state) {
        return state.searchList.total || 0
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}