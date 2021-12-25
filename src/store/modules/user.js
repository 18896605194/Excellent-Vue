import { login, getUserInfo } from '@/api/sys'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant' //避免hardcode
import { ElMessage } from 'element-plus'
import { Promise } from 'core-js'
import router from '@/router'
export default {
    namespaced: true,
    state: () => ({
        token: getItem(TOKEN) || '',
        userInfo: {}
    }),
    mutations: {
        setToken(state, token) {
            state.token = token
            setItem(TOKEN, token)
        },
        setUserInfo(state, userInfo) {
            state.userInfo = JSON.stringify(userInfo)
        }
    },
    actions: {
        /*  登录操作 */
        login(context, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(ref => {
                        ElMessage.success("登陆成功")
                        console.log(ref.data)
                        this.commit('user/setToken', ref.token.accessToken.tokenContent)
                        this.commit('user/setUserInfo', ref.data)
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        /* 获取一个户信息 */
        getUserInfo(context, userInfo) {
            return new Promise((resolve, reject) => {
                getUserInfo(userInfo).then(ref => {

                    this.commit('user/setUserInfo', ref.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /*   用户主动退出 */
        loginOut() {
            //讲token 和用户信息直接置空
            this.commit('user/setToken', '')
            this.commit('user/setUserInfo', {})
            router.push('/')
                //TODO:相关权限直接置空
        }
    }
}