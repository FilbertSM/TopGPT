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
            toast.success('Thank you for your submission!')
        } catch (err) {
            toast.error(error.message)
        }
    };

    return(
        <section id='contact-us' className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-20 text-gray-700 dark:text-white">
            {/* <Title title='Reach out to us' desc='Reach out today to discuss your project needs and start collaborating on something amazing!' /> */}
            <div className='relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white'>
                <h2 className='text-3xl sm:text-5xl font-medium'>Reach out to us</h2>
                <p className='max-w-lg text-center text-gray-500 dark:text-white/75 mb-6'>Reach out today to discuss your project needs and start collaborating on something amazing!</p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className='grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl w-full'>
                <div>
                    <p className='mb-2 text-sm font-medium'>Your Name</p>
                    <div className='flex pl-3 rounded-lg border border-gray-300 dark:border-gray-600'>
                        <img src={assets.person_icon} alt="Person Icon" />
                        <input name="name" type="text" placeholder='Enter your name' className='w-full p-3 text-sm outline-none' required/>
                    </div>
                </div>
                <div>
                    <p className='mb-2 text-sm font-medium'>Your Name</p>
                    <div className='flex pl-3 rounded-lg border border-gray-300 dark:border-gray-600'>
                        <img src={assets.email_icon} alt="Email Icon" />
                        <input name="email" type="email" placeholder='Enter your email' className='w-full p-3 text-sm outline-none' required/>
                    </div>
                </div>
                <div className='sm:col-span-2'>
                    <p className='mb-2 text-sm font-medium'>Message</p>
                    <textarea name="message" rows={8} placeholder='Enter your message' className='w-full p-3 text-sm outline-none rounded-lg border border-gray-300 dark:border-gray-600'/>
                </div>
                <button type="submit" className='w-max flex gap-2 bg-primary text-black text-md px-10 py-3 rounded-full cursor-pointer hover:scale-103 transition-all'>
                    Submit
                </button>
            </form>
        </section>
    )
}

export default ContactUs;