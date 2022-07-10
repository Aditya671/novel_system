import * as Yup from 'yup' 

export const AuthSchemas = {
   loginSchema: Yup.object().shape({
      email:Yup.string().email().required().label('Email'),
      password:Yup.string().min(6).max(20).required().label('Password')
         .matches(/(?=.*?[a-z])/,'Password must have at least one lower case letter')
         .matches(/(?=.*?[A-Z])/,'Password must have at least one upper case letter')
         .matches(/(?=.*?[0-9])/,'Password must have at least one number')
         .matches(/(?=.*?\W).*/,'Password must have at least one special character')
   }),
   registrationSchema : Yup.object().shape({
      username:Yup.string().required().label('UserName'),
      phone:Yup.string().required().min(10).label('Mobile No')
         .matches(/([0-9 -/(/)])/,'Mobile No does not cannot contain special Charactes'),
      email: Yup.string().email().required().label('Email'),
      password:Yup.string().min(6).max(16).required().label("Password")
         .matches(/(?=.*?[a-z])/,'Password must have at least one lower case letter')
         .matches(/(?=.*?[A-Z])/,'Password must have at least one upper case letter')
         .matches(/(?=.*?[0-9])/,'Password must have at least one number')
         .matches(/(?=.*?\W).*/,'Password must have at least one special character'),
      confirmPassword:Yup.string()
         .oneOf([Yup.ref('password'),null],'Confirm Password must be equal to Password').required().label("Password")
   }),
   searchSchema: Yup.object().shape({
      keywords:Yup.string().required().label('Keyword'),
   }),
   recordScheme:Yup.object().shape({
      title:Yup.string().required().label('Title'),
      author:Yup.string().required().label('Author'),
      price:Yup.string().required().label('Price'),
      description:Yup.string().min(100).required().label('Description')
   })
}