const getters = {
    token: state => state.user.token,
    userInfo: state => JSON.parse(state.user.userInfo),
    /*  是否存在用户信息 */
    HasUserInfo: state => state.user.userInfo !== '{}'

}
export default getters