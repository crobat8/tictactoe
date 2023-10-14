import React, { useContext, useState,memo } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { GameContext } from '../context/GameContext';

const MiniGame = (props)=>{
  const [gameState,setGameState]=useState(["","","",
                                           "","","",
                                           "","",""])
  const {gameInfo} = useContext(GameContext);

  const handlePlay = async(small)=>{
    console.log(gameInfo)
    const gameRef = doc(db,"games",gameInfo[0].gameName)
    let gameNum = "g" + props.big
    console.log(gameNum)
    let miniGameInfo = gameInfo[0][gameNum]
    miniGameInfo[small] = gameInfo[0].turn
    console.log(miniGameInfo)
    await updateDoc(gameRef, {
      recentM: props.big,
      recentS: small,
      [gameNum]: miniGameInfo,
      function: "ready"
    });


    console.log("small",small)
    console.log("big",props.big)
  }

  return(
    <div className='miniGame'>
      {gameState.map((e,i)=>{

        //console.log(props.val,props.playable)
        return(
          <div className={props.playable&&gameState[i]==""?"cellP":"cellD"} onClick={()=>handlePlay(i)} key={i}>
            {e}
          </div>
        )
      })}
    </div>
  )
}

export default MiniGame;