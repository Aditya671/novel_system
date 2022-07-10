import { combineReducers } from 'redux';
import { CompleteData,SelectedRecord, SelectedRecentData,AddData,EditData,UpdateData,DeleteData,SearchData } from './record.reducer';

export const ApplicationData = combineReducers({
   CompleteData,
   SelectedRecord, 
   SelectedRecentData,
   AddData,
   EditData,
   UpdateData,
   DeleteData,
   SearchData
})