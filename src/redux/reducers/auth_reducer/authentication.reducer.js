
import { ActionTypes } from './../../action/actionType';

const Initial_State = []
export const AppAuthenticated = (state = Initial_State,action) => {
   switch (action.type) {
      case ActionTypes.Authentication.USER_AUTH_IN:
         return true
         
      case ActionTypes.Authentication.USER_REGISTRATION:
         return true
    
      case ActionTypes.Authentication.GET_USER_AUTH_DATA:
         return action.payload
    
      default:
         return state
   }
}