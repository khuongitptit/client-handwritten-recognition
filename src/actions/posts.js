import * as postConstants from '../constants/postConstants'
export const actionGetPost = () => {
    return {
        type: postConstants.GETPOST,
    }
}
export const actionAddPost = newPost => {
    return {
        type: postConstants.ADDPOST,
        newPost,
    }
}
export const actionLike = like => {
    return {
        type: postConstants.LIKE,
        like,
    }
}
export const actionAddComment = comment => {
    return {
        type: postConstants.ADD_COMMENT,
        comment,
    }
}
