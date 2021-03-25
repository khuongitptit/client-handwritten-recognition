import postRequest from '../services/post'
import postConstants from '../constants/post'
export const addPost = payload => {
  return dispatch => {
    dispatch({type: postConstants.ADD_POST,payload});
    return postRequest.addPost(payload);
  }
}