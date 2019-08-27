import React from 'react';
import PICTURES from './data/pictures';
import {useDynamicInterval} from './hooks';

const App = ()=>{
    const index = useDynamicInterval(PICTURES.length)

    return (<div className="Gallery">
        <img src={PICTURES[index].image} alt="Gallery"/>
    </div>);
};

export default App;

