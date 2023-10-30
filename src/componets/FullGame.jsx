import React, { useContext, useState,memo } from 'react';
import MiniGame from './MiniGame';
import { GameContext } from '../context/GameContext';

const FullGame = ()=>{
  const [gameState,setGameState]=useState(["NON","NON","NON",
                                           "NON","NON","NON",
                                           "NON","NON","NON"])
  const {gameInfo} = useContext(GameContext);
  const [turnPiece,setTurnPiece]=useState("X")
  const [lastPlayed,setLastPlayed]=useState(10)
  if (gameInfo.length == 0){
    return(
      <h1>
        search for a game
      </h1>
    )
  }

  return(
    <div className='fullGame'>
      <MiniGame big={0}  
                gameNum={gameInfo[0].g0}
                />
      <MiniGame big={1}  
                gameNum={gameInfo[0].g1}
                />
      <MiniGame big={2}  
                gameNum={gameInfo[0].g2}
                />
      <MiniGame big={3}  
                gameNum={gameInfo[0].g3}
                />
      <MiniGame big={4}  
                gameNum={gameInfo[0].g4}
                />
      <MiniGame big={5}  
                gameNum={gameInfo[0].g5}
                />
      <MiniGame big={6}  
                gameNum={gameInfo[0].g6}
                />
      <MiniGame big={7}  
                gameNum={gameInfo[0].g7}
                />
      <MiniGame big={8}  
                gameNum={gameInfo[0].g8}
                />                   
    </div>
  )
}

export default FullGame;