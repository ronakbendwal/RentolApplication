class ApiError extends Error{
  constructor(
    message="SomeThing Went Wrong",
    statuscode,
    errors=[]
  ){
    super(message)//calling parent class constructor with message kyuki parent class ka constructor sirf message hi accecpt karta he,
    
    //set other property
    this.message=message,
    this.statuscode=statuscode,
    this.sucess=false,
    this.data=null,
    this.errors=errors
  }
}
