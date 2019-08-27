import React from 'react';
import MATRIX from './data/matrix';
import {useDynamicInterval} from './hooks';

const App = ()=>{
    const index = useDynamicInterval(MATRIX.length,100)

    return (<div className="Matrix">
        <img src={MATRIX[index]} alt="Matrix"/>
    </div>);
};

export default App;


