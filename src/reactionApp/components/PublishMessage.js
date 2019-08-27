import React , {useState} from 'react';
import {newMessage} from '../state/actions'
import {useAppContext} from '../state/hooks';

const PublishMessage = ()=>{
    const {dispatch} = useAppContext();
    const [text, setText] = useState("");

    const updateText = e => setText(e.target.value);

    const publishMessage = ()=>{
        dispatch(newMessage(text));
        setText("");
    };

    const publishMessageKeyPress = e => (e.key ==="Enter" ? publishMessage():null);

    return (<div>
        <h3>Got something to say !!!</h3>
        <input value={text} onChange={updateText} onKeyPress={publishMessageKeyPress}/>
        <button onClick={publishMessage}>Publish It!</button>
    </div>);
};

export default PublishMessage;