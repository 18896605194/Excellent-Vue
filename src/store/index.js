import { createStore } from 'vuex' //状态管理
import getters from './modules/getter.js'
import user from './modules/user'
export default createStore({
    getters,
    modules: {
        user,

    }
})