import MainLayout from './Outlet/MainLayout.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import { login } from './redux/Feature/Auth.js';
import { useDispatch } from 'react-redux';
function App() {
  const dispatch=useDispatch()
  
  useEffect(()=>{
    const getCurrentUser=async ()=>{
    const rawCurrentUserData=await axios.get('/api/user/current-user')
    const currentUserData=rawCurrentUserData.data
    console.log("data mil gaya he current user ka")
    dispatch(login(currentUserData))
    console.log("current user data set and login the user")
    }
    getCurrentUser(); 
  },[])
  return(
    <MainLayout/>
  )
}

export default App

