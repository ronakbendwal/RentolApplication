const AsyncHandle=(ControllerFunction)=>{
   return (req,res,next)=>{
    Promise.resolve(
    ControllerFunction(
      req,res,next
    ).catch(
      (error)=>next(error)
    ))
  }
}

export default AsyncHandle;