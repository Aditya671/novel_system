import React, { Fragment, Suspense , lazy, useEffect, useRef, useState} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { PropTypes } from 'prop-types';
import { PrivateRoute } from './PrivateRoute';
import history from './../component/common/history/index';
const LoginComponent = lazy(() => import('./../pages/authentication/login') )
const RegisterComponent = lazy(() => import('./../pages/authentication/register') )
const HomePage = lazy(() => import('./../pages/home/home.page.js'))
const NotFound = lazy(() => import('./../pages/notFound'))
const ListofRecords = lazy(() => import('./../pages/records/records.list'))
const Accounts = lazy(() => import('../pages/users/accounts'))
const SelectedRecordComponent  = lazy(() => import('./../pages/records/record.selected'));
const EditRecord  = lazy(() => import('./../pages/records/record.edit'));
const AddRecord  = lazy(() => import('./../pages/records/record.add'));


const AppRoutes = ({AuthData}) => {   
   const currentLocation = useRef(null);
   const [currentPath,setCurrentPath] = useState(window.location.pathname);
   useEffect(() => {
      setCurrentPath(window.location.pathname);
      if(localStorage.getItem('currentpage') !== '/' || localStorage.getItem('currentpage') !== '/login'){
         currentLocation.current = localStorage.getItem('currentpage');
         
         history.push(currentLocation.current);
      }
   },[currentPath,setCurrentPath])

   return (
      <Fragment>
         <Suspense fallback={<h1>Loading...</h1>}>
            <Switch>
                  <Route exact path='/'>
                     <Redirect to={'/home'}/> 
                  </Route> 
                  {/* <Route path='/login' exact>
                     <LoginComponent/>
                  </Route>
                  <Route path='/register' exact>
                     <RegisterComponent/>
                  </Route> */}
                  <PrivateRoute AuthData={AuthData} path='/home' component={HomePage} /> 
                  <PrivateRoute AuthData={AuthData} path='/records/add' component={AddRecord} /> 
                  <PrivateRoute AuthData={AuthData} path='/records/:Rcid/edit' component={EditRecord} /> 
                  <PrivateRoute AuthData={AuthData} path='/records/:key' component={SelectedRecordComponent} /> 
                  
                  <PrivateRoute AuthData={AuthData} path='/records' component={ListofRecords} /> 
                  <PrivateRoute AuthData={AuthData} path='/users' component={Accounts} /> 
                  <Route path='/login'>
                     {isEmpty(AuthData) ? (<LoginComponent/>) : <Redirect to='/home'/>}
                  </Route>
                  <Route path='/register' exact>
                     {isEmpty(AuthData) ? (<RegisterComponent/>) : <Redirect to='/home'/>}
                  </Route>
                  <Route path='*' exact component={NotFound}/>
            </Switch>
         </Suspense>
      </Fragment>
   )
}
AppRoutes.propTypes = {
   AuthData:PropTypes.oneOfType('array','object')
};
export default AppRoutes;