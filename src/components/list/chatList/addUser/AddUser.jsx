import React, { useState } from 'react'
import './addUser.css'
import { db } from '../../../../lib/firebase';
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { useUserStore } from '../../../../lib/userStore';

const AddUser = ({setAdding}) => {
  const [user, setUser] = useState(null);
  const {currentUser} = useUserStore();
  const [disabledAdd, setDisableAdd] = useState(false);

  const handleSearch = async (e) => {

    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }

    }
    catch (err) {
      console.log(err);
    }

  };

  const handleAdd = async() => {

    // Here i am creating a "chats" which is generating the Id, which i am feeding in those userschats who are part of this chat
    // which is currentUser and user. Every ele of chats will be storing chatId, lastMsg, recieverId, updatedAt
    


    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");

    try{
      const newChatRef = doc(chatRef);
      setDisableAdd(true);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId : newChatRef.id,
          lastMessage: "",
          recieverId : currentUser.id,
          updatedAt : Date.now(),
        })
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId : newChatRef.id,
          lastMessage: "",
          recieverId : user.id,
          updatedAt : Date.now(),
        })
      });

    }
    catch(err){
      console.log(err);
    }
    finally{
      setAdding(false);
      setDisableAdd(false);
    }
  }

  return (
    <div className='addUser'>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder='Username' name='username' />
        <button>Search</button>
        <button type="button" className="close" onClick={() => setAdding(false)}> X </button>
      </form>
      {user && <div className="user">
        <div className="detail">
          <img src={user.avatar || "./avatar.png"} />
          <span>{user.username}</span>
        </div>
        <button onClick={handleAdd} disabled={disabledAdd}>Add User</button>
      </div>}
    </div>
  )
}

export default AddUser
// style={disabledAdd && {cursor:'not-allowed', dis}}