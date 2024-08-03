import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

const Navigation = () => {
  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default Navigation