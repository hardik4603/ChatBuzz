import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from '../../lib/firebase';
import './login.css'
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useUserStore } from '../../lib/userStore';


const Login = () => {



    const [avatar, setAvatar] = useState({
        file : null,
        url : "",
    });
    const [showLogin, setShowLogin] = useState(true);

    const [loading, setLoading] = useState(false);
    const { fetchUserInfo } = useUserStore();

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
        
        const imgUrl = 'avatar.png';
        if(avatar.file){
          imgUrl = await upload(avatar.file);
        }

        await setDoc(doc(db, "users", res.user.uid),{
          username,
          email,

          id: res.user.uid,
          blocked: [],
          avatar : imgUrl,
        });

        await setDoc(doc(db, "userChats", res.user.uid),{
          // for every user there is an array called chats and every element inside the chats array 
          // represents another user with which a user is a part of in chat
          chats: [],
        });
        
        await fetchUserInfo(res.user.uid);

        toast.success("Account created! You are logged in");

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
          toast.error(err.message);
        }
        finally{
          setLoading(false);
        }
    }

  return (
    <div className='login'>

      {/* <h1 className='app-name'><span>Chat</span>Buzz</h1>  */}
      <h1 className='app-name'>
        {'ChatBuzz'.split('').map((letter, idx) => (
          <span key={idx}>{letter}</span>
        ))}
      </h1> 



      {showLogin && <div className="item">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
            <input type="email" name="email" placeholder='Email' />
            <input type="password" name="password" placeholder='Password' />
            <button disabled={loading}>{(loading)? 'loading':'Sign In'}</button>
            <span className='change-Auth'>New customer?  <span onClick={()=> setShowLogin(!showLogin)}>Sign Up</span></span>
        </form>
      </div>}

      {/* <div className="separator"></div> */}

      {!showLogin && <div className="item">
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
            <span className='change-Auth'>Already a customer?  <span onClick={()=> setShowLogin(!showLogin)}>Sign In</span></span>
        </form>
      </div>}

    </div>
  )
}

export default Login