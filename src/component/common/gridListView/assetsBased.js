import { isEmpty } from 'lodash';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import gridStyles from '../../../assets/static/scss/grid.module.scss';
import { useRouteMatch  } from 'react-router-dom';
import textStyle from '../../../assets/static/scss/text.module.scss';
import spacingStyles from '../../../assets/static/scss/spacing.module.scss';

const AssetData = (props) => {
   // eslint-disable-next-line
   const {imageUrl,imgWidth,linkTo,recentKey,title,onSelectedClick} = props;
   const handleClick = (linkTo) =>{
      onSelectedClick(linkTo,recentKey)
   }
   const match = useRouteMatch()
   let noImage = `https://via.placeholder.com/225x335.jpg/aaaaaa/000000?text=No+image+available`;
   if(typeof imageUrl === 'string'){
      return (
         <div className={`${textStyle['text-center']} ${spacingStyles['padding-30']} `}>
            <img src={imageUrl ? imageUrl : noImage} alt={title} style={{maxWidth:`${imgWidth}px`}} />
            {console.log(imgWidth)}
            <Link style={{textDecoration:'none'}} to={`${match.url}/${recentKey}`} onClick={() => handleClick(linkTo)}>
               <h3 className='text-theme h3' style={{cursor:'pointer',margin:'0'}}>{title}</h3>
            </Link>
         </div>
      )
   }
   else if(imageUrl === null || imageUrl === undefined){
      return (
         <Fragment>
         <Link to={`${match.url}/${recentKey}`}>
            <p className='text-theme h4' style={{cursor:'pointer'}}>{title}</p>
         </Link>
         </Fragment>
      )
   }
}
const ListView = (listD) => {
   const {list,onSelectedClick} = listD;
   const returnClass = () => {
      if(window.screen.width <= 575){
         return `${gridStyles['col-10']}`
      }
      else if(window.screen.width > 576 && window.screen.width < 768){
         return `${gridStyles['col-sm-6']}`
      }
      else if(window.screen.width >= 768 && window.screen.width < 1024){
         return `${gridStyles['col-sm-4']}`
      }
      else if(window.screen.width >= 1024){
         return `${gridStyles['col-md-3']}`
      }
   }
   return (
      <div className={`${gridStyles['row']} ${gridStyles['col-12']} ${spacingStyles['mx-auto']}  ${gridStyles['justify-content-center']} ${gridStyles['align-items-center']}`}>
      {Object.values(list).map(function(value){
         return (
            <div key={value.key} className={returnClass()}>
               <AssetData imageUrl={value.imageUrl} onSelectedClick={onSelectedClick}
                  title={value.title} imgWidth='260' linkTo={value.key} recentKey={value.id} />
            </div>
         )
      })}
      </div>
   )
}
function ListData(props){
   const {list,onSelectedClick} = props;
   if(list instanceof Object){
      if(!isEmpty(list)){
         return <ListView list={list} onSelectedClick={onSelectedClick}/>
      }
      else {
         return <div>Its an Empty List!! <br/> Please assign data to show somenting</div>
      }
   }
}
export default ListData;