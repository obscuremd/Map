import { useState } from "react";
import Authenticate from "../Auth/Authenticate";
import RegisterVerification from "../Auth/RegisterVerification";
import LoginVerification from "../Auth/LoginVerification";


const Auth = () => {
  const [active, setActive] = useState(0)

  return(
    <>
      {active === 0 && <Authenticate setActives={setActive}/>}
      {active === 1 && <RegisterVerification setActives={setActive}/>}
      {active === 2 && <LoginVerification setActives={setActive}/>}
    </>
  )
  
};

export default Auth;
