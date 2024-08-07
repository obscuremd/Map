import React from 'react';
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';

interface Props{
  bg?: boolean;
  border?: boolean;
  text?:string;
  icon?:React.ReactNode
  func?:()=>void
  to?:string
  square?:boolean
}

export const Buttons:React.FC<Props> = ({bg, border, text, icon, func, to}) => {

  const hover ={
      scale:1.1,
      backgroundColor: bg ? '#ebf6f2' :'rgba(255, 252, 253, 0.05)'
    }

  const buttonContent = (
    <motion.button
        onClick={func}
        whileHover={hover}
        className={`text-nowrap flex items-center gap-[10px] text-title2 font-semibold py-[10px] ${icon ?'px-[20px]':'px-[30px]'} ${bg &&'bg-pink-Light text-black-Darker'} w-fit ${border && 'border-[1px] border-pink-Light'} rounded-full`}>
          {icon &&
            <div className={`p-[5px] ${bg ? 'bg-black-Darker text-pink-Light' :'bg-pink-Light text-black-Darker'} rounded-full text-caption`}>
              {icon}
            </div>}
        {text}
      </motion.button>
  )  

  return to ? (
    <Link to={to}>
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
}

export const CircleIconButtons:React.FC<Props> = ({func, icon, to, square, text}) => {

  const hover ={
      scale:1.2,
      backgroundColor: 'rgba(255, 252, 253, 0.05)'
    }

  return (
    <div className='flex flex-col items-center gap-2'>
      <motion.button
        onClick={func}
        whileHover={hover}
        className={`${square?'px-4 py-2 rounded-lg':'p-[5px] rounded-full'} border-[1px] border-pink-Light  text-pink-Light  text-caption flex items-center justify-center`}>
          <a href={to}>
              {icon}
          </a>
      </motion.button>
      {text && <p>{text}</p>}
    </div>

  )
}
