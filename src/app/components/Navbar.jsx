import React, { useContext } from 'react'
import Login from './Login';
import Register from './Register';
import { FaStore } from "react-icons/fa";
import { NewsContext } from '../context/NewsContext';
import { useRouter } from 'next/navigation';

const Navbar = ({}) => {
    const Router = useRouter();
    const { auth , setAuth ,
            user , userData ,
            isLoginAuth , setIsLoginAuth ,logout } = useContext(NewsContext);
    
  return (
    <div className=' w-full bg-blue-400 py-3'>
        {
            !user ? (
                <div className='flex justify-around items-center'>
                    <p className=' text-3xl font-bold'> JPNews </p>
                    <div> 
                        {
                            !auth ? 
                                <div>
                                    <button onClick={()=>{setAuth(true); setIsLoginAuth(true);}} className='text-xl text-white font-bold hover:bg-opacity-80 bg-slate-700 rounded-lg
                                        px-3 py-1' > Login </button>
                                </div> :  
                                <div className='flex justify-center items-center'>
                                    {   
                                        isLoginAuth ? 
                                            <div> <Login /> </div> : 
                                            <div> <Register /> </div>
                                    }
                                </div>                
                        }
                    </div>
                </div>
            ):(
                <div>
                    <div className='flex items-center justify-between sm:justify-around sm:px-0 px-5'>
                        <p className='cursor-pointer' onClick={()=>{Router.push("/")}}> Hey <span className='text-xl'> { userData?.name?.split(" ")[0]}</span></p> 
                        <p className=' text-3xl font-bold hidden sm:flex'> JPNews </p>
                        <div className='flex items-center gap-5'>
                            <p className='text-xl cursor-pointer font-bold' onClick={()=>{Router.push("/store")}}><FaStore/></p>
                            <p onClick={logout} className='text-lg px-2 py-1 rounded-md bg-red-600 hover:bg-opacity-80 cursor-pointer'> Logout </p>   
                        </div>                        
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Navbar;