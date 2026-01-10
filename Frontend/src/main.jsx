import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import MainLayout from './Outlet/MainLayout.jsx';
import { LoginForm,SignupForm2,ItemsPreviewSection} from './Components/index.js';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/Store/FeatureStore.js';
import App from './App.jsx';
import {ItemCategoryPage3} from './Page/index.js'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route path='/' element={<ItemsPreviewSection/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/signup' element={<SignupForm2/>}/>
      <Route path='/categorypage' element={<ItemCategoryPage3/>}/>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
      {/* <BrowserRouter>
      <App/>
      </BrowserRouter> */}
  </StrictMode>
)