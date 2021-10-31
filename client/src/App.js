import React, {useReducer, createContext} from 'react'
import {Route, Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ErrorPage from "./components/Errorpage";
import Logout from "./components/Logout";
import Footer from "./components/Footer";
import Payment from "./components/Payment";
import { Modal } from './components/Modal';
import { Modall } from './components/Modall';
import  Loginn  from './components/Loginn';
import Mainpage from './components/Mainpage';
import Gateway from './components/Gateway';

import { initialState, reducer } from "./reducer/UseReducer";



// we create a contextAPI 
export const UserContext = createContext();

  

const Routing = () => {
  
  return (
    <>
       <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/payment">
        <Payment />
      </Route>

      <Route path="/loginn">
        <Loginn />
      </Route>

      <Route path="/gateway">
        <Gateway />
      </Route>

      <Route path="/mainpage">
        <Mainpage />
      </Route>
        
      <Route path="/contact">
        <Contact />
      </Route>

      <Route path="/modal">
        <Modal />
      </Route>

      <Route path="/modall">
        <Modall />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>
        
      <Route path="/logout">
        <Logout />
      </Route>
      
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
    </>
  )
}

const App = () => {

  //* we use useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
   
      <UserContext.Provider value={{state, dispatch}}>
        
        <Navbar/>

        <Routing />
        <Footer/>

      </UserContext.Provider>
  )
}

export default App

