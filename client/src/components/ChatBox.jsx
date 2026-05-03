import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message';
import toast from 'react-hot-toast';

const ChatBox = () => {

    const containerRef = useRef(null);

    const {selectedChat, theme, user, axios, token, setUser} = useAppContext();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [prompt, setPrompt] = useState('');
    const [mode, setMode] = useState('text');
    const [isPublished, setIsPublished] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!user) return toast.message('Login to send message')
                setLoading(true)
                const promptCopy = prompt
                setPrompt('')
                setMessages(prev => [...prev, {role: 'user', content: prompt, timestamp: Date.now(), isImage: false}])

                const { data } = await axios.post(`/api/message/${mode}`, {chatId: selectedChat._id, prompt, isPublished}, {headers: { Authorization: token } })

                if(data.success){
                    setMessages(prev => [...prev, data.reply])
                    // Subtract Credit
                    if(mode === 'image'){
                        setUser(prev => ({...prev, credits: prev.credits - 2}))
                    } else {
                        setUser(prev => ({...prev, credits: prev.credits - 1}))
                    }
                } else {
                    toast.error(data.message)
                    setPrompt(promptCopy)
                }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setPrompt('')
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(selectedChat){
            setMessages(selectedChat.messages)
        }
    },[selectedChat])

    useEffect(()=>{
        if(containerRef.current){
            containerRef.current.scrollTo({
                top:containerRef.current.scrollHeight,
                behavior: "smooth",
            })
        }
    },[messages])

    return (
        <main className='flex-1 flex flex-col justify-between m-5 md:mx-10 md:mt-10 md:mb-5 xl:mx-30 max-md:mt-14 2xl:pr-40'>

            {/* Chat Messages */}
            <div ref={containerRef} className='flex-1 mb-5 overflow-y-scroll'>
                {messages.length === 0 && (
                    <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
                        <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} className='w-full max-w-56 sm:max-w-68' alt="TopGPT Full Brand Logo" />
                        <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>Ask me anything.</p>
                    </div>
                )}

                {messages.map((message, index)=> <Message key={index} message={message}/>)}

                {/* Three Dots Loading */}
                {loading && <div className='loader flex items-center gap-1.5'>
                    <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
                    <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
                    <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
                    </div>}
            </div>

            {mode === 'image' && (
                <label htmlFor='publish-checkbox' className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
                    <p className='text-xs'>Publish Generated Image to Community</p>
                    <input id='publish-checkbox' type="checkbox" className='cursor-pointer' checked={isPublished} onChange={(e)=>setIsPublished(e.target.checked)}/>
                </label>
            )}

            {/* Prompt Input Box */}
            <form onSubmit={onSubmit} className='bg-primary/20 dark:bg-[#4A3728]/30 border border-primary dark:border-[#A68767]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'>
                <select onChange={(e)=>setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none aria-label="Select Modality"'>
                    <option className='dark:bg-[#4A3728]' value="text">Text</option>
                    <option className='dark:bg-[#4A3728]' value="image">Image</option>
                </select>
                <input onChange={(e)=>setPrompt(e.target.value)} value={prompt} type="text" placeholder='Type your prompt here...' className='flex-1 w-full text-sm outline-none' required aria-label="AI Prompt Input"/>
                <button disabled={loading} aria-label={loading ? "Generating response..." : "Send Prompt"}>
                    <img src={loading ? assets.stop_icon : assets.send_icon} className='w-8 cursor-pointer' alt="Submit Prompt Icon" />
                </button>
            </form>

            {/* Author */}
            <div className='w-full flex justify-center gap-3 mt-3'>
                <a href="" target='_blank' rel='noopener noreferrer' className='text-sm font-medium text-gray-800 dark:text-white hover:text-stone-200'>&copy; Filbert Sembiring Meliala</a>
                <div className='h-2 border-r-[1px] border-border-medium mt-1.5'></div>
                <a href="https://linkedin.com/in/filbert-sembiring-meliala/" target='_blank' rel='noopener noreferrer' className='text-sm font-medium text-gray-800 dark:text-white hover:text-stone-200 underline'>LinkedIn</a>
                <div className='h-2 border-r-[1px] border-border-medium mt-1.5'></div>
                <a href="https://github.com/FilbertSM" target='_blank' rel='noopener noreferrer' className='text-sm font-medium text-gray-800 dark:text-white hover:text-stone-200 underline'>GitHub</a>
                <div className='h-2 border-r-[1px] border-border-medium mt-1.5'></div>
                <a href="https://filbertsm.vercel.app/" target='_blank' rel='noopener noreferrer' className='text-sm font-medium text-gray-800 dark:text-white hover:text-stone-200 underline'>Portfolio</a>
                
            </div>

        </main>
    )
}

export default ChatBox