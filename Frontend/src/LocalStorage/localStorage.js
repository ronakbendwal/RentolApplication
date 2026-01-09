const storeData=(key,data)=>{
  if(!key) return;
  try{
    localStorage.setItem(key,JSON.stringify(data))
  }catch(error){
    console.log("Local Storage :: storeData :: Error ::",error)
  }
}

const getData=(key)=>{
 if(!key) return null;

 try{
   const rawdata=localStorage.getItem(key)
   return rawdata ? JSON.parse(rawdata) : null;
 }catch(error){
  console.log("Local Storage :: getData :: Error ::",error)
  return null;
 }
}

export {
  storeData,
  getData
}