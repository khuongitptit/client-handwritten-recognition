import axios from 'axios'
import apiURL from '../constants/apiURL'
export const fetchPosts = () => {
    return axios({
        method: 'get',
        url: `${apiURL}/post`,
        data: null,
    })
}
export const addPost = newPost => {
    return axios({
        method: 'post',
        url: `${apiURL}/post`,
        data: newPost,
    })
}
