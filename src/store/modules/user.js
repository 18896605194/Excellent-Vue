import { login } from '@/api/sys'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant' //避免hardcode
import { ElMessage } from 'element-plus'
export default {
    namespaced: true,
    state: () => ({
        token: getItem(TOKEN) || ''
    }),
    mutations: {
        setToken(state, token) {
            state.token = token
            setItem(TOKEN, token)
        }
    },
    actions: {
        login(context, userInfo) {
            // const { username, password } = userInfo
            return new Promise((resolve, reject) => {
                login(userInfo)
                    .then(ref => {
                        console.log("1111111")
                        console.log(ref.data.success)
                        console.log(ref)
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
        }
    }
}