import { MotionConfig } from 'framer-motion';
import './App.css';
import Gradient from './Components/ui/Gradient';
import Navigation from './Screens/Navigation';
import Auth from './Screens/Auth';
import { Toaster } from 'react-hot-toast';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

function App() {

 



  return (
    <MotionConfig transition={{ ease: 'easeInOut' }}>
      <Toaster/>
      <Gradient />
      <SignedIn>
            <Navigation /> 
          </SignedIn>
          <SignedOut>
            <Auth />
          </SignedOut>
    </MotionConfig>
  );
}

export default App;
