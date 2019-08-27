import React,{useState} from 'react';
import Jokes from './Jokes';
import Stories from './Stories';
import Tasks from './Tasks';
import Gallery from './Gallery';
import Matrix from './Matrix';

const App = ()=> {
  const [userQ,setQ] = useState("");
  const [showGallery,setShowGallery] = useState(true);

  const updateQ = (event)=>{
    setQ(event.target.value);
    console.log("Query Value : ", userQ);
  };

  const searchQ = ()=>{
    window.open(`https://google.com/search?q=${userQ}`,'_blank');
  };

  const handleKeyPress = event =>{
    if(event.key === "Enter") searchQ();
  };

  const updateGallery = ()=>setShowGallery(!showGallery);

  return (
    <div className="App">
        <h1>Home</h1>
        <div className="form">
            <input value={userQ} onChange={updateQ} onKeyPress={handleKeyPress}/>
            <button onClick={searchQ}>Search</button>
        </div>
        <hr/>
        <Jokes/>
        <hr/>
        <Tasks/>
        <hr/>
          <div>
            {
              showGallery?<Gallery/>:null
            }
            <button onClick={updateGallery}>{showGallery?'Hide':'Show'} Gallery</button>
          </div>
        <hr/>
        <Matrix/>
        <hr/>
        <Stories/>
    </div>
  );
}

export default App;
