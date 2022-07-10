import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { ActionTypes } from "../action/actionType";
import { AppAuthenticated } from './auth_reducer/authentication.reducer';
import { ApplicationData } from './data_reducer/appdata.reducer';

const persistConfig = {
   key:'root',
   storage: storage,
   whitelist:['AppAuthenticated'],
   stateReconciler: autoMergeLevel2
}
const appReducer = combineReducers({
  AppAuthenticated,
  ApplicationData
})
export const rootReducer = (state,action) => {
   switch(action.type){
      case ActionTypes.Authentication.USER_AUTH_OUT:
         return appReducer(undefined,action)
      default : return appReducer(state,action)
   }
}

export default persistReducer(persistConfig,rootReducer)