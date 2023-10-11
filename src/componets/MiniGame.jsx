import React, { useContext, useState,memo } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";

const MiniGame = (props)=>{
  const [gameState,setGameState]=useState(["","","",
                                           "","","",
                                           "","",""])

  const handlePlay = async(small)=>{

    const gameRef = doc(db,"games","8LZs6CCr40WRVZXwqenabFvWruD2_t9KT16jnS1NeTbaWsWM5f7PVYkp1")

    await updateDoc(gameRef, {
      recentM: props.big,
      recentS: small,
    });


    console.log("small",small)
    console.log("big",props.big)
  }
  function checkWinner(){
    
    //top row
    if(gameState[0]==="X"&& gameState[1]==="X"&&gameState[2]==="X"){
      return "X"
    }else if(gameState[0]==="O"&& gameState[1]==="O"&&gameState[2]==="O"){
      return "O"
    }
    //middle row
    if(gameState[3]==="X"&& gameState[4]==="X"&&gameState[5]==="X"){
      return "X"
    }else if(gameState[3]==="O"&& gameState[4]==="O"&&gameState[5]==="O"){
      return "O"
    }
    //bottom row
    if(gameState[6]==="X"&& gameState[7]==="X"&&gameState[8]==="X"){
      return "X"
    }else if(gameState[6]==="O"&& gameState[7]==="O"&&gameState[8]==="O"){
      return "O"
    }
    //left column
    if(gameState[0]==="X"&& gameState[3]==="X"&&gameState[6]==="X"){
      return "X"
    }else if(gameState[0]==="O"&& gameState[3]==="O"&&gameState[6]==="O"){
      return "O"
    }
    //middle column
    if(gameState[1]==="X"&& gameState[4]==="X"&&gameState[7]==="X"){
      return "X"
    }else if(gameState[1]==="O"&& gameState[4]==="O"&&gameState[7]==="O"){
      return "O"
    }
    //right column
    if(gameState[2]==="X"&& gameState[5]==="X"&&gameState[8]==="X"){
      return "X"
    }else if(gameState[2]==="O"&& gameState[5]==="O"&&gameState[8]==="O"){
      return "O"
    }
    //right cross
    if(gameState[0]==="X"&& gameState[4]==="X"&&gameState[8]==="X"){
      return "X"
    }else if(gameState[0]==="O"&& gameState[4]==="O"&&gameState[8]==="O"){
      return "O"
    }
    //left cross
    if(gameState[2]==="X"&& gameState[4]==="X"&&gameState[6]==="X"){
      return "X"
    }else if(gameState[2]==="O"&& gameState[4]==="O"&&gameState[6]==="O"){
      return "O"
    }
    
    for(var x = 0;x<9;x++){
      if(gameState[x]==""){
        return("NON")
      }
    }

    return("FULL")
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