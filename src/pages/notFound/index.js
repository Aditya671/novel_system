import React, { Fragment, useEffect, useState } from 'react';

import NotFoundImg from '../../assets/static/images/notfound.jpg'
import gridStyles from '../../assets/static/scss/grid.module.scss'
import textStyles from '../../assets/static/scss/text.module.scss'
import { Strings } from './../../assets/strings/index';
import styled  from 'styled-components';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

const NotFoundComponent = styled.img`
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   width: 100%;
   height: 100%;
   z-index: -1;
`
const NotFound = ({AuthData}) => {
   const [userName,setUserName] = useState(null)

   const isLoggedIn = useSelector((state) => state.AppAuthenticated)
   useEffect(() => {
      if(!isEmpty(isLoggedIn)){
         setUserName(isLoggedIn.name);
      }
   },[AuthData,userName,setUserName,isLoggedIn])
   return(
      <Fragment>
         <div className={gridStyles['row']}>
            <div className={`${gridStyles['col--12']} ${textStyles['text-center']}`}>
               <NotFoundComponent src={NotFoundImg} alt={Strings.navigation[404]} />
               <h2 className='text-secondary'>
                  Hey {userName !== null ? userName : 'Robot'} 
                  <br/>
                  Please Visit The available Url
               </h2>
               <p>{Strings.navigation.page_not_found}</p>
            </div>
         </div>
      </Fragment>
   )
}
export default NotFound;