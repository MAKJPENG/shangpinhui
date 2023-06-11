// 引入request请求函数
import { reqCategoryList, reqBannerList, reqFloorList } from '@/api/index'

// 数据仓库
const state = {
    categoryList: [],
    bannerList: [],
    floorList:[]
}

// 修改数据仓库数据
const mutations = {
    // 修改商品分类列表数据
    CATEGORYLIST(state, value) {
        // console.log(value)
        state.categoryList = value.slice(0, 16)
    },
    // 修改轮播图数据
    BANNERLIST(state, value) {
        state.bannerList = value
    },
    // 修改floor数据
    GETFLOORLIST(state, value) {
        state.floorList=value
    }
}

// 向mutation提交数据，可以书写业务逻辑
const actions = {
    // 获取商品分类列表数据
    async categoryList(context) {
        const res = await reqCategoryList()
        // console.log(res.data)
        context.commit('CATEGORYLIST', res.data)
    },
    // 获取轮播图数据
    async getbannerlist(context) {
        const res = await reqBannerList()
        // console.log(res)
        context.commit('BANNERLIST', res.data)
    },
    // 获取floor数据
    async getfloorlist(context) {
        const res = await reqFloorList()
        context.commit('GETFLOORLIST',res.data)
    }
}

// 计算
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}