import React, { useState, useEffect } from 'react'
import './chatList.css'
import AddUser from './addUser/AddUser.jsx'
import { useUserStore } from '../../../lib/userStore.js';
import { useChatStore } from '../../../lib/chatStore.js';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase.js';



const ChatList = () => {
  const [adding, setAdding] = useState(false);
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const {chatId, changeChat} = useChatStore();

  // So basically Chats array's every ele has an object 
  // {chatId, lastMessage, recieverId, updatedAt, user:{avatar, email, blocked, id, username}}

  const filteredChats = chats.filter((c)=> c.user.username.toLowerCase().includes(input.toLowerCase()));




  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userChats", currentUser.id), async(res) => {
      // setChats(doc.data());
      const items = res.data().chats;

      // this promise is run to just add user in every item of arr
      const promises = items.map(async(item)=>{


        const userDocRef = doc(db, "users", item.recieverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return { ...item, user};
        
      });
      // So here single items has all info related to a chat and also user info is embedded in it

      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a,b)=> b.updatedAt - a.updatedAt));
    })

    return () => {
      unSub();
    }
  }, [currentUser.id]);
  // console.log(chats);


  const handleSelect = async (chat)=>{

    const userChats = chats.map((item, idx)=>{
      const {user, ...rest} = item;
      return rest;
    })

    const index = userChats.findIndex((item)=> item.chatId===chat.chatId);

    userChats[index].isSeen = true;

    const userChatsRef = doc(db, "userChats", currentUser.id);
    
    try{
      await updateDoc(userChatsRef, {
        chats: userChats,
      })
      changeChat(chat.chatId, chat.user);
    }
    catch(err){
      console.log(err);
    }

  }


  return (
    <div className='chatList'>

      {/* Search Bar */}
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="search-btn" />
          <input placeholder='Search..' type="text" onChange={(e)=>setInput(e.target.value)}/>
        </div>
        <img onClick={() => setAdding((prev) => !prev)}
          className='add' src={adding ? "./minus.png" : "./plus.png"} alt="add-btn"
        />
      </div>

      {/* ChatLists */}
      {filteredChats.map((chat) => (
        <div className="item" key={chat.chatId} onClick={()=>{handleSelect(chat)}} style={{backgroundColor: chat.isSeen? "transparent": "#5183fe"}}>
          <img src={chat.user.avatar || "./avatar.png"} alt="chatImg" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}


      {adding && <AddUser />}
    </div>
  )
}

export default ChatList
