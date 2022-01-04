import { createStore } from 'vuex' //状态管理
import getters from './modules/getter.js'
import user from './modules/user'
import app from './modules/app'
import theme from './modules/theme'
export default createStore({
    getters,
    modules: {
        user,
        app,
        theme
    }
})