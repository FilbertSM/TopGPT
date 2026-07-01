import { useState } from "react"
import { assets, dummyPublishedImages, dummyPlans } from "../assets/assets"
import { useAppContext } from "../context/AppContext"
import { Link } from "react-router-dom"
import SEO from "../components/SEO"
import { premiumScroll } from "../utils/scroll"

const Landing = () => {
    const { theme } = useAppContext();
    const [promptText, setPromptText] = useState("");
    const [mode, setMode] = useState("text");
    const [balance, setBalance] = useState(10);
    const [isGenerating, setIsGenerating] = useState(false);
    const [chatHistory, setChatHistory] = useState([
        { role: "assistant", type: "text", content: "Hello! Type a prompt below to see how credits are charged." }
    ]);

    const handleSimulate = (e) => {
        e.preventDefault();
        if (!promptText.trim() || isGenerating) return;
        const cost = mode === "image" ? 2 : 1;

        if (balance < cost) {
            setChatHistory(prev => [
                ...prev,
                { role: "user", type: "text", content: promptText },
                { role: "assistant", type: "text", content: "⚠️ Insufficient credits! Please click 'Reset Balance' to top up." }
            ]);
            setPromptText("");
            return;
        }

        setIsGenerating(true);
        const userMessage = { role: "user", type: "text", content: promptText };
        setChatHistory(prev => [...prev, userMessage]);

        setTimeout(() => {
            setBalance(prev => prev - cost);
            let assistantMessage = {};
            if (mode === "image") {
                const randomImg = dummyPublishedImages[Math.floor(Math.random() * dummyPublishedImages.length)].imageUrl;
                assistantMessage = { role: "assistant", type: "image", content: randomImg };
            } else {
                assistantMessage = {
                    role: "assistant",
                    type: "text",
                    content: `Processed "${promptText}" successfully. Spent ${cost} credit.`
                };
            }
            setChatHistory(prev => [...prev, assistantMessage]);
            setIsGenerating(false);
            setPromptText("");
        }, 1200);
    };

    const handleReset = () => {
        setBalance(10);
        setChatHistory([{ role: "assistant", type: "text", content: "Credits reset! Balance is refilled to 10 credits." }]);
    };

    return (
        <>
            <SEO 
                title="TopGPT | The Next Generation AI Assistant" 
                description="TopGPT is a next generation AI assistant built by Filbert Sembiring Meliala to be safe, accurate, and secure to help you do your best work." 
                url="https://topgpt-chi.vercel.app" 
            />

            {/* --- HERO SECTION --- */}
            <section id="home" className="relative pt-32 pb-20 px-4 flex flex-col items-center overflow-hidden w-full text-gray-700 dark:text-white bg-slate-50/50 dark:bg-zinc-950/10">
                <div className="max-w-[850px] mx-auto text-center z-10">
                    {/* Top Pill Tag */}
                    <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-[#1E1B19]/80 backdrop-blur-md border border-gray-200 dark:border-[#A68767]/30 p-1.5 pr-4 rounded-full mb-8 shadow-sm transition-colors">
                        <span className="bg-[#2D2D2F] dark:bg-primary dark:text-black text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">New</span>
                        <span className="text-[12px] font-bold">TopGPT Version 2.0</span>
                        <span className="text-[12px] text-gray-400 font-medium ml-1">Try now ›</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-[80px] font-bold tracking-tight leading-[1.08] mb-6">
                        Unify AI Power with <br />
                        <span className="bg-gradient-to-r from-[#FFB974] to-[#F5D3AD] bg-clip-text text-transparent">TopGPT</span>
                    </h1>

                    <p className="text-sm sm:text-lg text-gray-500 dark:text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
                        TopGPT is a next generation AI assistant built by <a href="https://filbertsm.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-bold underline decoration-primary/45">Filbert Sembiring Meliala</a> to be safe, accurate, and secure to help you do your best work.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/login" className="w-full sm:w-auto bg-[#2d2d2f] dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full font-semibold text-[15px] hover:scale-[1.03] transition-all shadow-md active:scale-[0.98]">
                            Try TopGPT Free
                        </Link>
                        <a href="#features" onClick={(e) => premiumScroll(e, "features")} className="w-full sm:w-auto bg-white/60 dark:bg-[#1E1B19]/60 backdrop-blur-sm text-gray-800 dark:text-white px-8 py-3.5 rounded-full font-semibold text-[15px] hover:bg-white/95 dark:hover:bg-[#242124] transition-all border border-gray-200 dark:border-[#A68767]/30 active:scale-[0.98]">
                            Explore Features
                        </a>
                    </div>
                </div>

                {/* --- MOCKUP CONTAINER WITH OVERLAYS --- */}
                <div className="mt-16 relative w-full max-w-[1040px] z-10 px-4">
                    {/* Left overlay 1: Credits Status */}
                    <div className="absolute -left-4 md:-left-16 top-[15%] z-20 animate-float-slow hidden md:block">
                        <div className="bg-white/95 dark:bg-[#1E1B19]/95 backdrop-blur-md rounded-2xl p-4 pr-6 flex items-center gap-3 shadow-lg border border-gray-200 dark:border-[#A68767]/35 dark:shadow-[#A68767]/5">
                            <div className="bg-primary/20 text-primary p-2.5 rounded-xl">
                                <img src={assets.diamond_icon} className="w-5 h-5 dark:invert" alt="Credits Icon" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-gray-400">Credits Remaining</span>
                                <span className="text-lg font-extrabold tracking-tight">142 Credits</span>
                            </div>
                        </div>
                    </div>

                    {/* Left overlay 2: Latency monitor */}
                    <div className="absolute -left-6 bottom-[15%] z-20 animate-float-delayed hidden lg:block">
                        <div className="bg-white/95 dark:bg-[#1E1B19]/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-[#A68767]/35 dark:shadow-[#A68767]/5 w-[200px] text-left">
                            <h4 className="font-bold text-[13px] mb-1">Latency Monitor</h4>
                            <p className="text-[11px] text-gray-400 font-medium mb-3">Response Performance</p>
                            <div className="flex justify-between items-end mb-1 text-[11px] font-bold">
                                <span>API Call</span>
                                <span className="text-emerald-500">1.2s (Fast)</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                <div className="w-[85%] bg-emerald-500 h-full rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right overlay 1: System info (replacing Model selector) */}
                    <div className="absolute -right-4 md:-right-12 top-[30%] z-20 animate-float-fast hidden md:block">
                        <div className="bg-white/95 dark:bg-[#1E1B19]/95 backdrop-blur-md rounded-2xl p-3 pr-5 flex items-center gap-3 shadow-lg border border-gray-200 dark:border-[#A68767]/35 dark:shadow-[#A68767]/5">
                            <div className="bg-primary/20 p-2 rounded-xl">
                                <img src={assets.logo} className="w-4 h-4" alt="Branding Mark" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[9px] uppercase font-bold text-gray-400">Connection</span>
                                <span className="text-xs font-bold flex items-center gap-1.5">Secure Endpoint</span>
                            </div>
                        </div>
                    </div>

                    {/* Right overlay 2: Generated Image preview */}
                    <div className="absolute -right-8 bottom-[10%] z-20 animate-float-slow hidden md:block">
                        <div className="bg-white/95 dark:bg-[#1E1B19]/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-[#A68767]/35 dark:shadow-[#A68767]/5 w-[260px] flex gap-3.5 text-left">
                            <img src={dummyPublishedImages[0].imageUrl} className="w-14 h-14 rounded-xl object-cover border border-gray-200 dark:border-[#A68767]/20" alt="Mock Thumbnail" />
                            <div className="flex-1 min-w-0">
                                <span className="text-[9px] uppercase font-bold text-gray-400">Generation</span>
                                <h4 className="font-bold text-[12px] truncate leading-tight text-gray-900 dark:text-white">Isometric workspace setup</h4>
                                <span className="inline-block mt-2 text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full border border-emerald-100/10">Cost: 2 Cr</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Mockup App Window (exact Sidebar + ChatBox styles) */}
                    <div className="bg-white dark:bg-[#111] rounded-3xl overflow-hidden border border-gray-200/50 dark:border-[#A68767]/35 shadow-2xl dark:shadow-[#A68767]/5 relative w-full h-[480px] md:h-[580px] flex">
                        {/* Mock Sidebar (exact style to Sidebar.jsx) */}
                        <div className="w-[240px] bg-[#FCFCFA] dark:bg-gradient-to-b dark:from-[#242124] dark:to-[#000000]/30 border-r border-gray-100 dark:border-[#A68767]/30 p-5 hidden sm:flex flex-col gap-6 text-left">
                            {/* Logo */}
                            <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} alt="TopGPT Sidebar Logo" className='w-full max-w-44'/>
                            
                            {/* New Chat Button */}
                            <button className='flex justify-center items-center w-full py-2 mt-4 text-black bg-gradient-to-r from-[#FFB974] to-[#F5D3AD] text-sm rounded-md cursor-pointer font-bold'>
                                <span className='mr-2 text-xl'>+</span> New Chat
                            </button>

                            {/* Search Conversations */}
                            <div className='flex items-center gap-2 p-3 border border-gray-300 dark:border-white/20 rounded-md bg-white dark:bg-transparent'>
                                <img src={assets.search_icon} className='w-4 not-dark:invert' alt="Search Icon" />
                                <input type="text" placeholder='Search Conversations' className='text-xs placeholder:text-gray-400 outline-none w-full bg-transparent' disabled/>
                            </div>

                            <div className="flex-1 flex flex-col justify-between mt-4">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Recent Chats</p>
                                    <div className="p-2 px-4 bg-white dark:bg-[#4A3728]/10 border border-gray-200 dark:border-[#A68767]/15 rounded-md text-xs font-semibold truncate text-gray-900 dark:text-white flex justify-between">
                                        <span>Show me an image of a ne...</span>
                                    </div>
                                    <div className="p-2 px-4 border border-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/10 rounded-md text-xs font-semibold truncate text-gray-400 dark:text-zinc-500">
                                        <span>Website description copy</span>
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    {/* Community Images */}
                                    <div className='flex items-center gap-2 p-2.5 border border-gray-200 dark:border-white/15 rounded-md text-xs font-medium text-gray-700 dark:text-white'>
                                        <img src={assets.gallery_icon} className='w-4 not-dark:invert' alt="Gallery" />
                                        <span>Community Images</span>
                                    </div>
                                    
                                    {/* Credits */}
                                    <div className='flex items-center gap-2 p-2.5 border border-gray-200 dark:border-white/15 rounded-md text-xs font-medium text-gray-700 dark:text-white'>
                                        <img src={assets.diamond_icon} className='w-4 dark:invert' alt="Credits" />
                                        <span>Credits : 142</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mock Chatbox (exact style to ChatBox.jsx) */}
                        <div className="flex-1 flex flex-col bg-white dark:bg-zinc-950/40 relative">
                            {/* Window Header */}
                            <header className="flex justify-between items-center border-b border-gray-100 dark:border-zinc-900/60 px-6 py-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                    <span className="text-xs text-gray-400 dark:text-zinc-500 font-semibold ml-3">Workspace Chat</span>
                                </div>
                            </header>

                            {/* Chat Messages */}
                            <div className="flex-1 p-6 overflow-y-auto space-y-4 text-left">
                                {/* Assistant Introduction Message */}
                                <div className='inline-flex flex-col gap-2 p-2 px-4 max-w-md bg-primary/20 dark:bg-[#4A3728]/30 border border-[#A68767]/30 rounded-md my-2'>
                                    <p className="text-sm dark:text-white">
                                        Hi! I am TopGPT, your context-aware assistant. How can I help you today?
                                    </p>
                                    <span className='text-[10px] text-gray-400 dark:text-[#B1A6C0]'>just now</span>
                                </div>

                                {/* User message bubble */}
                                <div className='flex items-start justify-end my-4 gap-2'>
                                    <div className='flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#4A3728]/30 border border-[#A68767]/30 rounded-md max-w-sm'>
                                        <p className='text-sm dark:text-white'>Show me an image of a neon cybernetic setup</p>
                                        <span className='text-[10px] text-gray-400 dark:text-[#B1A6C0]'>just now</span>
                                    </div>
                                    <img src={assets.user_icon} className='w-8 rounded-full' alt="User Avatar" />
                                </div>

                                {/* Image response bubble */}
                                <div className='inline-flex flex-col gap-2 p-2 px-4 max-w-md bg-primary/20 dark:bg-[#4A3728]/30 border border-[#A68767]/30 rounded-md my-2'>
                                    <img src={dummyPublishedImages[1].imageUrl} className='w-full max-w-md mt-2 rounded-md border border-white/5' alt="Mock generated result"/>
                                    <span className='text-[10px] text-gray-400 dark:text-[#B1A6C0]'>just now</span>
                                </div>
                            </div>

                            {/* Bottom Input form exactly matching ChatBox.jsx form */}
                            <div className="p-4 bg-white/50 dark:bg-[#000000]/10 border-t border-gray-100 dark:border-zinc-900/60 w-full flex flex-col">
                                <label className='inline-flex items-center gap-2 mb-3 text-[11px] mx-auto text-gray-400 dark:text-zinc-500'>
                                    <p className='text-xs'>Publish Generated Image to Community</p>
                                    <input type="checkbox" className='cursor-pointer' checked disabled/>
                                </label>

                                <div className='bg-primary/20 dark:bg-[#4A3728]/30 border border-primary dark:border-[#A68767]/30 rounded-full w-full max-w-2xl p-2.5 pl-4 mx-auto flex gap-4 items-center text-left'>
                                    <select value="image" className='text-xs pl-3 pr-2 outline-none border-r border-primary/30 dark:border-[#A68767]/20 text-gray-700 dark:text-white' disabled>
                                        <option value="text">Text</option>
                                        <option value="image">Image</option>
                                    </select>
                                    <input type='text' placeholder='Show me an image of a neon cybernetic setup' className='flex-1 w-full text-xs outline-none bg-transparent text-gray-400' disabled/>
                                    <button disabled>
                                        <img src={assets.send_icon} className='w-7 cursor-pointer' alt="Send" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FEATURES SECTION (BENTO GRID WITH ADJUSTED CONTRAST) --- */}
            <section id="features" className="py-24 px-4 sm:px-12 lg:px-24 xl:px-40 text-gray-700 dark:text-white bg-white dark:bg-black w-full">
                <div className="text-center mb-16">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFB974] mb-3 inline-block">Capabilities</span>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">Built for High Performance</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Bento Box 1 */}
                    <div className="md:col-span-2 bg-[#FCFCFA] dark:bg-[#1A1816]/95 border border-gray-200 dark:border-[#A68767]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm dark:shadow-[#A68767]/5 transition-transform duration-200 hover:scale-[1.01]">
                        <div className="space-y-4 text-left">
                            {/* <span className="text-[9px] font-bold text-primary bg-primary/15 border border-primary/25 px-2.5 py-1 rounded-full uppercase tracking-wider">Memory context</span> */}
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Context-Aware Cognitive Memory</h3>
                            <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-medium max-w-lg">
                                TopGPT integrates your profile background and website description into every query context, enabling highly personalized responses tailored precisely to your projects.
                            </p>
                        </div>
                        <div className="mt-8 flex gap-2 overflow-hidden border-t border-gray-100/50 dark:border-zinc-800/40 pt-6">
                            <div className="bg-white dark:bg-[#242124]/40 border border-gray-200 dark:border-[#A68767]/20 px-4 py-2.5 rounded-xl text-xs font-semibold">User Context Loaded</div>
                            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 px-4 py-2.5 rounded-xl text-xs font-semibold">Ready</div>
                        </div>
                    </div>

                    {/* Bento Box 2 */}
                    <div className="bg-[#FCFCFA] dark:bg-[#1A1816]/95 border border-gray-200 dark:border-[#A68767]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm dark:shadow-[#A68767]/5 transition-transform duration-200 hover:scale-[1.01]">
                        <div className="space-y-4 text-left">
                            {/* <span className="text-[9px] font-bold text-primary bg-primary/15 border border-primary/25 px-2.5 py-1 rounded-full uppercase tracking-wider">Modality system</span> */}
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Optimized Modality Billing</h3>
                            <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-medium">
                                Transparent usage model: 1 credit per text generation and 2 credits per high-fidelity image generation.
                            </p>
                        </div>
                        <div className="mt-6 flex flex-col gap-2">
                            <div className="flex justify-between items-center bg-white dark:bg-[#242124]/30 p-2.5 rounded-xl border border-gray-200 dark:border-[#A68767]/25 text-xs">
                                <span>Text Query</span>
                                <span className="font-bold text-primary">1 Cr</span>
                            </div>
                            <div className="flex justify-between items-center bg-white dark:bg-[#242124]/30 p-2.5 rounded-xl border border-gray-200 dark:border-[#A68767]/25 text-xs">
                                <span>Image Render</span>
                                <span className="font-bold text-[#FFB974]">2 Cr</span>
                            </div>
                        </div>
                    </div>

                    {/* Bento Box 3 */}
                    <div className="bg-[#FCFCFA] dark:bg-[#1A1816]/95 border border-gray-200 dark:border-[#A68767]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm dark:shadow-[#A68767]/5 transition-transform duration-200 hover:scale-[1.01]">
                        <div className="space-y-4 text-left">
                            {/* <span className="text-[9px] font-bold text-primary bg-primary/15 border border-primary/25 px-2.5 py-1 rounded-full uppercase tracking-wider">Infrastructure</span> */}
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Secure API Infrastructure</h3>
                            <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-medium">
                                Protected endpoints utilizing JSON Web Token validation and Express middleware to prevent unauthorized data access.
                            </p>
                        </div>
                    </div>

                    {/* Bento Box 4 */}
                    <div className="md:col-span-2 bg-[#FCFCFA] dark:bg-[#1A1816]/95 border border-gray-200 dark:border-[#A68767]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm dark:shadow-[#A68767]/5 transition-transform duration-200 hover:scale-[1.01]">
                        <div className="space-y-4 text-left">
                            {/* <span className="text-[9px] font-bold text-primary bg-primary/15 border border-primary/25 px-2.5 py-1 rounded-full uppercase tracking-wider">Community showcase</span> */}
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Public Art & Prompt Gallery</h3>
                            <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-medium max-w-lg">
                                Easily publish your generated visual results along with your prompts directly to our public feed for sharing and creative inspiration.
                            </p>
                        </div>
                        <div className="mt-6 grid grid-cols-4 gap-2">
                            {dummyPublishedImages.slice(0, 4).map((img, i) => (
                                <img key={i} src={img.imageUrl} className="h-16 w-full object-cover rounded-xl border border-gray-200 dark:border-[#A68767]/20" alt="Published Art" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- INTERACTIVE PLAYGROUND SECTION --- */}
            <section id="playground" className="py-24 px-4 sm:px-12 lg:px-24 xl:px-40 bg-slate-50 dark:bg-[#000000]/10 border-y border-gray-200 dark:border-[#A68767]/25 w-full">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1 space-y-6 text-left w-full">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#FFB974]">Live Simulator</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Try the Credit Flow</h2>
                        <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-medium">
                            Interact with the model directly below. Watch how TopGPT executes your prompts and decrements your credits depending on the selected generation mode.
                        </p>
                        <div className="bg-white dark:bg-[#1E1B19]/90 rounded-2xl p-4 border border-gray-200 dark:border-[#A68767]/30 flex items-center justify-between w-max gap-8 shadow-sm">
                            <div>
                                <span className="text-[9px] uppercase font-bold text-gray-400">Playground Balance</span>
                                <div className="text-xl font-extrabold text-gray-900 dark:text-white">{balance} Cr</div>
                            </div>
                            <button onClick={handleReset} className="bg-[#2D2D2F] dark:bg-white text-white dark:text-black text-xs font-bold px-4 py-2.5 rounded-full hover:scale-103 transition-transform active:scale-98">
                                Reset Balance
                            </button>
                        </div>
                    </div>

                    {/* Interactive Sandbox Widget */}
                    <div className="flex-1 w-full bg-white dark:bg-[#1E1B19]/95 rounded-3xl border border-gray-200 dark:border-[#A68767]/35 p-5 shadow-xl dark:shadow-[#A68767]/5 flex flex-col gap-4 h-[380px] justify-between">
                        {/* Simulation Screen */}
                        <div className="flex-1 overflow-y-auto space-y-3.5 p-3 rounded-2xl bg-slate-50/50 dark:bg-zinc-950/60 border border-gray-200/50 dark:border-zinc-900/50 text-left text-xs">
                            {chatHistory.map((msg, i) => (
                                <div key={i} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <span className="text-[9px] uppercase font-bold text-gray-400">{msg.role === 'user' ? 'You' : 'TopGPT'}</span>
                                    {msg.type === 'image' ? (
                                        <img src={msg.content} className="w-40 h-28 object-cover rounded-xl border border-gray-200 dark:border-[#A68767]/20 mt-1 shadow-sm" alt="Mock Rendered Output" />
                                    ) : (
                                        <p className={`px-3.5 py-2.5 rounded-2xl border max-w-[85%] leading-relaxed dark:text-white ${
                                            msg.role === 'user'
                                                ? 'bg-slate-50 dark:bg-[#4A3728]/30 border-gray-200 dark:border-[#A68767]/30 text-gray-900'
                                                : 'bg-primary/20 dark:bg-[#4A3728]/30 border-primary/20 dark:border-[#A68767]/30 text-gray-950'
                                        }`}>
                                            {msg.content}
                                        </p>
                                    )}
                                </div>
                            ))}
                            {isGenerating && (
                                <div className="flex items-center gap-1.5 text-gray-400 font-bold tracking-wider animate-pulse uppercase text-[9px]">
                                    Generating response...
                                </div>
                            )}
                        </div>

                        {/* Input Form matching actual input styles */}
                        <form onSubmit={handleSimulate} className="flex flex-col gap-3">
                            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#A68767]/20 pb-2">
                                <span className="text-[10px] font-bold text-gray-400">Modality:</span>
                                <div className="flex gap-2">
                                    <button type="button" onClick={() => setMode("text")} className={`text-xs px-3 py-1 rounded-full font-bold transition-all ${mode === 'text' ? 'bg-[#2D2D2F] dark:bg-white text-white dark:text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                                        Text (1 Cr)
                                    </button>
                                    <button type="button" onClick={() => setMode("image")} className={`text-xs px-3 py-1 rounded-full font-bold transition-all ${mode === 'image' ? 'bg-[#2D2D2F] dark:bg-white text-white dark:text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                                        Image (2 Cr)
                                    </button>
                                </div>
                            </div>
                            
                            <div className='bg-primary/20 dark:bg-[#4A3728]/30 border border-primary dark:border-[#A68767]/30 rounded-full w-full p-2 pl-4 mx-auto flex gap-4 items-center text-left'>
                                <select onChange={(e)=>setMode(e.target.value)} value={mode} className='text-xs pl-3 pr-2 outline-none border-r border-primary/30 dark:border-[#A68767]/20 text-gray-700 dark:text-white bg-transparent'>
                                    <option className='dark:bg-[#4A3728]' value="text">Text</option>
                                    <option className='dark:bg-[#4A3728]' value="image">Image</option>
                                </select>
                                <input 
                                    type="text" 
                                    placeholder='Type prompt...'
                                    value={promptText}
                                    onChange={(e) => setPromptText(e.target.value)}
                                    className="flex-1 w-full text-xs outline-none bg-transparent dark:text-white"
                                    required
                                    disabled={isGenerating}
                                />
                                <button type="submit" disabled={isGenerating} className="m-0.5 shrink-0 bg-primary text-black p-2.5 rounded-full hover:scale-105 active:scale-95 transition-all">
                                    <img src={assets.send_icon} className='w-6 cursor-pointer' alt="Send" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* --- PRICING PACKAGES SECTION --- */}
            <section id="pricing" className="py-24 px-4 sm:px-12 lg:px-24 xl:px-40 bg-white dark:bg-black w-full text-gray-700 dark:text-white">
                <div className="text-center mb-16">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFB974] mb-3 inline-block">Pricing</span>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white font-bold">Transparent Pricing Packages</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {dummyPlans.map((plan) => (
                        <div key={plan._id} className="bg-[#FCFCFA] dark:bg-[#1A1816]/95 border border-gray-200 dark:border-[#A68767]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm dark:shadow-[#A68767]/5 transition-transform duration-200 hover:scale-[1.01] text-left">
                            <div className="space-y-4">
                                <span className="text-[10px] font-bold text-primary bg-primary/15 border border-primary/25 px-2.5 py-1 rounded-full uppercase tracking-wider">{plan.name} Plan</span>
                                <div className="mt-4 flex items-baseline text-gray-900 dark:text-white">
                                    <span className="text-3xl font-extrabold tracking-tight">${plan.price}</span>
                                    <span className="ml-1 text-xs text-gray-500">/one-time</span>
                                </div>
                                <p className="text-sm font-semibold text-emerald-500">{plan.credits} Credits Included</p>
                                <ul className="mt-6 space-y-3.5 border-t border-gray-100 dark:border-zinc-800/40 pt-6">
                                    {plan.features.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-xs text-gray-500 dark:text-zinc-400 font-medium">
                                            <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-8">
                                <Link to="/login" className="w-full text-center block bg-[#2D2D2F] dark:bg-white text-white dark:text-black py-3 rounded-xl font-bold text-xs hover:scale-[1.02] active:scale-98 transition-transform">
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- COMMUNITY IMAGE GALLERY PREVIEW --- */}
            <section id="community" className="py-24 px-4 sm:px-12 lg:px-24 xl:px-40 bg-slate-50 dark:bg-[#000000]/10 border-t border-gray-200 dark:border-[#A68767]/25 w-full text-gray-700 dark:text-white text-center">
                <div className="mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#FFB974] mb-3 inline-block">Art feed</span>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">Community Creations</h2>
                    <p className="mt-4 max-w-lg mx-auto text-sm text-gray-500 dark:text-zinc-400 font-medium">
                        Explore beautiful, high-fidelity photorealistic graphics and isometric mockups generated live by TopGPT creative developers.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {dummyPublishedImages.slice(0, 8).map((img, i) => (
                        <div key={i} className="group relative bg-[#FCFCFA] dark:bg-[#1A1816]/95 border border-gray-200 dark:border-[#A68767]/30 rounded-2xl overflow-hidden aspect-square shadow-sm dark:shadow-[#A68767]/5 transition-transform duration-200 hover:scale-[1.01]">
                            <img src={img.imageUrl} className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-75" alt="Community Artwork" loading="lazy" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-left opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-[10px] font-bold text-white uppercase tracking-wider">Prompt By</p>
                                <p className="text-xs font-bold text-primary">{img.userName}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12">
                    <Link to="/login" className="inline-flex items-center gap-2 bg-[#2D2D2F] dark:bg-white text-white dark:text-black font-semibold text-xs px-8 py-3 rounded-full hover:scale-103 transition-transform active:scale-98 shadow-md">
                        Join Community & View All
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Landing;