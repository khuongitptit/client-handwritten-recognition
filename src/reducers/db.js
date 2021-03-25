import appConstants from '../constants/app'


const defaultState = {}
const db = (state = defaultState, action) => {
  switch(action.type) {
    case appConstants.APP_LOADED: {
      console.log("111111",action);
      return {...state}
    }
  }
}

export default db;