import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";


const Footer = () => {

    const { theme } = useAppContext();

    return(
        <div className='bg-slate-50 dark:bg-[#0F0E0E] pt-10 sm:pt-10 mt-20 sm:mt-40 px-4 sm:px-10 lg:px-24 xl:px-40'>
            {/* Footer Top */}
            <div className='flex justify-between lg:items-center max-lg:flex-col gap-10'>
                <div className='space-y-5 text-sm text-gray-700 dark:text-white'>
                    <img src={theme === 'dark' ? assets.title_logo : assets.title_logo_dark} className='w-32 sm:w-44' alt="" />
                    <p className='max-w-md'>From strategy to execution, we craft digital solutions that move your business forward.</p>

                    <ul className='flex gap-8'>
                        <li><a href="#home" className='hover:text-primary'>Home</a></li>
                        <li><a href="#creator" className='hover:text-primary'>Creator</a></li>                    
                        <li><a href="#contact-us" className='hover:text-primary'>Contact Us</a></li>                        
                    </ul>
                </div>
                {/* Right Side - Email Subscription */}
                {/* <div className='text-gray-600 dark:text-white'>
                    <h3 className='font-semibold'>Social Media</h3>                    
                    <p className='text-sm mt-2 mb-6'>The latest news, articles, and resources, sent to your inbox weekly.</p>
                    <div className='flex gap-2 text-sm'>
                        <input type="email" placeholder='Enter your email' className='w-full p-3 text-sm outline-none rounded dark:text-gray-200 bg-transparent border border-gray-300 dark:border-gray-500' />
                        <button className='bg-primary text-black rounded px-6'>Subscribe</button>
                    </div>
                </div> */}
            </div>
            <hr className='border-gray-300 dark:border-gray-600 my-6'/>

            {/* Footer Bottom */}
            <div className='pb-6 text-sm text-gray-500 flex justify-center sm:justify-between gap-4 flex-wrap'>
                <p>Copyright 2025 &copy; FilbertSM - All Right Reserved.</p>
                <div className='flex items-center justify-between gap-4'>
                    <a href="https://github.com/FilbertSM" target="_blank" rel="noopener noreferrer">
                        <img src={assets.github_icon} className='w-6 hover:scale-110 transition-all' alt="GitHub" />
                    </a>
                    <a href="https://linkedin.com/in/filbert-sembiring-meliala/" target="_blank" rel="noopener noreferrer">
                        <img src={assets.linkedin_icon} className='hover:scale-110 transition-all' alt="LinkedIn" />
                    </a>
                    <a href="https://www.instagram.com/filbertt_sm/" target="_blank" rel="noopener noreferrer">
                        <img src={assets.instagram_icon} className='hover:scale-110 transition-all' alt="" />
                    </a>                
                </div>
            </div>

            {/* <ul className="">
                        <li>
                            <a href="https://github.com/FilbertSM" target="_blank" rel="noopener noreferrer" className="hover:text-primary">GitHub</a>
                        </li>
                        <li>
                            <a href="https://linkedin.com/in/filbert-sembiring-meliala/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn</a>
                        </li>                    
                        <li>
                            <a href="https://www.instagram.com/filbertt_sm/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Instagram</a>
                        </li>
                    </ul> */}
        </div>
    )
}

export default Footer;