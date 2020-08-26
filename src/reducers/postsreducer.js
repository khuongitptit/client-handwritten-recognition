import * as postConstants from '../constants/postConstants'
const initialState = {
    posts: [],
    error_get: false,
    loading_get: false,
    success_add: false,
    error_add: false,
    loading_add: false,
}
const posts = (state = initialState, action) => {
    switch (action.type) {
        case postConstants.GETPOST_SUCCESS:
            return { ...state, posts: action.posts }
        case postConstants.GETPOST_FAIL:
            return { ...state, error_get: true }
        case postConstants.GETTING_POST:
            return { ...state, loading_get: action.loading }
        case postConstants.ADDPOST_SUCCESS:
            return {
                ...state,
                success_add: true,
                posts: [...state.posts, action.newAddedPost],
            }
        case postConstants.ADDPOST_FAIL:
            return { ...state, error_add: true }
        case postConstants.ADDING_POST:
            return { ...state, loading_add: action.loading }
        default:
            return state
    }
}
export default posts
