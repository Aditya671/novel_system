import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import history from '../../component/common/history';
import FormikFormComponent from '../../component/common/formikComponent/FormikForm';
import { FormikInputField } from '../../component/common/formikComponent/Field_Input';
import { AuthSchemas } from '../../helpers/schemas.auth';
import { Strings } from '../../assets/strings/index';

const AddRecord = () => {
   const isLoggedIn = useSelector((state) => state.AppAuthenticated)
   //eslint-disable-next-line
   const [initialFormData,setInitialFormData] = useState({
      title:'',
      author:'',
      price:'',
      description:''
   })
   useEffect(() => {
      if(isEmpty(isLoggedIn)){
         alert('Plese Login to Edit this Record')
         history.push('/login')
      }
      else{
      }
   // eslint-disable-next-line
   },[isLoggedIn])
   const valueHandlerfunction = (initialForm) => {
      console.log(initialForm);
   }
   return (
      <Fragment>
         <FormikFormComponent 
            validatingSchema={AuthSchemas.recordScheme}
            valueHandlerfunction={valueHandlerfunction}
            initialValues={initialFormData}
            buttonLabel={Strings.btn.btn_add}>
               <FormikInputField
                  label='Title'
                  type='text' 
                  name='title'
                  readOnly={true}
                  isPassword={false}
                  autoComplete='myapp'
               />
               <FormikInputField
                  label='Author'
                  type='text' 
                  name='author'
                  isPassword={false}
                  autoComplete='myapp'
               />
               <FormikInputField
                  label='Price'
                  type='text' 
                  name='price'
                  isPassword={false}
                  autoComplete='myapp'
               />
               <FormikInputField
                  label='Description'
                  type='text' 
                  style={{resize:'none'}}
                  rows='6'
                  name='description'
                  as='textarea'
                  isPassword={false}
                  autoComplete='myapp'
               />
            </FormikFormComponent>
      </Fragment>
   )
}
export default AddRecord;