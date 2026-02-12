import React from 'react' 
import { useSelector } from 'react-redux';
import { ItemsPreviewSection,GuestItemPreview } from '../Components';
const Home=()=> {
  const {status}=useSelector((state)=>state.auth)
  if(status) return <ItemsPreviewSection/>
  else return <GuestItemPreview/>
}

export default Home