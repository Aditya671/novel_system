import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Users } from './../../utils/nav_links/user.navigation.object';
import spacingStyles from '../../assets/static/scss/spacing.module.scss';
import resetStyles from '../../assets/static/scss/reset.module.scss';
import gridStyles from '../../assets/static/scss/grid.module.scss';

const Accounts = () => {
   const isLoggedIn = useSelector((state) => state.AppAuthenticated)
   useEffect(() => {
      // console.log(isLoggedIn)
   },[isLoggedIn]) 
   return(
      <div className={`${spacingStyles['mx-auto']} ${gridStyles['row']} ${resetStyles['position-relative']} `}>
         <div className={`${gridStyles['col-12']} ${gridStyles['col-md-3']}`}>
            <div className={` ${spacingStyles['m-4']}`}>
            {Users.map(function(nav){
               return <div className=''>{nav.title}</div>
            })}
            </div>
         </div>
         <div className={`${gridStyles['col-12']} ${gridStyles['col-md-9']}`}></div>
      </div>
   )
}
export default Accounts;