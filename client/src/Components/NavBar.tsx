import { useState } from 'react'
import {Buttons} from './ui/Buttons'
import { Menu, User, Xmark } from 'iconoir-react'
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { isMobile } from '../Exports/Export';
import { useClerk } from '@clerk/clerk-react';

const NavBar = () => {

  const {signOut} = useClerk()

  const logout =async()=>{
    await signOut()
  }

  const [navBar, setNavBar] = useState(false)

  return (
    <nav className='relative w-full md:px-[64px] px-[32px] flex items-center justify-between pt-5 pb-16'>
      <h5 className='font-bold text-green-Light_active'>Pinoy</h5>
      {isMobile 
        ? <>
              {/* MOBILE NAVBAR */}
              <motion.button  onClick={()=>setNavBar(!navBar)}>
                {navBar
                  ?<Xmark/>
                  :<Menu/>}
              </motion.button>
              <AnimatePresence>
              {navBar &&
                  <motion.nav 
                    initial={{y:'-20%', opacity:0}}
                    animate={{y:0, opacity:1}}
                    exit={{y:'-20%', opacity:0}}
                    className='absolute w-full z-50 right-0 top-12 bg-black-Darker bg-opacity-50 backdrop-blur-lg flex flex-col items-center py-5 gap-[20px]'>
                    <ol className='w-full flex flex-col text-title2 font-semibold'>
                      <Link to={'/'} className='w-full p-5 gradient-border-bottom'>Home</Link>
                      <Link to={'/map'} className='w-full p-5 gradient-border-bottom'>Map</Link>
                      <li className='w-full p-5 gradient-border-bottom'>Customers</li>
                      <li className='w-full p-5 gradient-border-bottom'>Resources</li>
                    </ol>
                    <div className='flex gap-[10px]'>
                      <Buttons text='Welcome' icon={<User/>} func={logout}/>
                      <Buttons text='Get Started' bg/>
                    </div>
                  </motion.nav>
                }
              </AnimatePresence>
            </>
        : <>
            {/* PC NAVBAR */}
            <ol className='flex items-center gap-[50px] text-title2 font-semibold'>
              <motion.li whileHover={{scale:1.1}}><Link to={'/'}>Home</Link> </motion.li>
              <motion.li whileHover={{scale:1.1}}><Link to={'/map'}>Map</Link></motion.li>
              <motion.li whileHover={{scale:1.1}}>Customers</motion.li>
              <motion.li whileHover={{scale:1.1}}>Resources</motion.li>
            </ol>
            <div className='flex gap-[30px]'>
              <Buttons text='Welcome' icon={<User/>} func={logout}/>
              <Buttons text='Get Started' bg to='/inbox'/>
            </div>
          </>
      }
    </nav>
  )
}

export default NavBar