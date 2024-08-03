import logo from '../assets/Logo.svg';
import { Buttons} from '../Components/ui/Buttons';
import { isMobile } from '../Exports/Export';
import Loader from '../Screens/Loader'
import {  useSignUp } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface Props{
    setActives: (value:number)=>void
}

const RegisterVerification:React.FC<Props> = ({setActives}) => {

    const {isLoaded, signUp, setActive} =useSignUp()


    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);



    const verify =async()=>{
    
        setLoading(true)
        
        if(!isLoaded){return}
        
        try {
          
          const completeSignUp = await signUp.attemptEmailAddressVerification({code})
          
          if (completeSignUp.status === 'complete') {
            await setActive({session: completeSignUp.createdSessionId}), console.log(completeSignUp.createdSessionId);
            setTimeout(()=>{
              setLoading(false)
              toast.success('logged in successfully')
              window.location.reload()
            },2000)
          }
          else{
            setLoading(false)
            console.log(completeSignUp)
          }
          
          
        } catch (err: unknown) {
          const error = err as { errors?: { code: string }[] };
        
          if (error.errors && error.errors[0]?.code === 'form_code_incorrect') {
            setTimeout(() => {
              setLoading(false);
              toast.error('Wrong code');
            }, 2000);
          } else if (error.errors && error.errors[0]?.code === 'verification_failed') {
            setTimeout(() => {
              setLoading(false);
              toast.error('Too many failed attempts, please go back');
            }, 2000);
          } else {
            console.log(JSON.stringify(error));
            console.log(error);
            setTimeout(() => {
              setLoading(false);
              toast.error(error.errors?.[0]?.code ?? 'Unknown error occurred');
            }, 2000);
          }
        }
      }

 


  if (loading) {
    return <Loader />;
  }

    return (
        <div className='container min-h-[100vh] flex flex-col justify-center items-center'>
          <div className='md:w-[40%] w-[90%] flex flex-col gap-7'>
            <div className='p-2 border-2 border-green-Dark_hover w-fit rounded-lg'>
              <img src={logo} alt="Logo" className='w-8' />
            </div>
            <div className='flex flex-col gap-2'>
              <h5 className='font-bold'>{isMobile ? 'Pinoy' : 'Pinoy: Location simplified.'}</h5>
              <p className='text-title2'>Verify The 6 digits OTP sent to your Email</p>
            </div>
            <input
                type='number'
                placeholder='Code'
                className='w-full'
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <div className='flex w-full items-center gap-3'>
              <p className='text-title2 text-nowrap flex gap-2'>Didn't recieve the OTP?
              <button className='text-green-Normal' onClick={()=>setActives(0)}>Go Back</button></p>
              <hr className='w-full text-pink-Light' />
            </div>
            <Buttons bg text='Verify' func={verify} />
            
          </div>
        </div>
      );
}

export default RegisterVerification