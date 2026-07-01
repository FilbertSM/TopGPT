import { assets } from "../assets/assets"

const Creator = () => {
    return(
        <section id='creator' className='flex flex-col items-center gap-6 pb-20 px-4 max-w-lg mx-auto overflow-hidden bg-slate-50/20 dark:bg-black/10 w-full'>
            <a href="https://linkedin.com/in/filbert-sembiring-meliala/" className="group relative block bg-black rounded-3xl shadow-xl w-full h-[380px] overflow-hidden border border-gray-200/40 dark:border-zinc-800 hover:scale-[1.01] active:scale-[0.98] transition-all" target='_blank' rel='noopener noreferrer'>
                <img alt="Portrait of Filbert Sembiring Meliala, the creator and developer of TopGPT" src={assets.hero_profile_img} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-45" />

                <div className="relative p-6 sm:p-8 flex flex-col justify-between h-full text-left">
                    <div>
                        <span className="text-[10px] font-extrabold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">Developer</span>
                        <h3 className="text-2xl font-bold text-white mt-4">Filbert SM</h3>
                    </div>

                    <div className="transform translate-y-0 opacity-100 transition-all sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                        <p className="text-xs sm:text-sm text-white/90 leading-relaxed italic font-medium">
                            "If you're not prepared to be wrong, you'll never come up with anything original."<br />— Robert Greene
                        </p>
                    </div>
                </div>
            </a>
        </section>
    )
}

export default Creator