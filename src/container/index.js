import React, { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { isEmpty } from 'lodash';
import AppRoutes  from './../routes/index';
import { Header } from '../component/header';
import Footer from './../component/footer/index';
import DateTimeComponent from './../component/date_time/index';
import Styles from '../assets/static/scss/grid.module.scss'
import resetStyles from '../assets/static/scss/reset.module.scss'
import spacingStyles from '../assets/static/scss/spacing.module.scss'
import { useDispatch } from 'react-redux';
import { appAuthentication } from './../redux/action/authentication/authentication.action';
import { useSelector } from 'react-redux';
import withDimensions from './../helpers/higherOrderComponents/withDimensions';
import { useViewPort } from './../helpers/customHooks/useViewPort';
import appDataActions from './../redux/action/appdata/appData.action';
import history from '../component/common/history';

const Container = () => {
   const [authData,setAuthData] = useState([])
   // const authenticatedD = localStorage.getItem('isLoggedIn')
   const isLoggedIn = useSelector((state) => state.AppAuthenticated)
   const dispatch = useDispatch()
   const footerHeight = useRef(null);
   const containerHeight = useRef(null);
   const {screenHeight} = useViewPort()
   
   const footerdimensions = useCallback((height) => {
      return footerHeight.current = height
   },[])

   useEffect(() => {
      dispatch(appDataActions.collectionData())
      if(!isEmpty(localStorage.getItem('isLoggedIn')) || localStorage.getItem('isLoggedIn') !== null){
         const isAuthIn = JSON.parse(localStorage.getItem('isLoggedIn'))
         setAuthData(isAuthIn)
      }
      else{
         history.push('/register')
      }
      
   }, [isLoggedIn,dispatch])
   
   useLayoutEffect(() => {
      if(screenHeight !== null){
         containerHeight.current = screenHeight
      }
   },[screenHeight])
   const onLogout = useCallback((LogState) => {
      if(LogState === true){
         dispatch(appAuthentication.setUserSignOut())
         localStorage.setItem('isLoggedIn',[])
      }
      else if(isEmpty(localStorage.getItem('isLoggedIn')) === true){
         alert('Please Login First');
         <Redirect to='/login'/>
      }
   },[dispatch])
   return(
      <Fragment>
         <div className={`${resetStyles['position-relative'] } `}>
            <main className={`${Styles.container} getDimensions ${spacingStyles['mx-auto'] }`} 
               style={{minHeight:`${containerHeight.current - footerHeight.current}px`}}>
               <Header AuthData={authData} onLogout={onLogout}/>
               <AppRoutes AuthData={authData}/>
            </main>            
               <Footer Footerdimensions={footerdimensions}/>
               <Fragment>   
               <DateTimeComponent/>
            </Fragment>         
         </div>
      </Fragment>
   )
}
export default withDimensions(Container)