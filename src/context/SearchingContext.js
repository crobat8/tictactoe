import { createContext, useEffect, useState,useContext } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { 
  AuthContext 
} from "../context/AuthContext";

export const SearchingContext = createContext();

export const SearchingContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [GameInfo,setGameInfo]=useState(null)
  const [loading,setLoading]=useState(true)
  
  useEffect(() => {
    if(!currentUser){
      return
    }

    const userRef =query(collection(db,"search"),where("players","array-contains",currentUser.uid),) 
    const unsub = onSnapshot(userRef,(snapshot)=>{
      setGameInfo(snapshot.docs.map(doc=>doc.data()))
    })
    
    return () => {
      unsub();
    };

  }, [currentUser]);

  return (
    <SearchingContext.Provider value={{ GameInfo }}>
      {children}
    </SearchingContext.Provider>
  );
};