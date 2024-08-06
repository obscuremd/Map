import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Map from './Map'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

const Navigation = () => {
  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/map' element={<Map/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default Navigation