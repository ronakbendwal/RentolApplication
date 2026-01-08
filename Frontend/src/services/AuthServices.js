import axios from 'axios'

const API=axios.create({
  baseURL:"/api/user"
})

export const loginUser=(data)=>{
return API.post('/login',data)
}

export const signupUser=(data)=>{
  return API.post('/signup',data)
}

export const logoutUser=()=>{
 return  API.post('/logout-user')
}

export const getCurrentUser=()=>{
  return API.get('current-user')
}