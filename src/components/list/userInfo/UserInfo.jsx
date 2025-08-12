import React from 'react'
import './userInfo.css'
import { useUserStore } from '../../../lib/userStore';



const UserInfo = () => {

  const {currentUser} = useUserStore();

  return (
    <div className='userInfo'>
      <div className='user'>
        <img src={currentUser.avatar || 'avatar.png'} alt="user" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="more" />
        <img src="./camera.png" alt="camera" />
        <img src="./edit.png" alt="edit" />
      </div>
    </div>
  )
}

export default UserInfo
