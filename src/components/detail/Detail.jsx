import React, { useState } from 'react'
import './detail.css'
import { auth, db } from '../../lib/firebase'
import { useUserStore } from '../../lib/userStore'
import { useChatStore } from '../../lib/chatStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'

const Detail = ({setShowDetail}) => {

  const [ upArrow, setUpArrow] = useState(true);
  const {currentUser} = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isRecieverBlocked, changeBlock } = useChatStore();

  const handleBlock = async ()=>{
    if(!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try{  
      await updateDoc(userDocRef, {
        blocked : isRecieverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      })
      changeBlock();
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="box">

    <div className='detail'>
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
        <span onClick={()=>setShowDetail(false)}>X</span>
      </div>

      <div className="info">

        {/* <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="/arrowUp.png" alt="" />
          </div> 
        </div>
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="/arrowUp.png" alt="" />
          </div> 
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="/arrowUp.png" alt="" />
          </div> 
        </div> */}

        <div className='calls'>
          <img src="./edit.png" alt="" onClick={()=>setShowDetail(false)}/>
          <img src="./phone.png" alt="" />
          <img src="./camera.png" alt="" />
        </div>

        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src={(upArrow)? "/arrowUp.png" :"/arrowDown.png"} alt="" onClick={()=>setUpArrow(!upArrow)}/>
          </div> 
          {upArrow && <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="/bg-img.jpg" alt="" />
                <span>photo_2025_3.png</span>
              </div>
              <img src="/download.png" alt="" className='icon'/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="/bg-img.jpg" alt="" />
                <span>photo_2025_3.png</span>
              </div>
              <img src="/download.png" alt="" className='icon' />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="/bg-img.jpg" alt="" />
                <span>photo_2025_3.png</span>
              </div>
              <img src="/download.png" alt="" className='icon' />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="/bg-img.jpg" alt="" />
                <span>photo_2025_3.png</span>
              </div>
              <img src="/download.png" alt="" className='icon' />
            </div>
          </div>}
        </div>
        {/* <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="/arrowUp.png" alt="" />
          </div> 
        </div> */}
        <button onClick={handleBlock}>
          {
            isCurrentUserBlocked ? "You are Blocked" : isRecieverBlocked ? "Unblock User" : "Block User"
          }
        </button>
        {/* <button className='logOut' onClick={()=>auth.signOut()}>LogOut</button> */}
      </div>
    </div>

    </div>
  )
}

export default Detail
