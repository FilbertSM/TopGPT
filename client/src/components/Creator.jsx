import { assets } from "../assets/assets"


const Creator = () => {
    return(
        <section id='creator' className='flex flex-col items-center gap-6 py-20 px-24 sm:px-48 lg:px-48 xl:px-48 text-center max-w-2xl mx-auto overflow-hidden'>
            <a href="https://linkedin.com/in/filbert-sembiring-meliala/" className="group relative block bg-black rounded-2xl" target='_blank' rel='noopener noreferrer'>
            <img alt="Portrait of Filbert Sembiring Meliala, the creator and developer of TopGPT" src={assets.hero_profile_img} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50 rounded-2xl" />

            <div className="relative p-4 sm:p-6 lg:p-8">
                <p className="text-sm font-bold tracking-widest text-primary uppercase">Developer</p>

                <p className="text-xl font-bold text-white sm:text-2xl">Filbert SM</p>

                <div className="mt-32 sm:mt-48 lg:mt-64">
                    <div className="transform translate-y-0 opacity-100 transition-all sm:translate-y-8 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                        <p className="text-sm text-white">
                        "If you're not prepared to be wrong, you'll never come up with anything original."<br />— Robert Greene
                        </p>
                    </div>
                </div>
            </div>
            </a>
        </section>
    )
}

export default Creator