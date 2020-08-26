import { fork, takeEvery } from 'redux-saga/effects'
import { watchFetchPosts, addPostSaga, likeSaga, addCommentSaga } from './posts'
import { userSignupSaga, userLoginSaga } from './auth'
import * as postConstants from '../constants/postConstants'
import * as authConstants from '../constants/authConstants'
export default function* rootSaga() {
    //auth
    yield takeEvery(authConstants.SIGNUP, userSignupSaga)
    yield takeEvery(authConstants.LOGIN, userLoginSaga)
    //post
    yield fork(watchFetchPosts)
    yield takeEvery(postConstants.ADDPOST, addPostSaga)
    // yield takeEvery(postConstants.ADD_COMMENT, addCommentSaga)
    // yield takeEvery(postConstants.LIKE, likeSaga)
}
