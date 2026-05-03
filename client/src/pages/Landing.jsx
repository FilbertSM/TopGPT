import { assets } from "../assets/assets"
import { useAppContext } from "../context/AppContext"
import { Link } from "react-router-dom"
import SEO from "../components/SEO"

const Landing = () => {

    const { theme } = useAppContext();

    return(
        <>
        <SEO 
            title="TopGPT | The Next Generation AI Assistant" 
            description="TopGPT is a next generation AI assistant built by Filbert Sembiring Meliala to be safe, accurate, and secure to help you do your best work." 
            url="https://topgpt-chi.vercel.app" 
        />
        <main id='home' className='flex flex-col items-center gap-6 py-20 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden text-gray-700 dark:text-white'>
            
            <h1 className='text-4xl sm:text-5xl md:text-6xl xl:text-[84px] font-medium xl:leading-[95px] max-w-5xl'>Unify AI Power <span className='bg-gradient-to-r from-[#FFB974] to-[#F5D3AD] bg-clip-text text-transparent'>TopGPT</span></h1>

            <p className='text-sm sm:text-lg font-medium text-gray-500 dark:text-white/75 max-w-4/5 sm:max-w-lg'>TopGPT is a next generation AI assistant built by<br /> <a href="https://filbertsm.vercel.app/" target='_blank' rel='noopener noreferrer' className='sm:hover:border-b inline-block transform transition-transform duration-200 ease-out hover:scale-100'>Filbert Sembiring Meliala</a> to be safe, accurate, and secure to help you do your best work.</p>

            <Link to="/login" className='text-sm sm:text-md md:text-lg xl:text-xl font-medium flex items-center bg-primary text-black px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2 md:py-3 rounded-full cursor-pointer hover:scale-103 transition-all'>Try TopGPT</Link>

            <div className='relative'>
                <img src={assets.hero_img} className={`w-full max-w-6xl rounded-2xl shadow-lg ${theme === 'dark' ? 'shadow-white/50' : 'shadow-black/50'}`} alt="TopGPT Dashboard Interface - Next Generation AI Assistant" priority="true" />
            </div>

        </main>
        </>
    )
}

export default Landing