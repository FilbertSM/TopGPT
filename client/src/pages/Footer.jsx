import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { premiumScroll } from "../utils/scroll";

const Footer = () => {

    const { theme } = useAppContext();

    return(
        <footer className='bg-slate-50 dark:bg-[#0F0E0E] pt-10 sm:pt-10 mt-20 sm:mt-40 px-4 sm:px-10 lg:px-24 xl:px-40'>
            {/* Footer Top */}
            <div className='flex justify-between lg:items-center max-lg:flex-col gap-10'>
                <div className='space-y-5 text-sm text-gray-700 dark:text-white'>
                    <img src={theme === 'dark' ? assets.title_logo : assets.title_logo_dark} className='w-32 sm:w-44' alt="TopGPT Logo Footer" loading="lazy" />
                    <p className='max-w-md'>From strategy to execution, we craft digital solutions that move your business forward.</p>

                    <ul className='flex gap-8'>
                        <li><a href="#home" onClick={(e) => premiumScroll(e, "home")} className='hover:text-primary'>Home</a></li>
                        <li><a href="#features" onClick={(e) => premiumScroll(e, "features")} className='hover:text-primary'>Capabilities</a></li>
                        <li><a href="#playground" onClick={(e) => premiumScroll(e, "playground")} className='hover:text-primary'>Simulator</a></li>
                        <li><a href="#pricing" onClick={(e) => premiumScroll(e, "pricing")} className='hover:text-primary'>Pricing</a></li>
                        <li><a href="#community" onClick={(e) => premiumScroll(e, "community")} className='hover:text-primary'>Art Feed</a></li>
                        <li><a href="#creator" onClick={(e) => premiumScroll(e, "creator")} className='hover:text-primary'>Creator</a></li>                    
                        <li><a href="#contact-us" onClick={(e) => premiumScroll(e, "contact-us")} className='hover:text-primary'>Contact Us</a></li>                        
                    </ul>
                </div>
            </div>
            <hr className='border-gray-300 dark:border-gray-600 my-6'/>

            {/* Footer Bottom */}
            <div className='pb-6 text-sm text-gray-500 flex justify-center sm:justify-between gap-4 flex-wrap'>
                <p>Copyright 2025 &copy; FilbertSM - All Right Reserved.</p>
                <div className='flex items-center justify-between gap-4'>
                    <a href="https://github.com/FilbertSM" target="_blank" rel="noopener noreferrer">
                        <img src={assets.github_icon} className='w-6 hover:scale-110 transition-all' alt="TopGPT Creator GitHub Profile" loading="lazy" />
                    </a>
                    <a href="https://linkedin.com/in/filbert-sembiring-meliala/" target="_blank" rel="noopener noreferrer">
                        <img src={assets.linkedin_icon} className='hover:scale-110 transition-all' alt="TopGPT Creator LinkedIn Profile" loading="lazy" />
                    </a>
                    <a href="https://www.instagram.com/filbertt_sm/" target="_blank" rel="noopener noreferrer">
                        <img src={assets.instagram_icon} className='hover:scale-110 transition-all' alt="TopGPT Creator Instagram Profile" loading="lazy" />
                    </a>                
                </div>
            </div>
        </footer>
    )
}

export default Footer;