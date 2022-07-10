import { ActionTypes } from "../actionType";
import getDataStoreFun from './../../../utils/firebase/realtime_db/index';

const url = 'books'
const appDataActions = {
   collectionData: () => async dispatch => {
      const response = await getDataStoreFun.getRecords(url)
      dispatch({
         type:ActionTypes.App.COMPLETE_RECORDS,
         payload:response
      })
   },
   collectionKeys : () => async dispatch => {
      const response = await getDataStoreFun.getKeys(url)
      dispatch({
         type:ActionTypes.App.RECORD_KEY,
         payload:response
      })
   
   },
   selectedCollection: (key) => async dispatch => {
      const response = await getDataStoreFun.getRecordfromKey(url,key)
      dispatch({
         type:ActionTypes.App.SELECTED_RECORD,
         payload:response})
         console.log(response)
   },
   recentCollections : (key) => async dispatch => {
      const response = await getDataStoreFun.getRecordfromKey(url,key)
      dispatch({
         type:ActionTypes.App.RECENTLY_VIEWED,
         payload:response
      })
   },
   addData : (data) => async dispatch => {
      const response = await getDataStoreFun.pushDataSet(url,data)
      dispatch({
         type:ActionTypes.App.ADD_RECORD,
         payload:response
      })
   },
   editData : (data) => async dispatch => {
      const response = await getDataStoreFun.editCompleteData(url,data)
      dispatch({
         type:ActionTypes.App.EDIT_RECORD,
         payload:response
      })
   },
   updateData : (key,value) => async dispatch => {
      const response = await getDataStoreFun.updateInRecord(url,key,value)
      dispatch({
         type:ActionTypes.App.UPDATE_RECORD,
         payload:response
      })
   },
   deleteData : (key) => async dispatch => {
      const response = await getDataStoreFun.deleteValueInRecord(url,key)
      dispatch({
         type:ActionTypes.App.DELETE_RECORD,
         payload:response
      })
   },
   SearchCollection : (term) => async dispatch => {
      const response = await getDataStoreFun.searchInRecord(url,'Title',term)
      dispatch({
         type:ActionTypes.App.SEARCH_IN_RECORD,
         payload:response
      })
   }
}
export default appDataActions;

