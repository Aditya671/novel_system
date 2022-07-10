import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.css';
const ToastNotrification = () => {
   return (  
      <React.Fragment>
         <ToastContainer position="bottom-right" autoClose={5000} 
            hideProgressBar={false} newestOnTop={false} closeOnClick/>
      </React.Fragment>
   );
}
 
export default ToastNotrification;