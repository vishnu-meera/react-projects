import React, {useState, useEffect} from 'react';
import {useFetch,fetchURL} from './hooks';

const HackerStories = ()=>{
    const limit = 10;
    const [stories, setStories] = useState([]);
    const  storiesIdArray = useFetch('https://hacker-news.firebaseio.com/v0/topstories.json',[]);

    useEffect(()=>{        
        if(storiesIdArray.length>0)   
            Promise.all(storiesIdArray.slice(0,limit).map(x=>{
                return fetchURL(`https://hacker-news.firebaseio.com/v0/item/${x}.json`);
            })).then(responeArray=>{
                console.log("finsih :", responeArray);
                setStories(responeArray);
            });
    },[storiesIdArray]);

    return <div>
                <h3>Hacker News</h3>
                {
                    stories.map(story=>{
                        const {id,by,time,title,url} = story;
                        return <div key={id}>
                            <a href={url}>{title}</a>
                            <div>{by} - {new Date(time*1000).toLocaleString()}</div>
                        </div>
                    })
                }
            </div>
};

export default HackerStories;