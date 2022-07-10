import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isEmpty } from 'lodash';
export const PrivateRoute = (props) => {
   const {path,AuthData,component:Component,render,...rest} = props;
   useEffect(() => {
     
   },[AuthData])
   return (
      <Route exact path={path} {...rest} render={(props) => 
         !isEmpty(AuthData) ? 
            (Component ? <Component {...props} AuthData/> : render(props) )
            : (
               <React.Fragment>
                  {/* {isEmpty(AuthData) ? (<Prompt message="Please Login First" when={true}/>) : null} */}
                  <Redirect to={{ pathname: "/login", state: { from: props.location } }}/>
               </React.Fragment>
         )
      } />
   )
}