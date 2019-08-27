import React from 'react';
import {useFetch} from './hooks';

const Jokes = ()=>{
    
    const {setup,punchline} = useFetch('https://official-joke-api.appspot.com/jokes/random',{});

    return <div>
                <h3>Chali In English</h3>
                <p>{setup}</p>
                <p><em>{punchline}</em></p>
            </div>
};

export default Jokes;