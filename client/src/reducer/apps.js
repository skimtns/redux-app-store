import axios from 'axios'

const APPS = 'APPS'
const ADD_APP = 'ADD_APP'
const UPDATE_APP = 'UPDATE_APP'
const DELETE_APP = 'DELETE_APP'

export const getApps = () => {
  return (dispatch) => {
    axios.get('/api/apps')
      .then( res => dispatch({ type: APPS, apps: res.data}))
  }
}

export const addApp = (app) => {
  return (dispatch) => {
    axios.post('/api/apps', { app })
      .then( res => dispatch({ type: ADD_APP, app: res.data}))
  }
}

export default (state = [], action) => {
  switch(action.type) {
    case APPS:
      return action.apps
    case ADD_APP:
      return [action.app, ...state]
    case UPDATE_APP:
      return state.map( a => {
        if(a.id === action.id)
          return action.app
        return a
      })
    case DELETE_APP:
      return state.filter( a => a.id !== action.id)
    default:
      return state;
  }
}