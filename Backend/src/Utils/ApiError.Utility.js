class ApiError extends Error{
constructor({
  message="Something Went Wrong",
  statuscode,
  errors=[]
}){
super(message)

this.statuscode=statuscode,
this.errors=errors,
this.data=null,
this.sucess=false,
this.message=message

}
}

export default ApiError