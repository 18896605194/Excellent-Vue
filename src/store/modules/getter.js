import { MAIN_COLOR } from '@/constant'
import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'
const getters = {
    token: state => state.user.token,
    userInfo: state => JSON.parse(state.user.userInfo),
    /*  是否存在用户信息 */
    HasUserInfo: state => state.user.userInfo !== '{}',
    tagsViewList: state => state.app.tagsViewList,
    cssVar: state => {
        return {
            ...state.theme.variables,
            ...generateColors(getItem(MAIN_COLOR))
        }
    },

}
export default getters