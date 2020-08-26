import axios from 'axios'
import apiURL from '../constants/apiURL'
export const userSignup = signupData => {
    return axios({
        method: 'post',
        url: `${apiURL}/auth/signup`,
        data: signupData,
    })
}
export const userLogin = loginData => {
    return axios({
        method: 'post',
        url: `${apiURL}/auth/login`,
        data: loginData,
    })
}
export const updateUserProfile = profile => {
    return axios({
        method: 'put',
        url: `${apiURL}/userprofile`,
        data: profile,
    })
}
export const getUserInfomationUnderGround = userID => {
    console.log(userID)
    return axios({
        method: 'get',
        url: `${apiURL}/userInfomation?userID=${userID}`,
        data: null,
    })
}
