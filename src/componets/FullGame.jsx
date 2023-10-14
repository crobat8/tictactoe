import React, { useContext, useState,memo } from 'react';
import MiniGame from './MiniGame';
import { GameContext } from '../context/GameContext';

const FullGame = ()=>{
  const [gameState,setGameState]=useState(["NON","NON","NON",
                                           "NON","NON","NON",
                                           "NON","NON","NON"])
  
  const [turnPiece,setTurnPiece]=useState("X")
  const [lastPlayed,setLastPlayed]=useState(10)

  function handleTurn(){
    if(turnPiece == "X"){
      setTurnPiece("O")
    }else{
      setTurnPiece("X")
    }
  }

  function handleWinner(playedArea,winner){
    if(winner == 'X'||winner == 'O'){
      setLastPlayed('10')
    }
    console.log(playedArea)
    
    gameState[playedArea] = winner
    setGameState([...gameState])
    
  }

  return(
    <div className='fullGame'>
      
      {gameState.map((e,i)=>{
        
        var playable 

        if(gameState[i] =='NON'){
          if(lastPlayed == 10||lastPlayed == i){
            playable = true
          }else{
            playable = false
          }

        }else{
          playable =false
        }
        
         
        return(
          <MiniGame big={i} 
                    piece={turnPiece} 
                    key={i}
                    playable={playable}
                    />
        )
        
      })}
    </div>
  )
}

export default FullGame;