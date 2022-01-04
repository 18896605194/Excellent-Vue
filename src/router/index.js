import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import layout from '@/layout/index'

/* 私有路由 */
const privateRoutes = [{
        path: '/user',
        component: layout,
        redirect: '/user/manage',
        meta: {
            title: 'user',
            icon: 'personnel'
        },
        children: [{
                path: '/user/manage',
                component: () =>
                    import ('@/views/user-manage/index'),
                meta: {
                    title: 'userManage',
                    icon: 'personnel-manage'
                }
            },
            {
                path: '/user/role',
                component: () =>
                    import ('@/views/role-list/index'),
                meta: {
                    title: 'roleList',
                    icon: 'role'
                }
            },
            {
                path: '/user/permission',
                component: () =>
                    import ('@/views/permission-list/index'),
                meta: {
                    title: 'permissionList',
                    icon: 'permission'
                }
            },
            {
                path: '/user/info/:id',
                name: 'userInfo',
                component: () =>
                    import ('@/views/user-info/index'),
                meta: {
                    title: 'userInfo'
                }
            },
            {
                path: '/user/import',
                name: 'import',
                component: () =>
                    import ('@/views/import/index'),
                meta: {
                    title: 'excelImport'
                }
            }
        ]
    },
    {
        path: '/article',
        component: layout,
        redirect: '/article/ranking',
        meta: {
            title: 'article',
            icon: 'article'
        },
        children: [{
                path: '/article/ranking',
                component: () =>
                    import ('@/views/article-ranking/index'),
                meta: {
                    title: 'articleRanking',
                    icon: 'article-ranking'
                }
            },
            {
                path: '/article/:id',
                component: () =>
                    import ('@/views/article-detail/index'),
                meta: {
                    title: 'articleDetail'
                }
            },
            {
                path: '/article/create',
                component: () =>
                    import ('@/views/article-create/index'),
                meta: {
                    title: 'articleCreate',
                    icon: 'article-create'
                }
            },
            {
                path: '/article/editor/:id',
                component: () =>
                    import ('@/views/article-create/index'),
                meta: {
                    title: 'articleEditor'
                }
            }
        ]
    }
]

/* 公开理由 */
const publicRoutes = [{
        path: '/',
        component: () =>
            import ('@/views/login/login')
    },
    {
        path: '/layout',
        // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
        component: layout,
        /*   redirect: '/layout', */
        children: [{
                path: '/profile',
                name: 'profile',
                component: () =>
                    import ('@/views/profile/index'),
                meta: {
                    title: 'profile',
                    icon: 'el-icon-user'
                }
            },
            {
                path: '/404',
                name: '404',
                component: () =>
                    import ('@/views/error-page/404')
            },
            {
                path: '/401',
                name: '401',
                component: () =>
                    import ('@/views/error-page/401')
            }
        ]
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [...publicRoutes, ...privateRoutes]
})

/**
 * 初始化路由表
 */
/* export function resetRouter() {
    if (
        store.getters.userInfo &&
        store.getters.userInfo.permission &&
        store.getters.userInfo.permission.menus
    ) {
        const menus = store.getters.userInfo.permission.menus
        menus.forEach(menu => {
            router.removeRoute(menu)
        })
    }
} */




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