import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

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

export default router