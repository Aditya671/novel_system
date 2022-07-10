import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import gridStyles from '../../../assets/static/scss/grid.module.scss';
import spacingStyles from '../../../assets/static/scss/spacing.module.scss';
import { ModalContainer } from './../../modalContainer/index';

export class CardView extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         showModal:false,
         recordData:[]
      }
      
      this.handleScreenBasedView = this.handleScreenBasedView.bind(this);
      this.showModalFunction = this.showModalFunction.bind(this)
   }
   componentDidMount(){
      this.setState({recordData:[this.props.val]})
      if(this.props.RcKey === null){
         alert('Please Provide Key as it is needed')
         return false
      }
      else{
         
         this.setState({recordData:[this.props.val]})
      
      }
   }
   componentDidUpdate(){
      // console.log(this.state.recordData)
   }
   handleScreenBasedView(contentType){
      if(contentType === 'image'){
         if(window.screen.width <= 575){
            return `${gridStyles['col-12']}`
         }
         else if(window.screen.width > 576 && window.screen.width < 768){
            return `${gridStyles['col-sm-6']}`
         }
         else if(window.screen.width >= 768 && window.screen.width < 1024){
            return `${gridStyles['col-sm-4']}`
         }
         else if(window.screen.width >= 1024){
            return `${gridStyles['col-md-4']}`
         }
      }
      else if(contentType === 'text'){
         if(window.screen.width <= 575){
            return `${gridStyles['col-12']}`
         }
         else if(window.screen.width > 576 && window.screen.width < 768){
            return `${gridStyles['col-sm-6']}`
         }
         else if(window.screen.width >= 768 && window.screen.width < 1024){
            return `${gridStyles['col-sm-8']}`
         }
         else if(window.screen.width >= 1024){
            return `${gridStyles['col-md-8']}`
         }
      }

   }
   showModalFunction(){
      this.setState({showModal:!this.state.showModal})
   }
   render(){
      return(
         <div className={`${spacingStyles['mx-auto']} ${gridStyles['row']}`}>
            {this.props.imgSrc ? (
               <div style={{cursor:'pointer'}} className={this.handleScreenBasedView('image')}>
                  <div className={`${spacingStyles['py-4']} ${spacingStyles['px-3']}`}>
                     <img onClick={() => this.setState({showModal:!this.state.showModal})} src={this.props.imgSrc} alt='noIm' style={{width:'90%'}} />
                  </div>
               </div>
             ) : null}
            <div className={this.handleScreenBasedView('text')}>
               {this.state.recordData && Object.values(this.state.recordData).map(function(data){
                  return (
                  <Fragment key={data.key}>
                     <h3 className='h3'>{data.title}</h3>
                     <h3 className='h3'>{data.description}</h3>
                     <h3 className='h3'>{data.price}</h3>
                     <h3 className='h3'>{data.quantityCount}</h3>
                     <h3 className='h3'>{data.ratings}</h3>
                  </Fragment>)
               })}
            </div>
            {this.state.showModal === true ? (
               // <Fragment></Fragment>
               <ModalContainer title={this.props.title} 
                  showModalfunction={this.showModalFunction} >
                  <img src={this.props.imgSrc} alt={this.props.title} style={{maxWidth:'320px',margin:'0 auto'}}/>
               </ModalContainer> 
               ) : null
               }
         </div>
      )
   }
}
CardView.propTypes = {
   key:PropTypes.string,
   data:PropTypes.object
}