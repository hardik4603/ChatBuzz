import React, {useState} from 'react'
import './login.css'
import toast from 'react-hot-toast';


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
        <form>
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
