import React, { Fragment,useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Styles from './modal.module.css'
import resetStyles from '../../assets/static/scss/reset.module.scss';

export const ModalContainer = (props) => {
   const {title,actions,children,showModalfunction} = props;
   const [showModal,setShowModal] = useState(false)

   const handleClose = (state) => {
      setShowModal(!state)
      showModalfunction(state)
   }
   return ReactDOM.createPortal(
      <Fragment>
         <div className={`${Styles['modal-backdrop']}`} onClick={() => handleClose(!showModal)}></div>
         <div className={`${Styles.modal} 
            ${Screen.width > 767 ? `${Styles['modal-md']}` : `${Styles['modal-sm']}`}`}>
               <Fragment>
                  <div className={Styles['modal-content']}>
                     <div className={Styles['modal-header']}>
                        {title ? (
                           <Fragment>
                              <div className='modal-title'>
                                 <h3>{title}</h3>
                              </div>
                           </Fragment>
                        ) : null}

                     </div>
                     <div className={Styles['modal-body']}>
                        {children ? children : null}
                     </div>
                     <div className={Styles['modal-footer']}>
                        {actions ? actions: null}
                        <button className={`bg-theme ${resetStyles['btn']} text-theme`} onClick={() => handleClose(!showModal)} ></button>
                     </div>
                  </div>
               </Fragment>
         </div>
      </Fragment>
   ,document.querySelector('#modal')
   )
}
ModalContainer.propTypes = {
   title:PropTypes.string,
   actions:PropTypes.elementType,
   childrenBody:PropTypes.elementType,
   childrenFooter:PropTypes.elementType
}