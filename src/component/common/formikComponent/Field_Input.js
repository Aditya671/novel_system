import React, { Fragment, useEffect, useState } from 'react';
import { Field } from 'formik';
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import { isEmpty } from 'lodash';
import formStyles from '../../../assets/static/scss/forms.module.scss';
import resetStyles from '../../../assets/static/scss/reset.module.scss';
import styled  from 'styled-components';

const HiddenButton = styled.button`
   position:absolute;
   top:55%;
   right:10px;
   left:auto;
   bottom:auto;
   transform:translateY(-50%);
   background:transparent;
   border:none;
   font-size:20px;
`;
export const FormikInputField = (props) => {
   const {label,type,name,isPassword,touched,errors,...rest} = props;
   const [showPassword,setShowPassword] = useState(false)
   const [updateName,setUpdateName] = useState('')
   useEffect(() => {
      if(!isEmpty(name)){
         let d  = name.charAt(0).toUpperCase() + name.slice(1)
         setUpdateName(d)
      }
   },[name,setUpdateName])
   return(
      <Fragment>
         <div className={`${formStyles["form-group"]}`}>
         {/* Is Field is Password type then below will be used */} 
         {label ? <label htmlFor={name}>{updateName}</label> : null}
            {(isPassword === false) ? (
                  <Field className={`${formStyles['form-control']}`} 
                     type={type} name={name} placeholder={`Enter ${updateName}`}
                     {...rest}/>
               ) : 
               (
               <div className={`${resetStyles['position-relative']}`} style={{display:'flex'}} onClick={e => e.preventDefault()}>
                  <Field style={{width:'100%'}} placeholder={`Enter ${updateName}`}
                     className={`${formStyles['form-control']}`} name={name} 
                     type={!showPassword === true ? 'password' : 'text'} 
                     {...rest}/>
                     <HiddenButton className={``} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}
                     </HiddenButton> 
               </div>
            )}
            
         </div>
      </Fragment>
   )
}