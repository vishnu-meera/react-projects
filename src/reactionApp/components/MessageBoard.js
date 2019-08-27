import React from 'react';
import {useAppContext} from '../state/hooks'

const MessageBoard = ()=>{
    const {state:{messages}} =  useAppContext();
    return (<div>
        <h4>Messages</h4>
        {
            messages.map(message=>{
                return <div key={message.id}>
                <h5>{new Date(message.timeStamp).toLocaleString()}</h5>
                <p>{message.text}</p>
                <hr/>
                </div>
            })
        }
    </div>)
};

export default MessageBoard;
