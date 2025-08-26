import React from 'react'
import './addUser.css'
import {db} from '../../../../lib/firebase';
import { collection, getDoc, query, where } from 'firebase/firestore';

const AddUser = () => {

  
  const handleSearch = async (e)=>{

    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try{
      const useRef = collection(db,"users");

      const q = query(useRef, where("username", "==", username));

      const querySnapShot = await getDoc(q);

      if(!querySnapShot.empty){
        setUser(querySnapShot.docs[0].data());
      }

    }

    catch(err){
      console.log(err);
    }

  };
  
  return (
    <div className='addUser'>
        <form onSubmit={handleSearch}>
            <input type="text" placeholder='Username' name='username'/>
            <button>Search</button>
        </form>
        <div className="user">
            <div className="detail">
                <img src="./avatar.png"/>
                <span>Jane Doe</span>
            </div>
            <button>Add User</button>
        </div>
    </div>
  )
}

export default AddUser
