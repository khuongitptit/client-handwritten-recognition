import profileRequest from '../services/profile'
import profileConstants from '../constants/profile'

export const searchProfile = payload => {
  return dispatch => {
    dispatch({type: profileConstants.SEARCH_PROFILE,payload});
    return profileRequest.searchProfile(payload);
  }
}