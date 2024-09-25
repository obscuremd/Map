import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Map from './Map'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import Chat from './Chat'

const Navigation = () => {
  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/map' element={<Map/>}/>
          <Route path='/chat' element={<Chat/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default Navigation