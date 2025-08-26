import React, { useState, useEffect } from 'react'
import './chatList.css'
import AddUser from './addUser/AddUser.jsx'
import { useUserStore } from '../../../lib/userStore.js';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase.js';


const ChatList = () => {
  const [adding, setAdding] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userChats", currentUser.id), async(res) => {
      // setChats(doc.data());
      const items = res.data().chats;

      const promises = items.map(async(item)=>{


        const userDocRef = doc(db, "users", item.recieverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return { ...item, user};
        
      });

      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a,b)=> b.updatedAt - a.updatedAt));
    })

    return () => {
      unSub();
    }
  }, [currentUser.id]);
  // console.log(chats);

  return (
    <div className='chatList'>

      {/* Search Bar */}
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="search-btn" />
          <input placeholder='Search..' type="text" />
        </div>
        <img onClick={() => setAdding((prev) => !prev)}
          className='add' src={adding ? "./minus.png" : "./plus.png"} alt="add-btn"
        />
      </div>

      {/* ChatLists */}
      {chats.map((chat) => (
        <div className="item" key={chat.chatId}>
          <img src="./avatar.png" alt="chatImg" />
          <div className="texts">
            <span>Hardik Parmar</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}


      {adding && <AddUser />}
    </div>
  )
}

export default ChatList
