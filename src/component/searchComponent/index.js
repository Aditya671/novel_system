import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import styled from 'styled-components';
import FormikFormComponent from './../common/formikComponent/FormikForm';
import { FormikInputField } from './../common/formikComponent/Field_Input';
import { AuthSchemas } from './../../helpers/schemas.auth';
import gridStyles from '../../assets/static/scss/grid.module.scss';
import { Strings } from './../../assets/strings/index';
import appDataActions from './../../redux/action/appdata/appData.action';

const SearchView = styled.div`
   position:absolute;
   right:0;
   left:auto;
   width:100%;
   z-index:10;
   padding: 10px 30px;
   width:90%;
   @media (max-width:575px){
      max-width:300px;
   };
   @media (max-width:380px){
      max-width:280px;
   };
   @media (min-width:576px) and (max-width:767px){
      max-width:460px;
   };
   @media(min-width:768px){
      max-width:600px;
   };
`;
const SearchBackdrop = styled.div`
   position:fixed;
   min-height:100%;
   min-width:100%;
   top:0;
   bottom:0;
   left:0;
   right:0;
`;
const SearchComponent = (props) => {
   const {showItself,setSearchComponentVisibility} = props
   const [showComponent,setShowComponent] = useState(showItself)
   const [searchTerm] = useState({
      keywords:''
   })
   const dispatch = useDispatch();
   // const checkTerm = (term) => term.length >= 3 ? dispatch(appDataActions.SearchCollection(term)): false
   const valueHandlerfunction = (term) =>{
      const {keywords} = term;
      debounce(() => keywords.length >= 3 ? dispatch(appDataActions.SearchCollection(keywords)): false,2000)
   }
   const hideItself = (value) => {
      if(value)
         setShowComponent(value);
      else{
         setShowComponent(false);
         setSearchComponentVisibility(false)
      }
   }
   return (
      <Fragment>
         {showComponent === true ? (
            <Fragment>
               <SearchBackdrop onClick={() => hideItself(false)} />
               <SearchView className='bg-theme text-theme'>
               <div className={`${gridStyles['row']}`}>
                  <div className={`${gridStyles['col-12']}`}>
                     <FormikFormComponent 
                        validatingSchema={AuthSchemas.searchSchema}
                        valueHandlerfunction={valueHandlerfunction}
                        initialValues={searchTerm}
                        formHeading='Please Enter name of the book'
                        buttonLabel={Strings.btn.btn_submit}
                     >
                        <FormikInputField 
                           autoFocus={true} label='Search'
                           type='text' name='keywords' isPassword={false}
                        />
                     </FormikFormComponent>
                  </div>
               </div>
               </SearchView>
            </Fragment>
         ) : null}
      </Fragment>
   )
}
export default SearchComponent;