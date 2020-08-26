import { call, put, delay } from 'redux-saga/effects'
import * as authConstants from '../constants/authConstants'
import { userSignup, userLogin } from '../apis/user'
import statuscode from '../constants/statuscode'
export function* userSignupSaga({ signupData }) {
    yield put({
        type: authConstants.SIGNING_UP,
        signing_up: true,
    })
    try {
        const signupRes = yield call(userSignup, signupData)
        yield put({
            type: authConstants.SIGNUP_SUCCESS,
            signup_success: true,
        })
        yield delay(1000)
        yield put({
            type: authConstants.SIGNUP_SUCCESS,
            signup_success: null,
        })
    } catch (error) {
        const errorCode = error.response.status
        const errorMessage = error.response.data
        if (errorCode === 409) {
            yield put({
                type: authConstants.SIGNUP_FAIL,
                signup_fail: { message: errorMessage },
            })
            yield delay(5000)
            yield put({
                type: authConstants.SIGNUP_FAIL,
                signup_fail: null,
            })
        }
    }

    yield put({
        type: authConstants.SIGNING_UP,
        signing_up: false,
    })
}
export function* userLoginSaga({ loginData }) {
    //logging in
    yield put({
        type: authConstants.LOGGING_IN,
        logging_in: true,
    })
    try {
        const loginRes = yield call(userLogin, loginData)
        const payload = loginRes.data
        yield put({
            type: authConstants.LOGIN_SUCCESS,
            login_success: true,
        })
        yield put({
            type: authConstants.RECEIVE_TOKEN,
            payload,
        })
        yield delay(1000)
        yield put({
            type: authConstants.LOGIN_SUCCESS,
            login_success: null,
        })
    } catch (error) {
        const errorCode = error.response.status
        const errorMessage = error.response.data
        yield put({
            type: authConstants.LOGIN_FAIL,
            login_fail: { message: errorMessage },
        })
        yield delay(5000)
        yield put({
            type: authConstants.LOGIN_FAIL,
            login_fail: null,
        })
    }
    yield put({
        type: authConstants.LOGGING_IN,
        logging_in: false,
    })
}
// export function* updateUserProfileSaga({ profile }) {
//     yield put({
//         //adding post
//         type: postConstants.ADDING_POST,
//         loading: true,
//     })
//     const res = yield call(addPost, newPost)
//     if (res.status == statuscode.SUCCESS) {
//         // if add success
//         yield put({
//             type: postConstants.ADDPOST_SUCCESS,
//         })
//     } else {
//         //if add failed
//         yield put({
//             type: postConstants.ADDPOST_FAIL,
//         })
//     }
//     yield delay(500)
//     yield put({
//         type: postConstants.ADDING_POST,
//         loading: false,
//     })
// }
