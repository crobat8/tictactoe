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
        let playable;
        console.log(gameInfo[0].winnerM )
        if(gameInfo[0].winnerM != ""){
          playable = false;
        }else if(gameInfo[0].mainGame[gameInfo[0].recentS] == "FULL"|| gameInfo[0].mainGame[gameInfo[0].recentS] == "X" ||gameInfo[0].mainGame[gameInfo[0].recentS] == "O"){
          if(gameInfo[0].mainGame[props.big] == "FULL"|| gameInfo[0].mainGame[props.big] == "X" ||gameInfo[0].mainGame[props.big] == "O"){
            playable = false;
          }else{
            playable = true;
          }
        }else if(gameInfo[0].recentS == props.big || gameInfo[0].recentS == 10 ){
          playable = true;
        }else{
          playable = false;
        }
        return(
          <div>
            {
              gameInfo[0].function == "done" && e == "" && playable
              ?
              <div className={"cellP"} onClick={()=>handlePlay(i)} key={i}>
              {e}
              </div>
              :
              <div className={"cellD"} key={i}>
              {e}
              </div>
            }
          </div>
          
          
        )
      })}
    </div>
  )
}

export default MiniGame;