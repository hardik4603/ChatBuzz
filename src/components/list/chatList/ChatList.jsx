import React, { useState, useEffect } from 'react'
import './chatList.css'
import AddUser from './addUser/AddUser.jsx'
import { useUserStore } from '../../../lib/userStore.js';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase.js';


const ChatList = () => {
    const [adding, setAdding] = useState(false);
    const [chats, setChats] = useState([]);
    const {currentUser} = useUserStore();
    
    useEffect(() => {
      const unSub = onSnapshot(doc(db,"userChats", currentUser.id),(doc)=>{
        setChats(doc.data());
      })
    
      return () => {
        unSub();
      }
    }, [currentUser.id])
    console.log(chats);

  return (
    <div className='chatList'>

        {/* Search Bar */}
        <div className="search">
            <div className="searchBar">
                <img src="./search.png" alt="search-btn" />
                <input placeholder='Search..' type="text" />
            </div>
            <img onClick={()=>setAdding((prev) => !prev)} 
                className='add' src={adding ? "./minus.png":"./plus.png"} alt="add-btn"
            />
        </div>

        {/* ChatLists */}
        <div className="item">
            <img src="./avatar.png" alt="chatImg" />
            <div className="texts">
                <span>Hardik Parmar</span>
                <p>Lorem ipsum dolor sit.</p>
            </div>
        </div>
        

        {adding && <AddUser/>}
    </div>
  )
}

export default ChatList
