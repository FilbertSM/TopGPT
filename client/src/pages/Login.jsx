import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import SEO from '../components/SEO';

const Login = () => {

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { axios, setToken } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = state === "login" ? '/api/user/login' : '/api/user/register'

    try {
        const { data } = await axios.post(url, {name, email, password})
        if(data.success){
            setToken(data.token)
            localStorage.setItem('token', data.token)
            navigate('/', {replace: true})
            toast.success('Logged in successfully')
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
  }

  return (
    <>
    <SEO 
        title={`${state === 'login' ? 'Login' : 'Sign Up'} | TopGPT`} 
        description="Login or register an account to start using TopGPT, the safest and most accurate AI assistant." 
        url="https://topgpt-chi.vercel.app/login" 
    />
    <div id='login' className='bg-[#151516] flex items-center justify-center h-screen w-screen flex-col'>
        <img src={assets.title_logo} className='w-48 sm:w-64 mt-auto' alt="TopGPT Logo" />
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-auto mx-auto mt-4 items-start p-8 py-12 w-80 sm:w-[352px] text-white rounded-lg shadow-xl border border-[#39393a] bg-[#0F0E0E]">
            <p className="text-2xl font-medium m-auto">
                <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-[#39393a] rounded w-full p-2 mt-1 outline-[#413730]" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-[#39393a] rounded w-full p-2 mt-1 outline-[#413730]" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-[#39393a] rounded w-full p-2 mt-1 outline-[#413730]" type="password" required />
            </div>
            {state === "register" ? (
                <p className="text-white">
                    Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                </p>
            ) : (
                <p className="text-white">
                    Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                </p>
            )}
            <button type='submit' className="bg-primary hover:bg-[#A68767] transition-all text-black w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    </div>
    </>
  )
}

export default Login