import { useRef, useState } from "react";
import { assets } from '../assets/assets';
import toast from "react-hot-toast";

const ContactUs = () => {
    const formRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);

    // Replace this with your Getform endpoint
    const GETFORM_ENDPOINT = "https://getform.io/f/axoyerlb";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        try {
            await fetch(GETFORM_ENDPOINT, {
                method: "POST",
                body: formData,
            });
            setSubmitted(true);
            formRef.current.reset();
            toast.success('Thank you for your submission!');
        } catch (err) {
            toast.error(err.message || "Failed to submit form.");
        }
    };

    return(
        <section id='contact-us' className="flex flex-col items-center gap-6 px-4 sm:px-12 lg:px-24 xl:px-40 py-20 text-gray-700 dark:text-white bg-slate-50/20 dark:bg-black/10 w-full">
            <div className='flex flex-col items-center gap-3 text-center mb-8'>
                <h2 className='text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white'>Reach out to us</h2>
                <p className='max-w-lg text-sm sm:text-base text-gray-500 dark:text-zinc-400 font-medium'>Reach out today to discuss your project needs and start collaborating on something amazing!</p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className='grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl w-full text-left'>
                <div className="flex flex-col gap-2">
                    <label className='text-xs font-bold uppercase tracking-wider text-gray-400'>Your Name</label>
                    <div className='flex items-center gap-2 pl-3.5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 focus-within:border-primary/80 focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden'>
                        <img src={assets.person_icon} className="w-4 h-4 opacity-50" alt="Person Icon" />
                        <input name="name" type="text" placeholder='Enter your name' className='w-full p-3.5 text-xs outline-none bg-transparent dark:text-white' required/>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className='text-xs font-bold uppercase tracking-wider text-gray-400'>Your Email</label>
                    <div className='flex items-center gap-2 pl-3.5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 focus-within:border-primary/80 focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden'>
                        <img src={assets.email_icon} className="w-4 h-4 opacity-50" alt="Email Icon" />
                        <input name="email" type="email" placeholder='Enter your email' className='w-full p-3.5 text-xs outline-none bg-transparent dark:text-white' required/>
                    </div>
                </div>
                <div className='sm:col-span-2 flex flex-col gap-2'>
                    <label className='text-xs font-bold uppercase tracking-wider text-gray-400'>Message</label>
                    <div className='rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 focus-within:border-primary/80 focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden'>
                        <textarea name="message" rows={6} placeholder='Enter your message' className='w-full p-4 text-xs outline-none bg-transparent dark:text-white resize-none' required/>
                    </div>
                </div>
                <div className="sm:col-span-2 flex justify-start">
                    <button type="submit" className='bg-primary text-black font-semibold text-sm px-10 py-3 rounded-full cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-md'>
                        Submit Message
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ContactUs;