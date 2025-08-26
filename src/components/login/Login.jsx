import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from '../../lib/firebase';
import './login.css'
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';
import { signInWithEmailAndPassword } from 'firebase/auth/web-extension';


const Login = () => {

    const [avatar, setAvatar] = useState({
        file : null,
        url : "",
    });

    const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const formData = new FormData(e.target);
      const { username, email, password } =  Object.fromEntries(formData);
      // console.log(username);

      try{

        const res = await createUserWithEmailAndPassword(auth, email, password);
        
        const imgUrl = await upload(avatar.file);

        await setDoc(doc(db, "users", res.user.uid),{
          username,
          email,

          id: res.user.uid,
          blocked: [],
          avatar : imgUrl,
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
      finally{
        setLoading(false);
      }

    }

    async function handleLogin(e){
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const { email, password } =  Object.fromEntries(formData);

        try{
          await signInWithEmailAndPassword(auth, email, password);
          toast.success("Logged In");
        }
        catch(err){
          console.log(err);
          toast.error(ere.message);
        }
        finally{
          setLoading(false);
        }
    }

  return (
    <div className='login'>

      <div className="item">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
            <input type="email" name="email" placeholder='Email' />
            <input type="password" name="password" placeholder='Password' />
            <button disabled={loading}>{(loading)? 'loading':'Sign In'}</button>
        </form>
      </div>

      <div className="separator"></div>

      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
            <label htmlFor="avatar-file">
                <img src={avatar.url || 'avatar.png'} alt="profile" /> 
                {(avatar.url)? 'change photo':'upload an image'}
            </label>
            <input type="file" id='avatar-file' style={{display:'none'}} onChange={handleAvatar}/>
            <input type="text" placeholder='Username' name='username'/>
            <input type="email" name="email" placeholder='Email' />
            <input type="password" name="password" placeholder='Password' />
            <button disabled={loading}>{(loading)? 'loading':'Sign Up'}</button>
        </form>
      </div>

    </div>
  )
}

export default Login