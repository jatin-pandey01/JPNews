"use client"
import React, { useContext, useEffect } from 'react'
import { onAuthStateChanged } from '../firebase/auth';
import NewsCard from '../components/NewsCard';
import { NewsContext } from '../context/NewsContext';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import { useRouter } from 'next/navigation';
import StoreCard from '../components/StoreCard';

const page = () => {
    const {loader,userNews} = useContext(NewsContext);
    const Router = useRouter();
    useEffect(()=>{
        onAuthStateChanged(async(user)=>{
            if(!user){
                Router.back();
            }
        })
    })
  return (
    <div className='background min-h-screen relative'>
        <Navbar />
        <div>
            {
                loader ? <Loader/> : <div>
                    {
                        userNews.length === 0 ? <div className='text-white flex justify-center items-center'> <p className='absolute top-1/2 bottom-1/2 text-2xl font-bold'>Sorry!!!! No Articles</p> </div> :
                        <div className='news-container'>
                        {
                            userNews.map((d,index)=>{
                                return <StoreCard key={index} title={d.title} url={d.link} img={d.img} 
                                            desc={d.desc} />
                            })
                        }
                        </div>
                    }
                    </div>
            }
        </div>
    </div>
  )
}

export default page