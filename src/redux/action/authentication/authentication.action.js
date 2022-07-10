import { ActionTypes } from "../actionType";
import funAuth from './../../../utils/firebase/auth/index';

export const appAuthentication = {
   getUserSignedIn: (authdata,callback) => async dispatch => {
      const response = await funAuth.LoginOrCreate(authdata,'login')
      dispatch({
         type:ActionTypes.Authentication.USER_AUTH_IN,
         payload:response
      })
   }, 
   getUserRegistrationDetails: (authdata) => async dispatch => {
      const response = await funAuth.LoginOrCreate(authdata,'newuser')
      dispatch({
         type:ActionTypes.Authentication.USER_REGISTRATION,
         payload:response
      })
   },
   getAuthenticatedUserData : () => async dispatch => {
      const response = await funAuth.logState()
      dispatch({
         type:ActionTypes.Authentication.GET_USER_AUTH_DATA,
         payload:response
      })
      localStorage.setItem('isLoggedIn',JSON.stringify(response))
   },
   setUserSignOut: () => async  dispatch => {
      const response = await funAuth.logOut()
      dispatch({type:ActionTypes.Authentication.USER_AUTH_OUT, payload: response})
      localStorage.setItem('isLoggedIn',JSON.stringify([]))
   },
}