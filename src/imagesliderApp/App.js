import React , {useState,useEffect} from 'react';
import './imageSlider.css';
import {acessKey} from './appSettings';

const APP = ()=>{

    const [imageObjs,setImageObjs] = useState([]);
    const [loading,setLoading] = useState(true);
    const [movement,setMovement] = useState(0);

    useEffect(() => {
        getImages();
        // const interval = setInterval(()=>{
        //     if(movement<imageObjs.length-1) setMovement(move);
        // },5000);
    }, [])

 

    const getImages = async ()=>{
        let jsonObjects = await fetch(`https://api.unsplash.com/photos/?client_id=${acessKey}`);
        jsonObjects = await jsonObjects.json();

        let urlObjects = [];
        if(Array.isArray(jsonObjects) && jsonObjects.length>0){
            urlObjects = jsonObjects.map(jsonObject=>{
                return {
                    url : jsonObject.urls["regular"],
                    desc: jsonObject.alt_description
                };
            });

        }
        setImageObjs(urlObjects);
        setLoading(false);
        
    };

    const onArrowClick = (e,DIRECTION)=>{
        e.preventDefault();
        
        if(DIRECTION ==="RIGHT") {
            let move = movement + 1;
            if(movement<imageObjs.length-1) setMovement(move);

        }else{
            let move = movement - 1;
            if(movement > 0) setMovement(move);
        }

    };

    const onBubleClick = (e,keyMove)=>{
        e.preventDefault();
        setMovement(keyMove)
    };

    const dots = ()=>{
        return(<>
            {
                imageObjs.map((obj,key)=><span
                    onClick={(e)=>onBubleClick(e,key)} 
                    className = {movement===key?"dots active":"dots"}
                    key={key}></span>)
            }
        </>)
    };

    return (
        <div className="galaryContainer">
            <div className="slideShowContainer">
                {!loading?
                    <>
                        <div className="leftArrow"  onClick={(e)=>onArrowClick(e,"LEFT")}><span className="arrow arrowLeft"></span></div>
                        <div className="rightArrow" onClick={(e)=>onArrowClick(e,"RIGHT")}><span className="arrow arrowRight"></span></div>
                        <div  className="imageHolder" >
                            <img src={imageObjs[movement] &&imageObjs[movement].url} alt={imageObjs[movement]&&imageObjs[movement].desc}/>
                        </div>
                    </>:
                    <div>Loading...</div>
                }
            </div>
            <div id="dotsContainer">
                {
                   dots() 
                }
            </div>
        </div>
    );
};

export default APP;