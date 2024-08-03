import React, { useState } from 'react';
import logo from '../assets/Logo.svg';
import { AppleMac, Eye, EyeClosed, Facebook, Google } from 'iconoir-react';
import { Buttons, CircleIconButtons } from '../Components/ui/Buttons';
import { isMobile } from '../Exports/Export';
import Loader from '../Screens/Loader'
import { useSignIn, useSignUp } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

interface Props{
    setActives: (value:number)=>void
}

const Authenticate:React.FC<Props>  = ({setActives}) => {
    
    const {isLoaded:SignInLoaded, signIn} =useSignIn()
    const {isLoaded:SignUpLoaded, signUp} =useSignUp()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);



  const handleLogin = async () => {
    if(!SignInLoaded){return}
    
    if(email =='' || password === ''){
      setLoading(true)
      setTimeout(()=>{
        toast.error('Please enter your email/ password')
        setLoading(false)  
      },1000)
    }
    else{
      
      setLoading(true)

      try {
        await signIn.create({
          strategy:'email_code',

          identifier: email,
          // password: password
        })


      
      setTimeout(()=>{
        toast.success('code sent')
        setActives(2)
        setLoading(false)
          // window.location.reload()
        },2000)
        
        
      } catch (err:unknown) {
        
        const error = err as { errors?: { code: string }[] };
        
        setLoading(false)
        if(error.errors && error.errors[0]?.code === 'form_param_format_invalid'){
          toast.error('Email/Password is invalid')
        }else{
          toast.error(JSON.stringify(error.errors && error.errors[0]?.code))
          console.log(JSON.stringify(error));
          console.log(error)
        }
      }
    }
  };

  const handleSignUp = async () => {
    
    setLoading(true)

    if(!SignUpLoaded){
      return
    }

    if( email === '' && password === '' ){
      setTimeout(()=>{
        toast.error('fields must not be empty')
        setLoading(false)
      },2000)
    }

    else if(password.length < 8){
      setTimeout(()=>{
        toast.error('password must be at least 8 characters long')
        setLoading(false)
      },2000)
    }

    else {
      try {
        await signUp.create({
          emailAddress: email,
          password:password
        })

        await signUp.prepareEmailAddressVerification({ strategy:'email_code'})
        toast.success('user created successfully');
        setTimeout(()=>{setActives(1)},2000)
        
      } catch (err:unknown) {

        const error = err as { errors?: { code: string }[] };

        if( error?.errors && error?.errors[0]?.code === 'form_identifier_exists'){
          setTimeout(()=>{
            toast.error('That email address is taken. Please try another.')
            setLoading(false)
          },2000)
        }
        else if(error?.errors && error?.errors[0]?.code === 'form_param_format_invalid'){
          setTimeout(()=>{
            toast.error('invalid email format')
            setLoading(false)
          },2000)
        }
        else{
          toast.error(JSON.stringify(error?.errors && error?.errors[0]?.code))
          setLoading(false)
          console.log(JSON.stringify(error))
          console.log(error);
        }
      }
    }
  };


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
          <p className='text-title2'>Choose one of the options to get started</p>
        </div>
        <input
          placeholder='Email'
          className='w-full'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className='flex gap-4'>
          <input
            placeholder='Password'
            className='w-full'
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => setPasswordVisible(!passwordVisible)}
            className='p-2 border-[1px] border-pink-Light w-fit rounded-lg'
          >
            {passwordVisible ? <Eye /> : <EyeClosed />}
          </button>
        </div>
        <div className='flex w-full items-center gap-3'>
          <p className='text-title2 text-nowrap'>or continue with</p>
          <hr className='w-full text-pink-Light' />
        </div>
        <div className='flex gap-5'>
          <CircleIconButtons square icon={<Google />} />
          <CircleIconButtons square icon={<Facebook />} />
          <CircleIconButtons square icon={<AppleMac />} />
        </div>
        <div className='flex gap-5'>
          <Buttons bg text='Login' func={handleLogin} />
          <Buttons border text='Sign Up' func={handleSignUp} />
        </div>
      </div>
    </div>
  );
}

export default Authenticate