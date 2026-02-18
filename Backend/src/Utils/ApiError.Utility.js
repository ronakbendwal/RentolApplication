class ApiError extends Error{
constructor(
  statuscode,
  message
){
super(message);
this.statuscode=statuscode;
this.data=null;
this.success=false;
// this.message=message
// this.errors=errors,
}}

export default ApiError