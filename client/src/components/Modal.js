import React, { useRef, useEffect, useCallback,useState,useContext} from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useHistory} from 'react-router-dom';
import {UserContext} from "../App";
import OtpInput from 'react-otp-input';
import {Modall} from "./Modall";
//const smsClient = require("./smsClient"); //Modify the path based on your app
const axios = require("axios");
//const user = {name: "shital", phone: "9503589429"};



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
width: 30%; 

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
  top: 10px;
  left:62%;
  color:black;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
 
`;
export const Modal = ({ showModal, setShowModal}) => {
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
              <input type="number" value="" placeholder="Mobile number" name="phone" id="id"/>
              <p></p>
            Please enter OTP
              <OtpInput value="" placeholder="One time password" name="otp_value" autoComplete="false" numInputs={4} separator={<span>-</span>} />
                
                <p></p>
                <button type="submit" value="BUY"  onClick="" >Proceed</button>
                 
              </ModalContent>
             
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
            </>
          </animated.div>
        </Background>
      ) : null}
      
    </>
  );
};

