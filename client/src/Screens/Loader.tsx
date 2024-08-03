import logo from '../assets/Logo.svg'
import { zoomies } from 'ldrs'

zoomies.register()

// Default values shown


const loader = () => {
  return (
    <div className='w-full h-screen flex flex-col gap-10 items-center justify-center'>
      {/* logo */}
      <div className='p-4 border-4 border-green-Dark_hover w-fit rounded-lg'> <img src={logo} alt="" className='w-40' /> </div>
      <l-zoomies size="400" stroke="5" bg-opacity="0.1" speed="1.4" color="#277961" ></l-zoomies>
    </div>
  )
}

export default loader