import React, { useRef, useEffect, useCallback,useState,useContext} from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useHistory,NavLink} from 'react-router-dom';
import {UserContext} from "../App";
const smsClient = require("./Loginn"); //Modify the path based on your app

const Background = styled.div`
opacity: 1.2;
filter: alpha(opacity = 80);
  width: 300%;
  height: 800px;
  color: #000000;
  background-color: #ffffff;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-top: -400px;
  margin-left: -1000px;
`;

const ModalWrapper = styled.div`
  
  width: 500px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  color: #000000;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  top: -150px;
  left: 800px;
  margin-top: -100px;
  margin-left: -150px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 2.9;
  color: #141414;
  margin-top: 50px;
  margin-left: -50px;

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
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modall = ({ showModal, setShowModal }) => {
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
  const [counter, setCounter] = React.useState(59);
  React.useEffect(() => {
      const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
  }, [counter]);

  const { state, dispatch } = useContext(UserContext);
    
  const history = useHistory();
  
  const [verifyCode, setPassword] = useState('');
  
    const loginUser = async (e) => {
      e.preventDefault();
     const res = await fetch("/sendVerificationMessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          verifyCode
        })
    });

    const data = await res.json();
     // I need to change the data to res 
        if (data.status === 422 || !data) {
            window.alert("INvalid OTP");
            console.log("INvalid OTP");
        } else {
             window.alert(" OTP Successfull");
            console.log("Successfull OTP");

            history.push("/login");
        }
    }

  
  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
             
              <ModalContent>
                <h1>Verify OTP</h1>
                <p>
                  </p>
              
              <input type="number" value="" className="lb"    placeholder=" Enter OTP Sent to your mobile number"/>
                <p></p>
                <button type="submit" value={verifyCode} onChange={(e) => setPassword(e.target.value)}  onClick={loginUser}>Proceed</button>
                 Resend OTP in <span style={{color:"green",fontWeight:"bold"}}> 00:{counter}</span> 
                 <NavLink to="/send">
                     <span style={{marginLeft:"5px"}}> Resend OTP </span>
                    </NavLink>
              </ModalContent>
             
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

