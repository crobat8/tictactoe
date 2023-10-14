import React, { useContext, useState,memo } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { GameContext } from '../context/GameContext';

const MiniGame = (props)=>{
  const {gameInfo} = useContext(GameContext);
  const handlePlay = async(small)=>{
    if(gameInfo[0].function == "ready"){
      return 
    }
    const gameRef = doc(db,"games",gameInfo[0].gameName)
    let gameNum = "g" + props.big
    let miniGameInfo = gameInfo[0][gameNum]
    miniGameInfo[small] = gameInfo[0].turn
    await updateDoc(gameRef, {
      recentM: props.big,
      recentS: small,
      [gameNum]: miniGameInfo,
      function: "ready"
    });
  }

  return(
    <div className='miniGame'>
      {props.gameNum.map((e,i)=>{
        return(
          <div className={gameInfo[0].function == "done"?"cellP":"cellD"} onClick={()=>handlePlay(i)} key={i}>
            {e}
          </div>
        )
      })}
    </div>
  )
}

export default MiniGame;