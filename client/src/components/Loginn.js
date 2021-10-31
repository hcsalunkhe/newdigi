import React, { useRef, useEffect, useCallback,useState,useContext} from 'react';
import { firebase, auth } from './firebase';
import { useSpring, animated } from 'react-spring';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import OtpInput from 'react-otp-input';
import { MdClose } from 'react-icons/md';

const Background = styled.div`
  position: fixed; 
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
border-radius: 10px;
display:grid;
background-color: #fefefe;
margin: 15% auto; 
padding: 20px;
border: 1px solid #888;
width: 50%;
height:50%; 

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #FFD700;
    border-radius: 10px;
    font-size: 16px;
  font-weight: 400;
  }
`;

const CloseModalButton = styled(MdClose)`
 
  cursor: pointer;
  position: absolute;
  top: 0px;
  left:2%;
  color:black;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
 
`;

const Loginn = () => {
   
    const history = useHistory();
    const [showModal,setShowModal]=useState(true); 
  const modalRef = useRef();
   
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
        history.push("/login");
      setShowModal(false);
    
    }
  };
  
  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );
 

    // Inputs
    const [mynumber, setnumber] = useState("+91");
    const [otp, setotp] = useState('');
    const [show, setshow] = useState(false);
    const [final, setfinal] = useState('');
  
    // Sent OTP
    const signin = () => {
           
        if (mynumber === "" || mynumber.length < 10) return;
  
        let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        auth.signInWithPhoneNumber(mynumber, verify).then((result) => {
            setfinal(result);
            alert("OTP successfully send to your Mobile")
            setshow(true);
        })
            .catch((err) => {
                alert(err);
                window.location.reload()
            });
    }
  
    // Validate OTP
    const ValidateOtp = () => {
        if (otp === null || final === null)
            return;
        final.confirm(otp).then((result) => {
            // success
        }).catch((err) => {
            alert("Invalid OTP");
        })
    }
  
    return (
        <>
        {showModal ? (
            <Background onClick={closeModal} ref={modalRef}>
              <animated.div style={animation}>
                < >
                 
                  <ModalContent showModal={showModal}>
                    <h1>Login/SignUp</h1>
                    <p>
                      </p>
                      <input  value={mynumber} onChange={(e) => { 
                        setnumber(e.target.value) }}
                         placeholder="phone number" />
                  <p></p>
                  <br /><br />
                  <div id="recaptcha-container"></div>
                  <input type="submit" placeholder="Send OTP" onClick={signin}/>
                Please enter OTP
                  <input type="number" value={otp} numInputs={6} separator={<span>-</span>} onChange={(e) => { setotp(e.target.value) }} />
                  <br /><br />
                    <p></p>
                    <input type="submit" value="BUY" onClick={ValidateOtp} placeholder="Proceed" />
                     
                  </ModalContent>
                 
                  <CloseModalButton aria-label='Close modal' onClick={() => setShowModal(prev => !prev)} />
             
               
                
                </>
              </animated.div>
            </Background>
          ) : null}
          
        </>
        /*<div style={{ "marginTop": "200px" }}>
            <center>
                <div style={{ display: !show ? "block" : "none" }}>
                    <input  value={mynumber} onChange={(e) => { 
                       setnumber(e.target.value) }}
                        placeholder="phone number" />
                    <br /><br />
                    <div id="recaptcha-container"></div>
                    <button onClick={signin}>Send OTP</button>
                </div>
                <div style={{ display: show ? "block" : "none" }}>
                    <input type="text" placeholder={"Enter your OTP"}
                        onChange={(e) => { setotp(e.target.value) }}></input>
                    <br /><br />
                    <button onClick={ValidateOtp}>Verify</button>
                </div>
            </center>
        </div>*/
    );
};
export default Loginn;
  
//export default Loginn;
  

