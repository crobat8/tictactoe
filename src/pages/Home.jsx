import React, { useContext, useState,useEffect,memo } from 'react';
import {signOut} from "firebase/auth"
import { UserContext } from '../context/UserContext';
import FullGame from '../componets/FullGame';

import { auth, db, storage } from "../firebase";

import { doc, setDoc } from "firebase/firestore";

const Home = () =>{ 
  
  const{userInfo} =useContext(UserContext);
  const[mode,setMode]=useState("Online")
  const[game,setGame]=useState(<FullGame/>)
  const handleGameMode = async (e,x) =>{

    setMode(x)
    if(x == 'Online'){
      await setDoc(doc(db,"messages","this_test"), {
        original:"test"
      }).then(() => {
        console.log("Successful")}
      );
    }
    
  }

  if(!userInfo){
    return(
      <h1>
        Loading userInfo
      </h1>
    )
  }
  return (
    <div className="home" >
      <header className='topBar'>
        <div>
          <p>
            name: {userInfo[0].displayName}
          </p>
          <p>
            mmr: {userInfo[0].mmr}
          </p>
          <button onClick={()=>signOut(auth)}> 
            logout
          </button>
        </div>
        <div>
          <h1>
            Super TicTacToe
          </h1>
        </div>
        <div>

        </div>
      </header>
      <main>
        <div className='placeHolder'></div>
        <div className='gameHolder'>
          <div className='resetHolder'>
            {/* <button onClick={(e)=>handleGameMode(e,"One")}>
              new one player game
            </button> */}
            {/* <button onClick={(e)=>handleGameMode(e,"two")}> 
              new two player game
            </button> */}
            <div>

            </div>
            <button onClick={(e)=>handleGameMode(e,"Online")}>
              new online game
            </button>
            <div>

            </div>
          </div>
          {mode}
          {game}
          
        </div>
        <div className='placeHolder'></div>
      </main>
      <footer>
        
      </footer>
    </div>
  )
}

export default Home;