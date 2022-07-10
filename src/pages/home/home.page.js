import React, { Fragment, useEffect, useState } from 'react';
import gridStyles from '../../assets/static/scss/grid.module.scss';
import spacingStyles from '../../assets/static/scss/spacing.module.scss';
import { connect } from 'react-redux';
import getRecentlyViewed from './../../redux/selectors/recently_viewed.selector';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

const HomePage = (props) => {
   const [recentI,setRecentI] = useState([]);
   useEffect(() => {
      const {recentItems} = props;
      if(!isEmpty(recentItems)){
         setRecentI([...recentItems])
      }
   },[]);
   return (
      <Fragment>
         <div className={`${spacingStyles['mx-auto']} ${gridStyles.row}`}>
            {/* Banner Section */}
            <div className={`${gridStyles['col-12']} ${gridStyles['col-md-10']}`}>

            </div>
            {/* You may also Like Section */}
            <div className={`${gridStyles['col-12']} ${gridStyles['col-md-10']}`}>

            </div>
            <my-tooltip displaytext='mytitle' position='bottom'></my-tooltip>
            {/* Recently Viewed Section */}
            <div className={`${gridStyles['col-12']}`}>
               <div className={` ${spacingStyles['px-4']}`}>
                  <h2>Recently Viewed Items</h2>
                  {isEmpty(recentI) ? <Fragment>NONE YET<br/><br/>Please Select a book by visiting here: <Link to='/records'>Records</Link></Fragment> : null}
               </div>
               <div className={`${spacingStyles['mx-auto']} ${gridStyles['row']}  ${spacingStyles['px-4']} `}>
               {!isEmpty(recentI) ? (
                  Object.values(recentI).map(function(values){
                     return (
                        <Fragment>
                           <div className={`${gridStyles['col-12']} ${gridStyles['col-sm-6']} ${gridStyles['col-md-3']}`}>
                              <Link to={`/records/${values.id}`}>
                                 <img style={{maxWidth:'220px'}} alt={values.title} src={values.imageUrl}/>
                              </Link>
                           </div>
                        </Fragment>      
                     )
                  })
               ) : null}
               </div>
            </div>
         </div>
      </Fragment>
   )
}
const mapStatetoProps = (state) => {
   return {recentItems:getRecentlyViewed(state)}
}

export default connect(mapStatetoProps,null)(HomePage);