const storeData=(key,data)=>{
  if(!key) return;
  try{
    console.log("local storage store the data")
    const datas=localStorage.setItem(key,JSON.stringify(data))
    console.log(datas);
    console.log("local storage complete")
  }catch(error){
    console.log("Local Storage :: storeData :: Error ::",error)
  }
}

const getData=(key)=>{
 if(!key) return null;

 try{
  console.log("in get store")
   const rawdata=localStorage.getItem(key)
   console.log(JSON.parse(rawdata))
   console.log("get store complete")
   return rawdata ? JSON.parse(rawdata) : null;
 }catch(error){
  console.log("Local Storage :: getData :: Error ::",error)
  return null;
 }
}

const removeFromStorage=(key)=>{
  if(!key) return null;
  try{
    localStorage.removeItem(key)
  }catch(error){
    console.log("Local Sotrage :: remove Data :: Error ::",error);
    return null;
  }
}

export {
  storeData,
  getData,
  removeFromStorage,
}