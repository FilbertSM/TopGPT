import { assets } from "../assets/assets"


const Creator = () => {
    return(
        <div id='creator' className='flex flex-col items-center gap-6 py-20 px-4 sm:px-12 lg:px-20 xl:px-40 text-center max-w-2xl mx-auto overflow-hidden'>
            <a href="https://linkedin.com/in/filbert-sembiring-meliala/" className="group relative block bg-black rounded-2xl" target='_blank' rel='noopener noreferrer'>
            <img alt="" src={assets.hero_profile_img} className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50 rounded-2xl" />

            <div className="relative p-4 sm:p-6 lg:p-8">
                <p className="text-sm font-bold tracking-widest text-primary uppercase">Developer</p>

                <p className="text-xl font-bold text-white sm:text-2xl">Filbert SM</p>

                <div className="mt-32 sm:mt-48 lg:mt-64">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm text-white">
                    "If you're not prepared to be wrong, you'll never come up with anything original."<br />— Robert Greene
                    </p>
                </div>
                </div>
            </div>
            </a>
        </div>
    )
}

export default Creator