import { assets } from "../assets/assets"
import { useAppContext } from "../context/AppContext"


const ThemeToggleBtn = ({}) => {

    const { theme, setTheme } = useAppContext();

    return(
        <>
            <button>
                {theme === 'dark' ? (
                    <img onClickCapture={() => setTheme('light')} src={assets.sun_icon} className='size-8.5 p-1.5 border border-gray-500 rounded-full' alt="" />
                ) : (
                    <img onClickCapture={() => setTheme('dark')} src={assets.moon_icon} className='size-8.5 p-1.5 border border-gray-500 rounded-full' alt="" />
                )}
            </button>
        </>
    )
}

export default ThemeToggleBtn