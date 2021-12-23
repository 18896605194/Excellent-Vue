import { login, getUserInfo } from '@/api/sys'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant' //避免hardcode
import { ElMessage } from 'element-plus'
import { Promise } from 'core-js'
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
            state.userInfo = userInfo
        }
    },
    actions: {
        login(context, userInfo) {
            // const { username, password } = userInfo
            return new Promise((resolve, reject) => {
                login(userInfo).then(ref => {
                        if (ref.data.success == false) {
                            ElMessage.error(ref.data.errorMessage)
                        } else {
                            ElMessage.success("登陆成功！")
                        }
                        this.commit('user/setToken', ref.data.token.accessToken.tokenContent)
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        getUserInfo(context, userInfo) {
            return new Promise((resolve, reject) => {
                getUserInfo(userInfo).then(ref => {
                    this.commit('user/setUserInfo', ref.data.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}