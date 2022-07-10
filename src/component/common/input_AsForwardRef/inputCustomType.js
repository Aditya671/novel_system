import React, { Fragment } from 'react';
import formStyles from '../../../assets/static/scss/forms.module.scss';
import spacingStyles from '../../../assets/static/scss/spacing.module.scss';

const InputCustomType = React.forwardRef((props,ref) => {
   const {labelName,type,name,displayText,...rest} = props;
   return (
      <Fragment>
         {type !== 'text' ? (
            <div className={`${formStyles['form-group-inline']} ${spacingStyles['pl-3']}`}>
               {labelName ? <label htmlFor={name}>{labelName}</label> : null}
               <input className={`${formStyles['form-control']}`} type={type} {...rest} name={name} ref={ref}  />
               {displayText ? <span>{displayText}</span> : null}
            </div>
         ) : (
               <div className={`${formStyles['form-group']}`}>
                  {labelName ? <label htmlFor={name}>{labelName}</label> : null}
                  <input className={`${formStyles['form-control']}`} type={type} {...rest} name={name} ref={ref}  />
                  {displayText ? <span>{displayText}</span> : null}
               </div> 
         ) }
      </Fragment>
      
   )
})
export default InputCustomType;