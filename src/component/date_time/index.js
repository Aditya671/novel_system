import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const DTCSS = styled.div`
   padding:10px 16px;
   background:#aaa;
   box-shadow: 0 0 4px 2px rgba(0,0,0,0.3367);
   color:#000;
   font-size:14px;
   font-weight:bold;
   font-style:italic;
   position:absolute;
   bottom:0%;
   left:auto;
   right:10%;
   border-top-left-radius:14px;
   border-top-right-radius:14px;

   &:focus , &:hover{
      cursor:pointer;
   }
   
   @media (max-width:575px){
      right:0;
      border-top-right-radius:0;
      padding:5px 4px;
      font-size:12px;
   }
`;

const DateTimeComponent = () => {
   const [date,setDate] = useState(new Date())
   const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit"
   }
   useCallback(() => {
      // let timer = null
      // timer = setInterval(() => {
         setDate(() => new Date())
      // },1000)
      // return (() => {
      //    clearInterval(timer)
      // })
   },[])
   return (
      <DTCSS className=''>
         <span>&nbsp;{date.toLocaleDateString("en-US",options)}&nbsp;</span>
      </DTCSS>
   )
}
export default DateTimeComponent;