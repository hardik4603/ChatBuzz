import React from "react"
import Detail from './components/detail/Detail.jsx';
import List from './components/list/List.jsx';
import Chat from './components/chat/Chat.jsx';
import Login from "./components/login/Login.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {

  const user = false;

  return (
    <div className='container'>
      {
        (user)? (
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