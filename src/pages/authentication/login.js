import React, { Fragment, useCallback, useState } from 'react';
import {useDispatch} from 'react-redux'
import { FormikInputField } from '../../component/common/formikComponent/Field_Input';
import FormikFormComponent from './../../component/common/formikComponent/FormikForm';
import { AuthSchemas } from './../../helpers/schemas.auth';
import { appAuthentication } from './../../redux/action/authentication/authentication.action';
import gridStyles from '../../assets/static/scss/grid.module.scss'
import spacingStyles from '../../assets/static/scss/spacing.module.scss'
import { Strings } from './../../assets/strings/index';
import { useSelector } from 'react-redux';
import history from '../../component/common/history'
import useUnsavedExitPrompt from '../../helpers/customHooks/useUnsavedExitPrompt';

 const LoginComponent = (props) => {
   // eslint-disable-next-line
   const [formData,setFormData] = useState({
      email:'',
      password:''
   })
   const [showSavedExitPrompt,setShowSavedExitPrompt] = useUnsavedExitPrompt(false)
   const dispatch = useDispatch()
   const isLoggedIn = useSelector((state) => state.AppAuthenticated)
   const valueHandlerfunction = useCallback((logindata) =>{
      if(logindata !== 'undefined' || logindata !== {}){
         const {email,password} = logindata
         if(email === '' || password === '')
         {
            setShowSavedExitPrompt(!showSavedExitPrompt)
         }
         else{
            dispatch(appAuthentication.getUserSignedIn(logindata))
            dispatch(appAuthentication.getAuthenticatedUserData())
            if(isLoggedIn === []){
               dispatch(appAuthentication.getUserSignedIn(logindata))
               dispatch(appAuthentication.getAuthenticatedUserData())
               history.push('/home')
            }
         }
      }
      //eslint-disable-next-line
   },[dispatch,isLoggedIn,setShowSavedExitPrompt])
   return (
      <Fragment>
         <section className={`${spacingStyles['mx-auto']} ${gridStyles.row} ${gridStyles['justify-content-center']} ${gridStyles['align-items-center']}`}>
            <div className={`${gridStyles['col-11']} ${gridStyles['col-md-8']} ${gridStyles['col-lg-6']}`}>
               <fieldset className={`${spacingStyles['m-3']}`}>
                  <legend>{Strings.auth.existingAcc}</legend>
                  <FormikFormComponent 
                     validatingSchema={AuthSchemas.loginSchema}
                     valueHandlerfunction={valueHandlerfunction}
                     initialValues={formData}
                     buttonLabel={Strings.btn.btn_login}>
                        <FormikInputField
                           label='email' 
                           type='email' 
                           name='email'
                           isPassword={false}
                           autoComplete='myapp'
                            />
                        <FormikInputField 
                           label='password'
                           type='password' 
                           name='password'
                           isPassword={true}
                           autoComplete='myapp'
                            />
                     </FormikFormComponent>
               </fieldset>
            </div>
         </section>
      </Fragment>
   )
}
export default LoginComponent;