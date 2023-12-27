import React, { useContext } from 'react'
import { NewsContext } from '../context/NewsContext';
import paper from '../assets/newsPaper.jpeg';
import { FcLike } from 'react-icons/fc';
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import toast from 'react-hot-toast';

const StoreCard = ({img,url,desc,title}) => {
    const { remove,user,setUserData } = useContext(NewsContext);

    const clickHandler = async()=>{
        const docRef = doc(db, "jatin", user.uid);
        await updateDoc(docRef,{
            data:arrayRemove({
                    img:img,
                    title:title,
                    desc:desc,
                    link:url,
                })
            });
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
        remove(title);
        toast.error("Like Removed successful");
        // window.location.reload();
    }
    

  return (
    <div className='bg-gray-200 text-black my-5 rounded-t-xl rounded-b-xl pb-2 relative'>
            <img src={img && img || paper} className='w-full rounded-t-xl h-52' loading='lazy' />
            <div className='relative'>
                <p className='text-xl font-bold px-3 mt-3'> {title}  </p>
                <p className='text-lg text-opacity-5 px-3'>  {desc && desc.split(" ").slice(0,20).join(" ")+ '. . .  .'} </p>
                <p className='flex justify-center'>
                    <a href={url} target='_blank' className='bg-blue-500 text-white px-3 rounded-xl py-1 my-3 mx-auto' > Read More </a>
                    <p className='absolute cursor-pointer top-[-40px] text-5xl right-0'> 
                        <FcLike onClick={clickHandler} />  
                    </p>
                </p>
            </div>
        </div>
  )
}

export default StoreCard;