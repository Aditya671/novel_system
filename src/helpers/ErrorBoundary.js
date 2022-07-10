import React from 'react';
import {Strings}  from '../assets/strings';
import error from '../assets/static/images/error.png';
import resetStyles from '../assets/static/scss/reset.module.scss';
import textStyles from '../assets/static/scss/text.module.scss';
import gridStyles from '../assets/static/scss/grid.module.scss';

class Boundary extends React.Component {
   state = { hasError: false }
   static getDerivedStateFromError(error) {
      return { hasError: true };
   }
   componentDidCatch(error, errorInfo){
      console.log(error, errorInfo);
   }
   render() {
      if (this.state.hasError) {
         return (
            <section className={`${gridStyles['container']}`}>
            <div className={`${resetStyles['position-relative']}`} style={{minHeight:'100vh'}}>
               <div className={`${resetStyles['alignExactCenter']} ${resetStyles['position-absolute']}`}>
                  <div className={`${textStyles['text-center']}`}>
                     <h1>{Strings.app_level_issue.changes}</h1>
                     <img src={error} alt={Strings.app_level_issue.message}/>
                     <h3>{Strings.app_level_issue.situation}</h3>
                  </div>            
               </div>
            </div>
            </section>
         );
      }
      return this.props.children;
   }
}
export default Boundary;