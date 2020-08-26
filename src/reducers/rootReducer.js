import { combineReducers } from 'redux'
import authreducer from './authreducer'
import postsreducer from './postsreducer'
const rootReducer = combineReducers({
    authreducer,
    postsreducer,
})
export default rootReducer
