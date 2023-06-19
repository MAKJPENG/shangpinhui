// 引入文件
import Vue from 'vue'
import vueRouter from 'vue-router'
import { getToken } from '@/utils/token'
import store from '@/store'
// 引入路由组件
/* import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess' */
// 注册路由插件
Vue.use(vueRouter)

// 备份push和replace
const originPush = vueRouter.prototype.push
const originReplace = vueRouter.prototype.replace
// 重写push和replace
vueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
vueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 创建并暴露路由模块
const router = new vueRouter({
    // 设置路由跳转后滚动条的位置
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
    routes: [
        // 订单中心页面路由
        {
            path: '/center',
            name: 'center',
            component: () => import('@/pages/Center'),
            meta: {
                //控制在这个路径footer组件是否隐藏
                show: true,
            }
        },
        // 支付成功页面路由
        {
            path: '/paySuccess',
            name: 'paySuccess',
            component: () => import('@/pages/PaySuccess'),
            meta: {
                //控制在这个路径footer组件是否隐藏
                show: true,
            },
            beforeEnter: (to, from, next) => {
                // 判断只有从pay才能进入该路由
                if (from.path === '/pay') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        // 支付页面路由
        {
            path: '/pay',
            name: 'pay',
            component: () => import('@/pages/Pay'),
            meta: {
                //控制在这个路径footer组件是否隐藏
                show: true,
            },
            beforeEnter: (to, from, next) => {
                // 判断只有从trade才能进入该路由
                console.log('111')
                if (from.path === '/trade') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        // 交易页面路由
        {
            path: '/trade',
            name: 'trade',
            component: () => import('@/pages/Trade'),
            meta: {
                //控制在这个路径footer组件是否隐藏
                show: true,
            },
            beforeEnter: (to, from, next) => {
                // 判断只有从购物车才能进入该路由
                if (from.path === '/shopcart') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        // 详情页路由
        {
            path: '/detail/:goodId',
            name: 'detail',
            component: () => import('@/pages/Detail'),
            meta: {
                //控制在这个路径footer组件是否隐藏
                show: true,
            }
        },
        // 添加购物车成功路由
        {
            path: '/addcartsuccess',
            name: 'addcartsuccess',
            component: () => import('@/pages/AddCartSuccess'),
            meta: {
                //控制在这个路径footer组件是否隐藏
                show: true,
            },
            beforeEnter: (to, from, next) => {
                // 判断只有从购物车才能进入该路由
                if (from.path.indexOf('/detail') != -1) {
                    next()
                } else {
                    next(false)
                }
            }
        },
        // 购物车路由
        {
            path: '/shopcart',
            name: 'shopcart',
            component: () => import('@/pages/ShopCart'),
            meta: {
                //控制在这个路径footer组件是否隐藏
                show: true,
            }
        },
        // 首页路由信息
        {
            path: '/home',
            component: () => import('@/pages/Home'),
            meta: {
                //控制在这个路径footer组件是否隐藏
                show: true,
            }
        },
        // 登录路由信息
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/Login'),
            meta: {
                show: false,
            }

        },
        // 注册路由信息
        {
            path: '/register',
            component: () => import('@/pages/Register'),
            meta: {
                show: false,
            }
        },
        // 搜索路信息
        {
            name: 'search',
            path: '/search/:keyword?',
            component: () => import('@/pages/Search'),
            meta: {
                show: true,
            }
        },
        // 配置重定向到首页
        {
            path: "*/",
            redirect: '/home'
        }
    ]
})

// 全局前置路由守卫
router.beforeEach(async (to, from, next) => {
    // 登录后的token值
    const token = getToken()
    // 用户名信息
    const name = store.state.user.userInfo.name
    // 判断是登录
    if (token) {
        // 登录了
        if (to.path === '/login' || to.path === '/register') {
            // 登录后不允许去/login
            next('/')
        } else {
            // 登录后判断是否获取到了用户信息
            if (name) {
                // 如果有用户信息就放行
                next()
            } else {
                // 没有用户信息就获取用户信息
                try {
                    // 获取用户信息
                    await store.dispatch('user/getUserInfo')
                    next()
                } catch (error) {
                    // 如果报错了，说明获取不到用户信息，可能是token过期了，需要重新登录
                    // 先清除浏览器token再登录
                    await store.dispatch('user/logOutUser')
                    // 重新登录，跳转到登录界面
                    next('/login')
                }
            }
        }
    } else {
        // 没有登录,当访问到某些网页的时候就需要登录
        const toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/paysuccess') != -1 || toPath.indexOf('/center') != -1) {
            // 跳转到登录页面进行登录
            next('/login?redirect=' + toPath)
        } else {
            next()
        }
    }

})


export default router