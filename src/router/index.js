import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
const publicRoutes = [{
    path: '/',
    name: 'login',
    component: () =>
        import ('@/views/login/login')
}, {
    path: '/layout',
    name: 'layout',
    component: () =>
        import ('@/layout/index')
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: publicRoutes //也可以使用系统默认
})
router.beforeEach((to, from, next) => {
    console.log(store.getters)
        //判断是否存在token 存在下一步
    if (store.getters.token) {
        console.log('有token')
            //如果直接访问登录页面 直接放行
        if (to.path === '/login') {
            next('/')
        } else {
            console.log(store.getters.HasUserInfo)
                //不是直接转到login页面 先判断是否有用户信息 没有用户信息 直接去请求
            if (!store.getters.HasUserInfo) {
                console.log('准备获取用户信息')
                    // 获取用户信息
                store.dispatch('user/getUserInfo')
            }
            next()
        }
    } else {
        console.log('没有token')
            //不存在token 
        next()
    }
})
export default router