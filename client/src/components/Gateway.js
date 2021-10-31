import React from 'react';
import {auth} from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import  Loginn  from './Loginn';
import Mainpage from './Mainpage';
  
const Gateway = () => {
  const [user] = useAuthState(auth);
  return (
    user ? <Mainpage/> : <Loginn/>
  );
}
  
export default Gateway;