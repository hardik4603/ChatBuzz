




// HandleSend se baaki hai






import EmojiPicker from 'emoji-picker-react'
import './chat.css'
import React, { useState, useRef, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const endRef = useRef(null);

  const { chatId } = useChatStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [])

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    }
  }, [chatId])


  const handleSend = async ()=> {
    if(text === "") return;

    try{

    }
    catch(err){
      console.log(err);
    }
  }

  function handleEmojiClick(e) {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  }



  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Joe Doe</span>
            <p>Lorem ipsum dolor sit amet. lorem30</p>
          </div>
        </div>
        <div className='icons'>
          <img src="./phone.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>

      <div className="center">

        {chat?.messages?.map((message) => (

          <div className="message own" key={message?.createdAt}>
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              <span>1 min ago</span>
            </div>
          </div>
        ))}

        <div className='end' ref={endRef}></div>

      </div>

      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder='Type a message' value={text} onChange={(e) => setText(e.target.value)} />
        <div className="emoji">
          <img src="./emoji.png"
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmojiClick} />
          </div>
        </div>
        <button onClick={handleSend}>Send</button>
      </div>

    </div>
  )

}

export default Chat
