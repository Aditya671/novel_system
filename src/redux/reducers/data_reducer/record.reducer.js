import { extend } from "lodash"
import { ActionTypes } from "../../action/actionType"
const INITIAL_DATA= []
// Fetch All Records
export const CompleteData = (state = INITIAL_DATA,action) => {
   switch(action.type){
      case ActionTypes.App.COMPLETE_RECORDS:
         return action.payload
      default : return state
   }
}
// Search Record in CompleteData
export const SearchData = (state = INITIAL_DATA,action) => {
   switch(action.type){
      case ActionTypes.App.SEARCH_IN_RECORD:
         console.log(action.payload)
         return action.payload
      default : return state
   }
}
// Add a New Record Information
export const AddData = (state = INITIAL_DATA,action) => {
   switch(action.type){
      case ActionTypes.App.ADD_RECORD:
         return action.payload
      default : return state
   }
}
// Edit Selected Record if user is Logged IN
export const EditData = (state = INITIAL_DATA,action) => {
   switch(action.type){
      case ActionTypes.App.EDIT_RECORD:
         return action.payload
      default : return state
   }
}
// Delete the Selected Record
export const DeleteData = (state = INITIAL_DATA,action) => {
   switch(action.type){
      case ActionTypes.App.DELETE_RECORD:
         return action.payload
      default : return state
   }
}
// Update a single value of selected Record
export const UpdateData = (state = INITIAL_DATA,action) => {
   switch(action.type){
      case ActionTypes.App.UPDATE_RECORD:
         return action.payload
      default : return state
   }
}
// Fetch the Single Selected Record Information
export const SelectedRecord = (state = INITIAL_DATA,action) => {
   switch(action.type){
      case ActionTypes.App.SELECTED_RECORD:
         let data = '';
         Object.values(action.payload).map(function(v){ return data = v} )
         return data
      default : return state
   }
}
// Make an Array of all Visited Records
let InitialObj = [];
export const SelectedRecentData = (state = InitialObj,action) => {
   switch(action.type){
      case ActionTypes.App.RECENTLY_VIEWED:
         let kk = 0
         Object.values(action.payload).map(function(val){
            return kk = val.key
         })
         return extend({},state,{
            [kk]:kk
         })
      default : return state
   }
}