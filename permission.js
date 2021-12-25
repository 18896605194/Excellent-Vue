import router from './src/router/index.js'
import store from './src/store/index.js'

// router.beforeEach(async (to, from, next) => {
//     // 存在 token ，进入主页
//     // if (store.state.user.token) {
//     // 快捷访问
//     if (store.getters.token) {
//       if (to.path === '/login') {
//         next('/')
//       } else {
//         next()
//       }
//     } else {
//       // 没有token的情况下，可以进入白名单
//       if (whiteList.indexOf(to.path) > -1) {
//         next()
//       } else {
//         next('/login')
//       }
//     }
//   })