import React, { useState } from 'react'
import './chatList.css'
import AddUser from './addUser/AddUser.jsx'

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
                <p>Lorem ipsum dolor sit.</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="chatImg" />
            <div className="texts">
                <span>Jay Barad</span>
                <p>amet consectetur adipisicing elit.</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="chatImg" />
            <div className="texts">
                <span>Krish Kanj</span>
                <p>elit. Autem, aliquid.</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="chatImg" />
            <div className="texts">
                <span>Rohit</span>
                <p>nemo natus nostrum,  repudiandae.</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="chatImg" />
            <div className="texts">
                <span>Surru Bhai</span>
                <p>eveniet optio dolore molestias itaque.</p>
            </div>
        </div>

        {adding && <AddUser/>}
    </div>
  )
}

export default ChatList
