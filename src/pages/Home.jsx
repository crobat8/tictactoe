import React, { useContext, useState,useEffect,memo } from 'react';
import {signOut} from "firebase/auth"
import { UserContext } from '../context/UserContext';
import FullGame from '../componets/FullGame';

import { auth, db, storage } from "../firebase";

import { collection, doc, query, setDoc, where, getDocs, deleteDoc} from "firebase/firestore";
import { SearchingContext } from '../context/SearchingContext';
import { GameContext } from '../context/GameContext';

const Home = () =>{ 
  
  const{userInfo} =useContext(UserContext);
  const{SearchInfo} = useContext(SearchingContext)
  const{gameInfo} = useContext(GameContext);
  const[mode,setMode]=useState("Online")
  const[foundGame,setFoundGame] = useState(null)
  const handleGameMode = async (e,x) =>{

    setMode(x)
    if(x == 'Online'){
      console.log(SearchInfo.length)

      await setDoc(doc(db,"searching",userInfo[0].uid), {
        uid:userInfo[0].uid,
        mmr:userInfo[0].mmr
      }).then(() => {
        console.log("Successfully built search")}
      );

      // if(SearchInfo.length == 0){
      //   //no possible game
      //   console.log("null")
      //   console.log(SearchInfo)
      //   await setDoc(doc(db,"searching",userInfo[0].uid), {
      //     uid:userInfo[0].uid,
      //     mmr:userInfo[0].mmr
      //   }).then(() => {
      //     console.log("Successfully built search")}
      //   );
      // }
      // else if(SearchInfo.length == 1 && SearchInfo[0].uid == userInfo[0].uid){
      //   //im the only game found
      // }else{
      //   //found a game
      //   var x = 0;
      //   if(SearchInfo[x].uid == userInfo[0].uid){
      //     x++
      //   }
      //   var players = [SearchInfo[x].uid,userInfo[0].uid]
      //   var playersMMR = [SearchInfo[x].mmr,userInfo[0].mmr]
      //   var gameName;
      //   if(SearchInfo[x].uid<userInfo[0].uid){
      //     gameName = SearchInfo[x].uid+"_"+userInfo[0].uid;
      //   }else{
      //     gameName = userInfo[0].uid+"_"+SearchInfo[x].uid;
      //   }

      //   await deleteDoc(doc(db,"searching",SearchInfo[x].uid))
        

      //   await setDoc(doc(db,"games",gameName), {
      //     players,
      //     activePlayers:players,
      //     playersMMR,
      //     gameName,
      //   }).then(() => {
      //     console.log("Successful built game")}
      //   );
        
      // }
      
    }
    
  }

  function Icon()  {
    try {
      return(
        <div>
          <h2>
            you are {gameInfo[0].first == userInfo[0].uid?"X":"O"} this game
          </h2>
        </div>
      )
    } catch (error) {
      // console.log(error) 
    }
  }

  if(!userInfo){
    return(
      <h1>
        Loading user Info
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
            <Icon/>
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
          {/* {mode} */}
          <FullGame/>
          
        </div>
        <div className='placeHolder'></div>
      </main>
      <footer>
        
      </footer>
    </div>
  )
}

export default Home;