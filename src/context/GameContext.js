import { createContext, useEffect, useState,useContext } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { 
  AuthContext 
} from "../context/AuthContext";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [GameInfo,setGameInfo]=useState(null)
  const [loading,setLoading]=useState(true)
  
  useEffect(() => {
    if(!currentUser){
      return
    }

    const userRef =query(collection(db,"games"),where("players","array-contains",currentUser.uid),) 
    const unsub = onSnapshot(userRef,(snapshot)=>{
      setGameInfo(snapshot.docs.map(doc=>doc.data()))
    })
    
    return () => {
      unsub();
    };

  }, [currentUser]);

  return (
    <GameContext.Provider value={{ GameInfo }}>
      {children}
    </GameContext.Provider>
  );
};