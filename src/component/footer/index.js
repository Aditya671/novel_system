import React, { useLayoutEffect } from 'react';
import gridStyles from '../../assets/static/scss/grid.module.scss'
import spacingStyles from '../../assets/static/scss/spacing.module.scss'
import textStyles from '../../assets/static/scss/text.module.scss';
import useComponentDimensions from '../../helpers/customHooks/useComponentDimensions';


const Footer = (props) => {
   const {eleHeight} = useComponentDimensions('footer')
   const {Footerdimensions} = props;
   useLayoutEffect(() => {
      Footerdimensions(eleHeight)
   },[eleHeight,Footerdimensions])
   return (
      <footer className={`${spacingStyles['mx-auto']} ${gridStyles.row} bg-dark `}>
         <div className={gridStyles['col-12']}>
            <div className={`${spacingStyles['my-3']} ${spacingStyles['px-2']}`}>
               <h3 className={`${textStyles['text-center']}`}>
                  &copy; {new Date().getFullYear()} - {new Date().getFullYear() + 1} 
                  <br/>Web Application By Aditya 
               </h3>
            </div>
            </div>
      </footer>
   )
}
export default Footer;