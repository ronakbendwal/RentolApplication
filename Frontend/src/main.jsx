import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import MainLayout from './Outlet/MainLayout.jsx';
import { LoginForm,SignupForm } from './Components/index.js';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/signup' element={<SignupForm/>}/>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>
)
