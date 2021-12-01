import { createStore } from 'vuex' //状态管理
import user from './modules/user.js' //yoghurt操作
export default createStore({
    modules: {
        user
    }
})