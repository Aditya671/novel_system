import React, { useState} from 'react';


// The below Component was started with an aim to make a component look like 
// a real dom element and is used to return the dimensions of the component 
// on the Window of the Browser

const withDimensions = (WrappedComponent) => {
   const WithDimensions = (props) => {
      const [setDimensions,setNewDimesions] = useState(null)
      window.addEventListener('resize',function(){
         let dimension = document.querySelector('.getDimensions').getBoundingClientRect()
         setNewDimesions(dimension)
      })  
      window.onload = function () { 
         let dimension = document.querySelector('.getDimensions').getBoundingClientRect()
         setNewDimesions(dimension)
      } 
      return (<WrappedComponent dimensions={setDimensions} {...props}/>)
   }
   return WithDimensions;
}
export default withDimensions;