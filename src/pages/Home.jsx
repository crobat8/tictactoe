import React, { useContext, useState,useEffect,memo } from 'react';
import {signOut} from "firebase/auth"
import { UserContext } from '../context/UserContext';
import FullGame from '../componets/FullGame';

import { auth, db, storage } from "../firebase";

import { collection, doc, query, setDoc, where, getDocs} from "firebase/firestore";
import { SearchingContext } from '../context/SearchingContext';

const Home = () =>{ 
  
  const{userInfo} =useContext(UserContext);
  const{SearchInfo} = useContext(SearchingContext)
  const[mode,setMode]=useState("Online")
  const[foundGame,setFoundGame] = useState(null)
  const handleGameMode = async (e,x) =>{

    setMode(x)
    if(x == 'Online'){
      console.log(SearchInfo.length)
      if(SearchInfo.length == 0){
        //no possible game
        console.log("null")
        console.log(SearchInfo)
        await setDoc(doc(db,"searching",userInfo[0].uid), {
          uid:userInfo[0].uid,
          mmr:userInfo[0].mmr
        }).then(() => {
          console.log("Successful")}
        );
      }else if(SearchInfo.length == 1 && SearchInfo[0].uid == userInfo[0].uid){
        //im the only game found
        console.log("just me")
      }else{
        //found a game
        console.log("found")
        console.log(SearchInfo)
        var x = 0;
        if(SearchInfo[x].uid == userInfo[0].uid){
          x++
        }
        var players = [SearchInfo[x].uid,userInfo[0].uid]
        var gameName;
        if(SearchInfo[x].uid<userInfo[0].uid){
          gameName = SearchInfo[x].uid+userInfo[0].uid;
        }else{
          gameName = userInfo[0].uid+SearchInfo[x].uid;
        }

        await setDoc(doc(db,"games",gameName), {
          players
        }).then(() => {
          console.log("Successful built game")}
        );
      }
      
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