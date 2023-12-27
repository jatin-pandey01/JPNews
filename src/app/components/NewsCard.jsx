import {FcLike,FcLikePlaceholder} from 'react-icons/fc';
import toast from 'react-hot-toast';
import paper from '../assets/newsPaper.jpeg';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { NewsContext } from '../context/NewsContext';

const NewsCard = ({img,url,desc,title})=>{
    const {setAuth, setIsLoginAuth, add, remove, user, setUserData, userNews} = useContext(NewsContext); 
    const [like,setLike] = useState(false);

    useEffect(()=>{
        if(userNews){
            console.log(userNews);
            for(let i of userNews){
                console.log(i);
                if(i.title == title ){
                    console.log("True");
                    setLike(true);
                }
            }
        }
    },[]);

    const clickHandler = async()=>{
        if(user){
            setLike(!like);
            if(!like){
                const docRef = doc(db, "jatin", user.uid);
                await updateDoc(docRef,{
                    data:arrayUnion({
                        img:img,
                        title:title,
                        desc:desc,
                        link:url,
                    })
                });
                const docSnap = await getDoc(docRef);
                setUserData(docSnap.data());
                add({img:img,
                    title:title,
                    desc:desc,
                    link:url,});
                toast.success("Liked successfully");

                
            }
            else{
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
            }
        }
        else{
            setAuth(true);
            setIsLoginAuth(true);
            return;
        }
    }

    return(
        <div className='bg-gray-200 text-black my-5 rounded-t-xl rounded-b-xl pb-2 relative'>
            <img src={img && img || paper} className='w-full rounded-t-xl h-52' alt='Article' loading='lazy' />
            <div className='relative'>
                <p className='text-xl font-bold px-3 mt-3'> {title} </p>
                <p className='text-lg text-opacity-5 px-3'> { desc && desc.split(" ").slice(0,20).join(" ")+ '. . .  .'} </p>
                <p className='flex justify-center'>
                    <a href={url} target='_blank' className='bg-blue-500 text-white px-3 rounded-xl py-1 my-3 mx-auto' > Read More </a>
                    <p className='absolute cursor-pointer top-[-40px] text-5xl right-0'> 
                        {like ? <FcLike onClick={clickHandler} /> : <FcLikePlaceholder onClick={clickHandler} />} 
                    </p>
                </p>
            </div>
        </div>
    )
}

export default NewsCard;