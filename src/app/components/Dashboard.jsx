import React, { useContext } from 'react';
import Loader from './Loader';
import NewsCard from './NewsCard';
import Navbar from './Navbar';
import { NewsContext } from '../context/NewsContext';

const Dashboard = () => {
    const options = ['general','nation','business','entertainment','health','science','sports','technology'];
    const { loading , active , setActive , data } = useContext(NewsContext);

  return (
    <div className='mih-h-full'>
        <Navbar/>
        <div className='flex gap-10 justify-center mt-10 flex-wrap'>
            {
                options.map((option,index)=>{
                    return <p key={index} className={`${active === option ? 'bg-red-600 text-white':'text-black hover:text-white hover:shadow-lg bg-gray-400'} cursor-pointer capitalize px-4 py-2 rounded-lg duration-300`} onClick={()=>{setActive(option);}}> {option}   </p>
                })
            }
        </div>
        <div className='mt-10'>
            {
                loading ? <Loader/> : <div className='news-container'>
                    {
                        data && data.map((d,index)=>{   
                            return <NewsCard key={index} title={d.title} url={d.url} img={d.image} 
                                        desc={d.content || d.description} />
                        })
                    }
                </div>
            }
        </div>
    </div>
  )
}

export default Dashboard;