import { Github, Instagram, Linkedin, Twitter } from "iconoir-react"
import { CircleIconButtons } from "./ui/Buttons"
import { motion } from 'framer-motion';

const Footer = () => {

  const content =['Getting Started', 'Api Documentation', 'Integration', 'examples', 'sdk']
  
  const ContentComponent =() =>(
    <ul className="flex flex-col gap-3">
            <motion.li className="text-title2 font-bold">Documentation</motion.li>
          {content.map((item, index) => (
            <motion.li key={index} whileHover={{scale:1.1}} className="text-title2 capitalize">{item}</motion.li>
          ))}
        </ul>
  )

  return (
    <footer className="gradient-border-top gradient py-16 md:px-32 px-8 gap-10 flex flex-col md:flex-row items-start justify-between mt-16">
      {/* developed */}
      <div className="flex flex-col gap-5">
        <p>Developed by Endevops</p>
        <div className="flex justify-between">
          <CircleIconButtons icon={<Github/>} to='https://github.com/obscuremd/'/>
          <CircleIconButtons icon={<Linkedin/>} to='https://github.com/obscuremd/'/>
          <CircleIconButtons icon={<Instagram/>} to='https://github.com/obscuremd/'/>
          <CircleIconButtons icon={<Twitter/>} to='https://github.com/obscuremd/'/>
        </div>
      </div>
      {/* content */}
      <ContentComponent/>
      <ContentComponent/>
      <ContentComponent/>
      <ContentComponent/>
    </footer>
  )
}

export default Footer