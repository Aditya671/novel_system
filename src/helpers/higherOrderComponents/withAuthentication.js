import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import history from './../../component/common/history/index';

export const ChildComponent = (props) => {
   class AuthenticatedComponent extends React.Component{
      constructor(props){
         super(props);
      }
      // componentDidMount(){

      // }
      // componentDidUpdate(){

      // }
      render(){
         if(!localStorage.getItem('isLoggedIn') || isEmpty(localStorage.getItem('isLoggedIn')) ){
            let resp = confirm(`Do you want to create an Account? \nPress Ok if you want else cancel to go to login page`)
            if(resp === true){
               history.push('/register')
            }
            else{
               if(!localStorage.getItem('isLoggedIn') || this.props.location.pathname !== '/login' ){
                  return history.push('/login')
               }
               else if(isEmpty(localStorage.getItem('isLoggedIn')) || this.props.location.pathname !== '/login'){
                  return history.push('/login')
               }
               else{
                  return <ChildComponent {...this.props} />
               }
            }
         }
      }
   }
   const mapStatetoProps = (state) => {
      return {auth:state.AppAuthenticated};
   }
   return connect(mapStatetoProps,null)(AuthenticatedComponent);
}