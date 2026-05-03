import React, { useState, Suspense } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import { assets } from './assets/assets'
import './assets/prism.css'
import Loading from './pages/Loading'
import { useAppContext } from './context/AppContext'
import { Toaster } from 'react-hot-toast'
import Title from './components/Title'
import Creator from './components/Creator'
import ContactUs from './components/ContactUs'

const Credits = React.lazy(() => import('./pages/Credits'))
const Community = React.lazy(() => import('./pages/Community'))
const Landing = React.lazy(() => import('./pages/Landing'))
const Header = React.lazy(() => import('./pages/Header'))
const Footer = React.lazy(() => import('./pages/Footer'))
const Login = React.lazy(() => import('./pages/Login'))

const App = () => {

  const {user, loadingUser} = useAppContext()

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {pathname} = useLocation();

  if(pathname === '/loading' || loadingUser) return <Loading />

  return (
    <>
    <Toaster />
    {!isMenuOpen && <img src={assets.menu_icon} className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert' alt="Menu Icon" onClick={()=>setIsMenuOpen(true)}/>}

      {user ? (
      <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>
        <div className='flex h-screen w-screen'>
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path='/' element={<ChatBox />}/>
              <Route path='/credits' element={<Credits />}/>
              <Route path='/community' element={<Community />}/>
            </Routes>
          </Suspense>
        </div>
      </div>
      ) : (
        // <div className='bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen'>
        <div className='dark:bg-black relative'>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path='/login' element={<Login />}/>
              <Route path='*' element={              
                <>
                  <Header />
                  <Landing />
                  <Title />
                  <Creator />
                  <ContactUs />
                  <Footer />
                </>
              }/>
            </Routes>
          </Suspense>
        </div>
      )}
      
    </>
  )
}

export default App