import {React, useEffect} from "react"
import Detail from './components/detail/Detail.jsx';
import List from './components/list/List.jsx';
import Chat from './components/chat/Chat.jsx';
import Login from "./components/login/Login.jsx";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase.js";
import { useUserStore } from "./lib/userStore.js";

const App = () => {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore();
  
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
  
    return () => {
      unSubscribe();
    };

  }, [fetchUserInfo]);
  console.log(currentUser);

  if(isLoading) return <div className="loading">Loading...</div>;
  

  return (
    <div className='container'>
      {
        (currentUser)? (
          <>
            <List />
            <Chat />
            <Detail />
          </>
        ):(
          <Login/>
        )
      }
      <Toaster position="bottom-right"/>
    </div>
  )
}

export default App