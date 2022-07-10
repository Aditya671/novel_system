// This is a Select Option like Dropdown
import { useState } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';


const Dropdown = () => {
   const [open,setOpen] = useState(false)
   const {selectionLabel,options,selected,onSelectedChange} = props;
   const availableOptions = options.map((option) => {
      if(option.value === selected.value){
         return null;
      }
      return (
         <option key={option.value} onClick={() => onSelectedChange(option)}>{option.label}</option>   
      )
   })
   useEffect(() => {
      document.body.addEventListener('click', (event) => {
         setOpen(!open);
         event.stopPropagation()
      }) 
   },[])
   return (
      <div className='dropdown' onClick={(e) => {e.preventDefault();e.stopPropagation()} }>
         <label htmlFor='selectionBox'>{selectionLabel}</label>
         <select onClick={() => setOpen(!open)} className='selectionBox' id={`select-${Math.floor(Math.random() * 10)}`}>
            <option className=''>{selected.label}</option>
            <Fragment>{availableOptions}</Fragment>
         </select>
      </div>
   )

}