import EmojiPicker from 'emoji-picker-react'
import './chat.css'
import React, { useState } from 'react'

const Chat = () => {
  const[open, setOpen] = useState(false);
  const[text, setText] = useState("");

  function handleEmojiClick(e){
    setText((prev)=>prev+e.emoji);
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
        <div className="message">
          <img src="./avatar.png" />
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, optio. Ducimus hic excepturi quae sequi tempora nobis deserunt nihil inventore esse commodi dolores accusantium exercitationem laborum delectus, cumque fuga ullam!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, optio. Ducimus hic excepturi quae sequi tempora nobis deserunt nihil inventore esse commodi dolores accusantium exercitationem laborum delectus, cumque fuga ullam!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" />
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, optio. Ducimus hic excepturi quae sequi tempora nobis deserunt nihil inventore esse commodi dolores accusantium exercitationem laborum delectus, cumque fuga ullam!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, optio. Ducimus hic excepturi quae sequi tempora nobis deserunt nihil inventore esse commodi dolores accusantium exercitationem laborum delectus, cumque fuga ullam!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" />
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, optio. Ducimus hic excepturi quae sequi tempora nobis deserunt nihil inventore esse commodi dolores accusantium exercitationem laborum delectus, cumque fuga ullam!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, optio. Ducimus hic excepturi quae sequi tempora nobis deserunt nihil inventore esse commodi dolores accusantium exercitationem laborum delectus, cumque fuga ullam!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" />
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, optio. Ducimus hic excepturi quae sequi tempora nobis deserunt nihil inventore esse commodi dolores accusantium exercitationem laborum delectus, cumque fuga ullam!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="./bg-img.jpg" alt="" />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, optio. Ducimus hic excepturi quae sequi tempora nobis deserunt nihil inventore esse commodi dolores accusantium exercitationem laborum delectus, cumque fuga ullam!</p>
            <span>1 min ago</span>
          </div>
        </div>    



      </div>

      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder='Type a message' value={text} onChange={(e)=>setText(e.target.value)}/>
        <div className="emoji">
          <img src="./emoji.png"
            onClick={()=>setOpen((prev)=>!prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmojiClick}/>
          </div>
        </div>
        <button>Send</button>
      </div>

    </div>
  )

}

export default Chat
