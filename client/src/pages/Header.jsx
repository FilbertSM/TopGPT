import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import ThemeToggleBtn from '../components/ThemeToggleBtn'
import { premiumScroll } from '../utils/scroll'

const Header = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    
    const { theme } = useAppContext()
    const { pathname } = useLocation()

    return(
        <header className='flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium bg-white/50 dark:bg-[#0F0E0E]/70'>

            <img src={theme === 'dark' ? assets.title_logo : assets.title_logo_dark} className='w-32 sm:w-40' alt="TopGPT Branding Logo" />

            <nav className={`text-gray-700 dark:text-white sm:text-sm ${!sidebarOpen ? 'max-sm:w-0 overflow-hidden' : 'max-sm:w-60 max-sm:pl-10'} max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-black max-sm:text-white max-sm:pt-20 flex sm:items-center gap-5 transition-all`}>

                <img src={assets.close_icon} className='w-5 absolute right-4 top-4 sm:hidden' aria-label="Close navigation" onClick={() => setSidebarOpen(false)}/>
                
                <a href="#" onClick={(e) => { setSidebarOpen(false); premiumScroll(e, "home"); }} className='sm:hover:border-b'>Home</a>
                <a href="#features" onClick={(e) => { setSidebarOpen(false); premiumScroll(e, "features"); }} className='sm:hover:border-b'>Capabilities</a>
                <a href="#playground" onClick={(e) => { setSidebarOpen(false); premiumScroll(e, "playground"); }} className='sm:hover:border-b'>Simulator</a>
                <a href="#pricing" onClick={(e) => { setSidebarOpen(false); premiumScroll(e, "pricing"); }} className='sm:hover:border-b'>Pricing</a>
                <a href="#community" onClick={(e) => { setSidebarOpen(false); premiumScroll(e, "community"); }} className='sm:hover:border-b'>Art Feed</a>
                <a href="#creator" onClick={(e) => { setSidebarOpen(false); premiumScroll(e, "creator"); }} className='sm:hover:border-b'>Creator</a>
                <a href="#contact-us" onClick={(e) => { setSidebarOpen(false); premiumScroll(e, "contact-us"); }} className='sm:hover:border-b'>Contact Us</a>
                <Link to="/login" className='mt-auto mb-8 min-sm:hidden text-sm flex items-center gap-2 bg-primary text-black py-2 rounded-full cursor-pointer hover:scale-103 transition-all w-full -translate-x-4 justify-center'>Try TopGPT</Link>
            </nav>

            <div className='flex items-center gap-2 sm:gap-4'>
                <ThemeToggleBtn />

                <img src={theme === 'dark' ? assets.menu_icon_darkh : assets.menu_iconh} alt="Mobile Menu Icon" onClick={() => setSidebarOpen(true)} className='w-8 sm:hidden'/>

                <Link to="/login" className='text-sm max-sm:hidden flex items-center gap-2 bg-primary text-black px-6 py-2 rounded-full cursor-pointer hover:scale-103 transition-all'>Try TopGPT</Link>
            </div>

        </header>
    )
}

export default Header