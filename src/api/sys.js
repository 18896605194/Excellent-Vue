import request from '@/utils/request'

/**
 * 登录
 */
export const login = data => {
    return request({
        url: 'api/User/Login',
        method: 'POST',
        data
    })
}

/**
 * 获取用户信息
 */
export const getUserInfo = data => {
    return request({
        url: 'api/User/UserInfo',
        method: 'POST',
        data
    })
}