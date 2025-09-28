import React from 'react'
import './userInfo.css'
import { useUserStore } from '../../../lib/userStore';
import { auth } from '../../../lib/firebase';



const UserInfo = () => {

  const {currentUser} = useUserStore();

  return (
    <div className='userInfo'>
      <div className='user'>
        <img src={currentUser.avatar || 'avatar.png'} alt="user" />
        <h3>{currentUser.username}</h3>
      </div>
      <div className="icons">
        <img src="./more.png" alt="more" />
        <img src="./camera.png" alt="camera" />
        <div className='logOut-box'>
          <img className='logOut-Img' src="./logOut.png" alt="edit" onClick={()=>auth.signOut()}/>
          <span className='logOut-indi'>Log Out</span>
        </div>
        
      </div>
    </div>
  )
}

export default UserInfo
