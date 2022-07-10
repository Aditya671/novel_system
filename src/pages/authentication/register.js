import React, { Fragment, useState } from 'react';
import {useDispatch} from 'react-redux'
import FormikFormComponent from './../../component/common/formikComponent/FormikForm';
import { FormikInputField } from '../../component/common/formikComponent/Field_Input';
import { appAuthentication } from '../../redux/action/authentication/authentication.action';
import { AuthSchemas } from './../../helpers/schemas.auth';
import gridStyles from '../../assets/static/scss/grid.module.scss'
import spacingStyles from '../../assets/static/scss/spacing.module.scss'
import { Strings } from './../../assets/strings/index';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import history from '../../component/common/history'

const RegisterComponent = (props) => {
   // eslint-disable-next-line
   const [formData,setFormData] = useState({
      email:'',
      password:''
   })
   const isLoggedIn = useSelector((state) => state.AppAuthenticated)
   const dispatch = useDispatch()
   const valueHandlerfunction = (formdata) =>{
      if(isEmpty(isLoggedIn)){
         dispatch(appAuthentication.getUserRegistrationDetails(formdata))
         dispatch(appAuthentication.getAuthenticatedUserData());
         setTimeout(() => history.push('/home'),600);
         
      }
      else{
         alert('User is Already Logged In')
         history.push('/home')
      }
   }
   
   return (
      <Fragment>
         <section className={`${spacingStyles['mx-auto']} ${gridStyles.row} ${gridStyles['justify-content-center']} ${gridStyles['align-items-center']}`}>
            <div className={`${gridStyles['col-11']} ${gridStyles['col-md-8']} ${gridStyles['col-lg-6']}`}>
               <fieldset className={`${spacingStyles['m-3']}`}>
                  <legend>{Strings.auth.createAcc}</legend>
                  <FormikFormComponent 
                     validatingSchema={AuthSchemas.registrationSchema}
                     valueHandlerfunction={valueHandlerfunction}
                     initialValues={formData}
                     buttonLabel={Strings.btn.btn_register}>
                        <FormikInputField
                           label='username'
                           type='text' 
                           name='username'
                           isPassword={false}
                           autoComplete='myapp'
                        />
                        <FormikInputField
                           label='phone'
                           type='text' 
                           name='phone'
                           isPassword={false}
                           autoComplete='myapp'
                        />
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
                        <FormikInputField 
                           label='confirmPassword'
                           type='password' 
                           name='confirmPassword'
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
export default RegisterComponent