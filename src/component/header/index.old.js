import React , {Fragment, useEffect, useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { FaSearch } from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';
import { StoreUrls } from './../../utils/nav_links/nav.object';
import SearchComponent from '../searchComponent';
// Static Files
import Styles from '../../assets/static/scss/spacing.module.scss';
import gridStyles from '../../assets/static/scss/grid.module.scss'
import headerStyles from '../../assets/static/scss/header.module.scss'
import { Strings } from './../../assets/strings/index';
// custom Hooks
import { useViewPort } from './../../helpers/customHooks/useViewPort';


export const Header = ({AuthData,onLogout}) => {
   const [userName,setUserName] = useState(null)
   const [open,setOpen] = useState(false)
   const [navUrls,setNavUrls] = useState([])
   const isLoggedIn = useSelector((state) => state.AppAuthenticated)
   const {screenWidth} = useViewPort();
   const breakpoint = 992;
   const setLoginState = false
   
   useEffect(() => {
      if(!isEmpty(AuthData)){
          const {name} = AuthData
          setUserName(name)
      }
      setNavUrls({...StoreUrls})
   },[setNavUrls,setUserName,AuthData,isLoggedIn])
   useLayoutEffect(() => {
      if(screenWidth < breakpoint){
         localStorage.setItem('headerCollapsed',true)
      }
      else{
         localStorage.setItem('headerCollapsed',false)
      }
   // eslint-disable-next-line
   },[screenWidth,breakpoint])
   const handleLogout = (getLoginState) => {
      onLogout(getLoginState)
   }
   const handleSearch = (open) => {
      setOpen(open)
   }
   useEffect(() => {
      if(userName !== null){
         alert(`Hey ${userName} Welcome to the Application`)
      }
   },[userName])
   return (
      <Fragment>
         <header className={gridStyles['row']}>
            <div className={gridStyles['col-12']}>
               <div className={`${Styles['py-4']} ${Styles['px-3']}`}>
                  {localStorage.getItem('headerCollapsed') === 'true' ? (
                     <Fragment>
                        <div className={`${headerStyles['sidebar']}`}>ola</div>
                     </Fragment>
                  ) : (<Fragment></Fragment>)}
                  {
                  // eslint-disable-next-line
                  Object.values(navUrls).map(function(v){
                     if(isEmpty(AuthData) !== v.isLoggedIn){
                        return Object.values(v.Allurls).map(links => {
                           return (
                              <span key={links.title} style={{display:'inline-block'}} className={`${Styles['pl-5']}`}>
                                 <NavLink style={{textDecoration:'unset',display:'inline-block'}} to={links.path}>
                                    <span style={{margin:'0 8px',fontSize:'20px',verticalAlign:'middle'}}>{links.title}</span>
                                    <span style={{marginRight:'8px',fontSize:'28px',verticalAlign:'middle'}}>{links.icon}</span>
                                 </NavLink>
                              </span>
                              )
                        })
                     }
                  })                     
               }
               
               {isEmpty(AuthData) === false ? (
                  <Fragment>
                     <span className={`${Styles['pl-5']}`}>
                        <button className='bg-transparent text-theme border-none' onClick={() => handleSearch(!open)}>
                           <span style={{marginRight:'8px',fontSize:'28px',verticalAlign:'middle'}}>
                              <FaSearch/>
                           </span>
                        </button>
                     </span>
                     <span className={`${Styles['pl-5']}`}>
                        <button className='bg-transparent text-theme border-none'onClick={() => handleLogout(!setLoginState)}>
                           <span style={{margin:'0 8px',fontSize:'20px',verticalAlign:'middle'}}>
                              {Strings.navigation.logout}
                           </span>
                           <span style={{marginRight:'8px',fontSize:'28px',verticalAlign:'middle'}}>
                              <FiLogOut/>
                           </span>
                        </button>
                     </span>
                  </Fragment>
               ) : null}
               </div>
            </div>
         </header>
         {open === true ? <SearchComponent showItself={open}/> : false}
      </Fragment>
   )
}
Header.propTypes = {
   AuthData:PropTypes.oneOfType('array','object')
}