import React, { Fragment, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { CardView } from './../../component/common/cardBoxView/cardView';
import { Link, useRouteMatch } from 'react-router-dom';
import {BsPencilSquare} from 'react-icons/bs';
import gridStyles from '../../assets/static/scss/grid.module.scss';
import spacingStyles from '../../assets/static/scss/spacing.module.scss';
import resetStyles from '../../assets/static/scss/reset.module.scss';
import textStyles from '../../assets/static/scss/text.module.scss';

const SelectedRecordComponent = (props) => {
   const {selected} = props;
   const [selectedData,setSelectedData] = useState([]);
   const isLoggedIn = useSelector((state) => state.AppAuthenticated)
   const match = useRouteMatch()
   useEffect(() => {
      if(!isEmpty(selected)){
         setSelectedData([selected])
      }
   },[isLoggedIn,setSelectedData,selected])
   
   return(
      <Fragment>
         <div className={`${spacingStyles['mx-auto']} ${gridStyles['row']} ${resetStyles['position-relative']} `}>
            <div className={gridStyles['col-12']}>
               {!isEmpty(isLoggedIn) ? (
                  <Fragment>
                     <div className={`${window.screen.width < 575 ? textStyles['text-right'] : '' } 
                     ${window.screen.width < 575 ? spacingStyles['mr-3'] : '' }
                     `}>
                        <Link 
                           className={`bg-theme text-theme ${window.screen.width > 575 ? resetStyles['alignProperTopRight'] : ''}
                              ${window.screen.width < 575 ? resetStyles['position-relative'] :  resetStyles['position-absolute']} `} 
                           to={`${match.url}/edit`}><BsPencilSquare/></Link>
                     </div>
                  </Fragment>
               ) : null}
               <div className={`${spacingStyles['px-3']} ${spacingStyles['py-2']}`}>
                  {selectedData.map(function(val){
                     return (  
                        <Fragment key={val.key}>
                           <CardView RcKey={val.key} title={val.title} val={val} imgSrc={val.imageUrl}/>
                        </Fragment>
                     )
                  })}
               </div>
            </div>
         </div>

      </Fragment>
   )
}
SelectedRecordComponent.propTypes = {
   selected:PropTypes.any
}
const mapStateToProps = (state) => ({
   selected:state.ApplicationData.SelectedRecord
})
export default connect(mapStateToProps,null)(SelectedRecordComponent);