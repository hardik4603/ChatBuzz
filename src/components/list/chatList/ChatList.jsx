import React, { useState } from 'react'
import './chatList.css'

const ChatList = () => {
    const [adding, setAdding] = useState(false);
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
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="chatImg" />
            <div className="texts">
                <span>Hardik Parmar</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="chatImg" />
            <div className="texts">
                <span>Hardik Parmar</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="chatImg" />
            <div className="texts">
                <span>Hardik Parmar</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="chatImg" />
            <div className="texts">
                <span>Hardik Parmar</span>
                <p>Hello</p>
            </div>
        </div>
    </div>
  )
}

export default ChatList
