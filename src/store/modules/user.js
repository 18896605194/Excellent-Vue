import { login } from '@/api/sys'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant' //避免hardcode
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
                        console.log("11111111")
                        console.log(ref)
                        this.commit('setToken', data.data.data.token)
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    }
}