import { useState } from 'react'
import { HeaderComponent,FooterComponent ,Header4} from './Components'
import SignupForm from './Components/MainComponent/SignupForm'
import LoginForm from './Components/MainComponent/LoginForm'
function App() {
  return (
    
    <>
    <Header4/>
    <LoginForm/>
    <FooterComponent/>
    </>
  )
}

export default App
