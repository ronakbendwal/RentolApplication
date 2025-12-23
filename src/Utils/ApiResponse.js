class ApiResponse{
constructor(
  message="success", data,statuscode
){
  //set property in the response class
  this.message=message,
  this.data=data,
  this.statuscode=statuscode,
  this.success=statuscode<400
}
}

export default ApiResponse