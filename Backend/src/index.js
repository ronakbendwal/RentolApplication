import express from 'express';
const app =express();
const port =3000;

app.get("/",(req,res )=>{
  res.send("helllo from backend")
})


app.listen(port,()=>{
  console.log("app start at port :",port)
})