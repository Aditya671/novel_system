import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Styles from '../../assets/static/scss/spacing.module.scss';
import { NavLink } from 'react-router-dom';
const HeaderLink = ({props,linkType,icon,onClick,label,path,...rest}) => {
   return (
      <Fragment>
         {linkType === 'button' ? (
            <span className={`${Styles['pl-3']} ${window.screen.width < 575 ? `${Styles['py-2']}`: `` }`}>
               <button className='bg-transparent text-theme border-none' onClick={onClick}  {...rest}>
                  {label ? (
                  <span style={{margin:'0 8px',fontSize:'20px',verticalAlign:'middle'}}>
                     {label}
                  </span>) : null}
                  {icon ? (
                  <span 
                  style={{marginRight:'8px',verticalAlign:'middle',
                  fontSize:`${window.screen.width < 575 ? '20px' : '28px'}`}}>
                     {icon}
                  </span>) : null}
               </button>
            </span>
         ) : (
            <span className={`${Styles['pl-3']}  ${window.screen.width < 575 ? `${Styles['py-2']}`: `` }`}>
               <NavLink to={path} {...rest} style={{textDecoration:'unset'}}
               // style={{textDecoration:'unset',display:'flex',justifyContent:'left',flexDirection:`${window.screen.width < 575 ? 'row-reverse' : 'row'}`}}
               >
                  {icon ? (
                     <span style={{marginRight:'8px',fontSize:'28px',verticalAlign:'middle'}}>{icon}</span>
                  ):null}
                  {label ? (
                     <span style={{margin:'0 8px',fontSize:'20px',verticalAlign:'middle'}}>{label}
                  </span>) : null}
                  
               </NavLink>
            </span>)
         }
      </Fragment>
   )
}
HeaderLink.propType = {
   linkType:PropTypes.oneOf('button,a')
}
export default HeaderLink;