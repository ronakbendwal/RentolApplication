import {
  HeaderComponent,
  FooterComponent
} from '../Components/index.js';
import {Outlet} from 'react-router-dom'
const MainLayout=()=>{
return (
  <>
  <HeaderComponent/>
  <main>
    <Outlet/>
  </main>
  <FooterComponent/>
  </>
)
}


export default MainLayout;