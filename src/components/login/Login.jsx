import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from '../../lib/firebase';
import './login.css'
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';


const Login = () => {

    const [avatar, setAvatar] = useState({
        file : null,
        url : ""
    });

    function handleAvatar(e){
        if(e.target.files[0]){
            setAvatar({
                file : e.target.files[0],
                url : URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleRegister= async (e)=>{
      e.preventDefault();
      const formData = new FormData(e.target);
      const { username, email, password } =  Object.fromEntries(formData);
      // console.log(username);

      try{

        const res = await createUserWithEmailAndPassword(auth, email, password);
        
        await setDoc(doc(db, "users", res.user.uid),{
          username,
          email,
          id: res.user.uid,
          blocked: [],
        });

        await setDoc(doc(db, "userChats", res.user.uid),{
          chats: [],
        });

        toast.success("Account created! You can login now");

      }
      catch(e){
        console.log(e);
        toast.error(e.message);
      }

    }

    function handleSubmit(e){
        e.preventDefault();
        toast.success("Hello");
    }

  return (
    <div className='login'>

      <div className="item">
        <h2>Welcome back</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder='Email' />
            <input type="password" name="password" placeholder='Password' />
            <button>Sign In</button>
        </form>
      </div>

      <div className="separator"></div>

      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
            <label htmlFor="avatar-file">
                <img src={avatar.url || 'avatar.png'} alt="profile" /> Upload an Image
            </label>
            <input type="file" id='avatar-file' style={{display:'none'}} onChange={handleAvatar}/>
            <input type="text" placeholder='Username' name='username'/>
            <input type="email" name="email" placeholder='Email' />
            <input type="password" name="password" placeholder='Password' />
            <button>Sign Up</button>
        </form>
      </div>

    </div>
  )
}

export default Login
