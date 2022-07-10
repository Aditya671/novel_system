 // Created with Reselect package
// takes a list of records and record Id's and picks out the selected records.
//  gets data when we select a book from complete records and stores upto 3 records.

import _ from 'lodash';
import { createSelector } from 'reselect';


// // Create Select Funtions to pick off the pieces of state we care about for the calculations
const collectionSelector =  (state) => state.ApplicationData.CompleteData;
const recentlyViewedSelector = (state) => state.ApplicationData.SelectedRecentData

export const getRecentlyViewed = (CompleteData, SelectedRecentData) => {
  const filteredData = [];
  const recentRecords = _.chain(SelectedRecentData).map((selected, key) => {
    return selected ? key : ''
  })
  .flatten()
  .compact()
  .value();
  recentRecords.map(function(va){
    const filtered =  _.filter(CompleteData, recent => _.includes(recent.id,va));
    return filteredData.push(...filtered)
  });
  return filteredData;
};
export default createSelector(
    collectionSelector,
    recentlyViewedSelector,
    getRecentlyViewed
)