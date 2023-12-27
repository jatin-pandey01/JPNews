"use client"
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "../firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import axios from "axios";

export const NewsContext = createContext();

function NewsContextProvider(props){
    const children = props.children;
    const [loading,setLoading] = useState(false); //Done
    const [user,setUser] = useState(null); //Done
    const [userData,setUserData] = useState([]); //Done
    const [userNews,setUserNews] = useState([]);
    const [data,setData] = useState([]); //Done
    const [like,setLike] = useState(false); 
    const [auth,setAuth] = useState(false); //Done
    const [isLoginAuth,setIsLoginAuth] = useState(true); //Done
    const [active,setActive] = useState("general"); //Done

    const getNews = async()=>{
        try {
            setData([]);
            setLoading(true);
            const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${active}&apiKey=e1b060327fa8467997a5dbc212e9112f`);
            // console.log(res.data.articles);
            setLoading(false);
            setData(res.data.articles);
        } 
        catch (error) {
            alert('Sorry!!, please try again.');
            console.log(error);
        }
    }  

    const logout = async() => {
        try {
          await signOut();
          setUser(null);
          setUserData([]);
          setAuth(false);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
    }

    const add = (d)=>{
        const dn = userNews;
        dn.push(d);
        setUserNews(dn);
    }

    const remove = (d)=>{
        const dn = userNews.filter((news) => news.title !== d);
        return setUserNews(dn);
    }
    
    const value = {
        loading , setLoading ,
        user , setUser ,
        userData , setUserData ,
        data , setData ,
        like , setLike ,
        auth , setAuth ,
        isLoginAuth , setIsLoginAuth ,
        active , setActive ,
        getNews, logout, 
        userNews, add, remove
    };

    

    useEffect(()=>{
        getNews();
        onAuthStateChanged(async(user)=>{
            if(user){
                setLoading(true);
                setUser(user);
                const docRef = doc(db,"jatin",user.uid);
                const docSnap = await getDoc(docRef);
                setUserData(docSnap.data());
                setUserNews(docSnap.data()?.data);
                // console.log("User Data => ",docSnap.data());
                setLoading(false);
            }
        })
    },[active,like]);

    return <NewsContext.Provider value={value}>
        {children}
    </NewsContext.Provider>
}

export default NewsContextProvider;