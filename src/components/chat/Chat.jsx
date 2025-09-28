import EmojiPicker from 'emoji-picker-react'
import './chat.css'
import React, { useState, useRef, useEffect } from 'react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import upload from '../../lib/upload';

const Chat = ({setShowDetail}) => {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  })


  const endRef = useRef(null);

  const { chatId, user, isCurrentUserBlocked, isRecieverBlocked } = useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat])

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    }
  }, [chatId]);

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };


  const handleSend = async () => {
    if (text === "") return;

    let imgURL = null;

    try {

      if (img.file) {
        imgURL = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgURL && { img: imgURL }),
        }),
      });

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id, idx) => {

        const userChatsRef = doc(db, "userChats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId);

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = idx === 1 ? false : true;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }

      })


    }
    catch (err) {
      console.log(err);
    }

    setImg({
      file: null,
      url: "",
    })
    setText("");
  }

  function handleEmojiClick(e) {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  }



  return (
    <div className='chat'>
      <div className="top">
        <div className="user" onClick={()=>setShowDetail(true)}>
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>click here for contact info</p>
          </div>
        </div>
        <div className='icons'>
          <img src="./phone.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./info.png" alt="" onClick={()=>setShowDetail(true)}/>
        </div>
      </div>

      <div className="center">

        {chat?.messages?.map((message) => (

          <div className={(message.senderId === currentUser.id) ? "message own" : "message"} key={message?.createdAt}>
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              <span>few mins ago</span>
            </div>
          </div>
        ))}

        {img.url && <div className='message own'>
          <div className="texts">
            <img src={img.url} alt="" />
          </div>
        </div>}

        <div className='end' ref={endRef}></div>

      </div>

      <div className="bottom">
        <div className="icons">
          {/* <img src="./img.png" alt="" /> */}
          <span className='AI' onClick={()=>setText('@askAI  ')}>Ai</span>
          <div className="file-upload">
            <label htmlFor="imgFile">
              <img className='input-img' src="./camera.png" alt=""  />
              <span className='only-img-div'>only images</span>
            </label>
            <input type="file" id='imgFile' style={{ display: 'none' }} onChange={handleImg} />
          </div>
          {/* <img src="./mic.png" alt="" /> */}
        </div>
        <input type="text" placeholder='Type a message' value={text} onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isRecieverBlocked} />
        <div className="emoji">
          <img src="./emoji.png"
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmojiClick} />
          </div>
        </div>
        <button onClick={handleSend} disabled={isCurrentUserBlocked || isRecieverBlocked}>Send</button>
      </div>

    </div>
  )

}

export default Chat
