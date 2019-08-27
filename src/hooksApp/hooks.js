import {useState, useEffect} from 'react';

export const fetchURL = async (url)=>{
    let storyResponse =  await fetch(url);
    let response = await storyResponse.json();
    return response;
};

export const useFetch = (url,initValue)=>{
    const [result,setResult] = useState(initValue);
    useEffect(()=>{
        fetch(url).then(res=>res.json())
            .then(json=>{
                setResult(json);
            });
    },[url]);
    return result;
};

export const useDynamicInterval = (length,delay=3000) =>{
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(()=>{
            setIndex((previousIndex)=>{
                return (previousIndex+1)%length;
            });
        },delay);
        
        return ()=>{
            clearInterval(interval);
        };
        
    }, [length,delay]);

    return index;
};