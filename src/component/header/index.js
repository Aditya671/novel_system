import React , {Fragment, useEffect, useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { FaSearch,FaUserPlus } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import {FiLogOut,FiLogIn} from 'react-icons/fi';
import {RiAccountBoxFill} from 'react-icons/ri';
import {ImCross} from 'react-icons/im';
import { StoreUrls } from './../../utils/nav_links/nav.object';
import SearchComponent from '../searchComponent';
import HeaderLink from './header.links';
// Static Files
import spacingStyles from '../../assets/static/scss/spacing.module.scss';
import gridStyles from '../../assets/static/scss/grid.module.scss';
import headerStyles from '../../assets/static/scss/header.module.scss';
import resetStyles from '../../assets/static/scss/reset.module.scss';
import textStyles from '../../assets/static/scss/text.module.scss';
import { Strings } from './../../assets/strings/index';
// custom Hooks
import { useViewPort } from './../../helpers/customHooks/useViewPort';
import styled from 'styled-components';


// Created with the help of Material UI Library/Package
// Uses App bar and Drawer components
const HeaderBackdrop = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   border: 0;
   background: rgba(0,0,0,0.5);
   z-index:1;
   min-height: 100%;
`
export const Header = ({AuthData,onLogout}) => {
   const [userName,setUserName] = useState(null)
   const [open,setOpen] = useState(false)
   const [showMobileMenu,setShowMobileMenu] = useState(false)
   const [navUrls,setNavUrls] = useState([])
   const isLoggedIn = useSelector((state) => state.AppAuthenticated)
   const {screenWidth} = useViewPort();
   const breakpoint = 1199;
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
   const onLogoutClick = (getLoginState) => {
      onLogout(getLoginState)
   }
   const handleSearch = (open) => {
      setOpen(open)
   }
   const setSearchComponentVisibility = (value) => {
   		setOpen(value)
   }
   const handleCollapseMenu = (show) => {
      setShowMobileMenu(show)
   }
   useEffect(() => {
      if(userName !== null){
         alert(`Hey ${userName} Welcome to the Application`)
      }
   },[userName])
   return (
      <Fragment>
         {showMobileMenu === true ? <HeaderBackdrop onClick={() => setShowMobileMenu(false)}/> : null}
         <header className={`${headerStyles['header']} ${gridStyles['row']} ${spacingStyles['mx-auto']} 
         ${showMobileMenu === true ? `${headerStyles['uncollapsed']}` : `${headerStyles['collapsed']}`}`}>
            {localStorage.getItem('headerCollapsed') === 'true' ? (
               <Fragment>
                  <div className={`${spacingStyles['py-4']} ${gridStyles['col-12']}`}>
                     <div className={`${gridStyles['row']} ${spacingStyles['mx-auto']}`}>
                        <span className={`${gridStyles['col-2']}`}>
                           <GiHamburgerMenu style={{fontSize:'28px',verticalAlign:'middle'}} onClick={() => handleCollapseMenu(!showMobileMenu)}/>
                        </span>
                        <span className={`${gridStyles['col-2']}`} style={{margin:'0 8px',fontSize:'20px',verticalAlign:'middle',display:'inline-block'}}>
                           <img style={{maxHeight:'35px'}} src={process.env.PUBLIC_URL +'/logo192.png'} alt='Application Logo' />
                        </span>
                        <span  className={`${gridStyles['col-7']} ${textStyles['text-right']}`}>
                           {isEmpty(AuthData) === false ? (
                              <Fragment>
                                 <HeaderLink linkType='link' to='/users' icon={<RiAccountBoxFill/>}/>
                                 <HeaderLink linkType='button' onClick={() => handleSearch(!open)} icon={<FaSearch/>}/>
                                 <HeaderLink linkType='button' onClick={() => onLogoutClick(!setLoginState)} icon={<FiLogOut/>}/>
                              </Fragment>
                           ) : (
                              <Fragment>
                                 <HeaderLink linkType='link' onClick={() => setTimeout(setShowMobileMenu(false),100)} to='/login' icon={<FiLogIn/>}/>
                                 <HeaderLink linkType='link' onClick={() => setTimeout(setShowMobileMenu(false),100)} to='/register' icon={<FaUserPlus/>}/>
                              </Fragment>
                           )}
                        </span> 
                     </div>  
                  </div>
                  {showMobileMenu ? 
                  <div className={`${headerStyles['sidebar']} ${showMobileMenu === true ? `${headerStyles['open']}`: `` }`}>
                  {
                     // eslint-disable-next-line
                     Object.values(navUrls).map(function(v){
                        if(isEmpty(AuthData) !== v.isLoggedIn){
                           return Object.values(v.Allurls).map((links,index) => {
                              return (
                                 <Fragment key={index}>
                                    <HeaderLink icon={links.icon} label={links.title} path={links.path} />
                                 </Fragment>
                              )
                           })
                        }
                     })                     
                  }
                  <div className={`${resetStyles['position-absolute']} ${resetStyles['alignProperTopRight']}`}>
                     <ImCross onClick={() => setShowMobileMenu(!showMobileMenu)} />
                  </div>
                  
                  </div> : null}
               </Fragment>
               ) : (
               <Fragment>
                  <div className={`${gridStyles['col-12']} ${gridStyles['col-sm-2']}`}>
                     <div className={`${spacingStyles['py-4']} ${spacingStyles['px-3']}`}>
                        <span style={{margin:'0 8px',fontSize:'20px',verticalAlign:'middle',display:'block'}}>
                           <img style={{maxHeight:'55px'}} src={process.env.PUBLIC_URL +'/logo192.png'} alt='Application Logo' />
                        </span>   
                     </div>
                  </div>
                  <div className={`${gridStyles['col-12']} ${gridStyles['col-sm-10']}`}>
               <div className={`${spacingStyles['py-4']} ${spacingStyles['px-3']} ${textStyles['text-right']}`}>
                  {
                  // eslint-disable-next-line
                  Object.values(navUrls).map(function(v){
                     if(isEmpty(AuthData) !== v.isLoggedIn){
                        return Object.values(v.Allurls).map((links,index) => {
                           return (
                              <Fragment key={index}>
                                 <HeaderLink icon={links.icon} label={links.title} path={links.path} />
                              </Fragment>
                           )
                        })
                     }
                  })                     
               }
               
               {isEmpty(AuthData) === false ? (
                  <Fragment>
                     <HeaderLink linkType='button' onClick={() => handleSearch(!open)} icon={<FaSearch/>}/>
                     <HeaderLink linkType='button' onClick={() => onLogoutClick(!setLoginState)} label={Strings.navigation.logout} icon={<FiLogOut/>}/>
                  </Fragment>
               ) : null}
               </div>
            </div>

               </Fragment>
               )}
            
         </header>
         {open === true ? <SearchComponent setSearchComponentVisibility={setSearchComponentVisibility} showItself={open}/> : false}
      </Fragment>
   )
}
Header.propTypes = {
   AuthData:PropTypes.oneOfType('array','object')
}