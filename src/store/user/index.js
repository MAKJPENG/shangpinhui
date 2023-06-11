import { reqCode, reqRegister, reqLogin, reqUserInfo, reqLogOut } from "@/api"
import { setToken, getToken, removeToken } from '@/utils/token'
// 数据仓库
const state = {
    code: '',
    userInfo: {}
}

// 修改数据仓库数据
const mutations = {
    GETCODE(state, value) {
        state.code = value
    },
    GETUSERLOGIN(state, value) {
        state.userInfo = value
    },
    CLEAR(state) {
        state.userInfo = {}
        removeToken()
    }
}

// 向mutation提交数据，可以书写业务逻辑
const actions = {
    // 获取验证码
    async getCode(context, phone) {
        const res = await reqCode(phone)
        if (res.code === 200) {
            context.commit('GETCODE', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('falie'))
        }
    },
    // 注册用户
    async userRegister(context, data) {
        const res = await reqRegister(data)
        if (res.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message || 'falie'))
        }
    },
    // 用户登录
    async userLogin(context, data) {
        const res = await reqLogin(data)
        if (res.code === 200) {
            // 本地化保存token
            setToken(res.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('用户名或密码不正确'))
        }
    },
    // 获取用户信息
    async getUserInfo(context) {
        const res = await reqUserInfo()
        // 判断是否获取成功
        if (res.code === 200) {
            context.commit('GETUSERLOGIN', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('获取用户信息失败'))
        }
    },
    // 退出登录
    async logOutUser(context) {
        const res = await reqLogOut()
        if (res.code = 200) {
            context.commit('CLEAR')
            return 'ok'
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