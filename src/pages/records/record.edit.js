import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import history from '../../component/common/history';
import { useParams } from 'react-router';
import {Prompt} from 'react-router-dom';
import FormikFormComponent from './../../component/common/formikComponent/FormikForm';
import { FormikInputField } from '../../component/common/formikComponent/Field_Input';
import { AuthSchemas } from '../../helpers/schemas.auth';
import { Strings } from './../../assets/strings/index';
import spacingStyles from './../../assets/static/scss/spacing.module.scss';
import InputCustomType from './../../component/common/input_AsForwardRef/inputCustomType';

const EditRecord = () => {
   const urlKey = useParams();
   const itemPrice = useRef();
   const getSelectedRecordData = useSelector((state) => state.ApplicationData.SelectedRecord);
   const isLoggedIn = useSelector((state) => state.AppAuthenticated);
   const [initialFormData,setInitialFormData] = useState([])
   const [priceEnable,setPriceEnable] = useState(false);
   const [isEditing,SetIsEditing] = useState(false);
   useEffect(() => {
      if(isEmpty(isLoggedIn)){
         alert('Plese Login to Edit this Record')
         history.push('/login')
      }
      else{
         if(isEmpty(getSelectedRecordData)){
            alert('No record Selected');
            history.push('/records');
         }
         else if(getSelectedRecordData.id !== urlKey.Rcid){
            alert('Url Mismatch. Redirecting to all records page');
            history.push('/records');
         }
         else{
            if(isEmpty(initialFormData))
               setInitialFormData([getSelectedRecordData]);
               // eslint-disable-next-line
               itemPrice.current = getSelectedRecordData.price;
         }
      }
   // eslint-disable-next-line
   },[isLoggedIn,urlKey,setInitialFormData,getSelectedRecordData])
   useEffect(() => {
      let result = false;
      if(priceEnable === true){
         result = window.confirm('For Changing price an Admin Approval is Needed.\nAre You Sure You want to Change The Price')
         if(result === true){
            alert('Ok!! An Email will be Sent to the Admin')
         }else{
            setPriceEnable(false)
            setInitialFormData([getSelectedRecordData])
         }
      }
      else{
         setInitialFormData([getSelectedRecordData])
      }
   },[priceEnable,getSelectedRecordData])
   const valueHandlerfunction = (initialFormData) => {
      console.log(initialFormData);
      initialFormData.map(function(val){
         isEmpty(val) ? SetIsEditing(true) : SetIsEditing(false);
      }); 
   }
   return (
      <Fragment>
         <Prompt when={isEditing} message={(location) => 'updates will not be saved?'} />
         {initialFormData && Object.values(initialFormData).map(function (prevValues){ 
            return (<FormikFormComponent key={prevValues.key}
            validatingSchema={AuthSchemas.recordScheme}
            valueHandlerfunction={valueHandlerfunction}
            initialValues={prevValues}
            buttonLabel={Strings.btn.btn_edit}>
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
               {priceEnable === true ? (
                  <FormikInputField
                     label='Price'
                     type='text' 
                     name='price'
                     isPassword={false}
                     autoComplete='myapp'
                  />
               ) : null}
               <FormikInputField
                  label='Description'
                  style={{resize:'none'}}
                  type='text' 
                  rows='6'
                  name='description'
                  as='textarea'
                  isPassword={false}
                  autoComplete='myapp'
               />
            </FormikFormComponent>
            )
         })}
         <div className={`${spacingStyles['px-5']}`}>
            <p>Do you want to update the price of this Book?</p>
               <form>
                  <InputCustomType displayText='Yes' type='radio' name='selectPrice' value='yes' onChange={() => setPriceEnable(true)}/>
                  <InputCustomType displayText='No' type='radio' checked={!priceEnable ? 'checked' : ''} name='selectPrice' value='no' onChange={() => setPriceEnable(false)} />
                  {/* <input onChange={() => setPriceEnable(true)} type='radio' name='selectPrice' value='yes'/>Yes
                  <input onChange={() => setPriceEnable(false)} type='radio' name='selectPrice' value='no'/>No */}
               </form>
         </div>
      </Fragment>
   )
}
export default EditRecord;