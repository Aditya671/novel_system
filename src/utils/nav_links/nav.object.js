import {FiLogIn} from 'react-icons/fi';
import {FaUserPlus,FaLayerGroup} from 'react-icons/fa';
import {AiTwotoneHome,AiFillFileAdd} from 'react-icons/ai';
import {BsFillCollectionFill} from 'react-icons/bs';
import {RiAccountBoxFill} from 'react-icons/ri';

export const StoreUrls = [
   {
      isLoggedIn:false,
      Allurls:[
         {
            title:'Login',
            icon:<FiLogIn/>,
            path:'/login'
         },
         {
            title:'Register',
            icon:<FaUserPlus/>,
            path:'/register'
         },
      ]
   },
   {
      isLoggedIn:true,
      Allurls:[
         {
            title:'HomePage',
            icon:<AiTwotoneHome/>,
            path:'/home'
         },
         {
            title:'Records',
            icon:<BsFillCollectionFill/>,
            path:'/records'
         },
         {
            title:'AddRecords',
            icon:<AiFillFileAdd/>,
            path:'/records/add'
         },
         {
            title:'Communities',
            icon:<FaLayerGroup/>,
            path:''
         },
         {
            title:'My Accounts',
            icon:<RiAccountBoxFill/>,
            path:`/users`
         }
      ]
   }
]