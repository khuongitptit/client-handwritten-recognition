import { take, call, put, delay } from 'redux-saga/effects'
import * as postConstants from '../constants/postConstants'
import { fetchPosts, addPost } from '../apis/posts'
import statuscode from '../constants/statuscode'
export function* watchFetchPosts() {
    yield take(postConstants.GETPOST)
    yield put({
        //getting post
        type: postConstants.GETTING_POST,
        loading: true,
    })
    const res = yield call(fetchPosts)
    //get successful
    if (res.status == statuscode.SUCCESS) {
        console.log(res.data)
        yield put({
            type: postConstants.GETPOST_SUCCESS,
            posts: res.data,
        })
    } else {
        //get fail
        yield put({
            type: postConstants.GETPOST_FAIL,
        })
    }
    yield delay(500)
    yield put({
        type: postConstants.GETTING_POST,
        loading: false,
    })
}
export function* addPostSaga({ newPost }) {
    yield put({
        //adding post
        type: postConstants.ADDING_POST,
        loading: true,
    })
    const res = yield call(addPost, newPost)
    if (res.status == statuscode.SUCCESS) {
        console.log('post', res.data)
        // if add success
        yield put({
            type: postConstants.ADDPOST_SUCCESS,
            newAddedPost: res.data,
        })
    } else {
        //if add failed
        yield put({
            type: postConstants.ADDPOST_FAIL,
        })
    }
    yield delay(500)
    yield put({
        type: postConstants.ADDING_POST,
        loading: false,
    })
}
export function* addCommentSaga({ comment }) {
    console.log(comment)
}
export function* likeSaga({ like }) {
    console.log(like)
}
