import React, { Fragment } from 'react';
import { Formik,Form } from 'formik';
import formStyles from '../../../assets/static/scss/forms.module.scss';
import buttonStyles from '../../../assets/static/scss/button.module.scss';
import textStyles from '../../../assets/static/scss/text.module.scss';
import spacingStyles from '../../../assets/static/scss/spacing.module.scss';

const FormikFormComponent = (props) => {
   const {
      validatingSchema,
      valueHandlerfunction,
      initialValues,
      formHeading,
      buttonLabel,
      children
   } = props;
   
   const handleSubmit = (formData) => {
      valueHandlerfunction(formData)
   }
   return (
      <Fragment>
         {formHeading ? (<h2>{formHeading}</h2>) : null}
         <Formik 
            initialValues={initialValues ? initialValues : null}
            enableReinitialize
            validationSchema={validatingSchema ? validatingSchema : null}
            onSubmit={(values) => handleSubmit(values)}
            >
               {({touched,isSubmitting,isValid,dirty,errors}) => (
                  <Form className=''>
                     {children ? children : null}
                     {errors.name && touched.name ? (
                        <div className={`${formStyles["form-error"]}`}>
                           <span className={`${formStyles["error-text"]}`}>{errors.name}</span>
                        </div>
                     ) : null}
                     <div className={`${formStyles["form-group"]} ${spacingStyles['py-4']} ${textStyles['text-left']}`}>
                     <button 
                        className={`${buttonStyles['btn']}`} 
                        disabled={isSubmitting ? !isValid : !dirty} type="submit">
                           {buttonLabel}
                     </button>
                     </div>
                  </Form>
               )}
            </Formik>
      </Fragment>
   )
}
export default FormikFormComponent;