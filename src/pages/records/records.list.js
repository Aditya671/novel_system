import React, { Fragment, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import appDataActions from './../../redux/action/appdata/appData.action';
import { isEmpty } from 'lodash';
import ListData from '../../component/common/gridListView/assetsBased';
import { withRouter } from 'react-router';

const ListofRecords = (props) => {
   const {collectionData,selectedCollection,recentCollections,completeRec} = props;
   const [rec,setRec] = useState(null)

   useEffect(() => {
      if(rec === null || isEmpty(rec)){
         collectionData()
      }
      if(completeRec !== null || isEmpty(completeRec)){
         setRec(completeRec)
      }           
   // eslint-disable-next-line
   },[collectionData,rec,setRec])
   useMemo(() => {
      if(completeRec !== null || isEmpty(completeRec)){
         setRec(completeRec)
      }  
   // eslint-disable-next-line
   },[collectionData,rec,setRec])
   const onSelectedClick = (linkKey,recentKey) => {
      selectedCollection(linkKey);
      recentCollections(recentKey)
   }
   return ( 
      <Fragment>
         <ListData list={rec} onSelectedClick={onSelectedClick}/>
      </Fragment>
    );
}

const mapStateToProps = (state) => ({
   completeRec : state.ApplicationData.CompleteData,
})
const mapDispatchToProps = (dispatch) => {
   let actionForRecords = bindActionCreators(appDataActions,dispatch)
   return {...actionForRecords}
}
ListofRecords.propTypes = {
   collectionData:PropTypes.func,
   completeRec:PropTypes.array
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ListofRecords));