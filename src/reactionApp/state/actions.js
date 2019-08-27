import {NEW_MESSAGE,READ_MESSAGE} from './types';
import uuid from 'uuid';

export const newMessage = text =>({
    type: NEW_MESSAGE,
    item:{text, timeStamp: Date.now(), id:uuid()}
});

export const readMessages = ({messages}) =>({
    type: READ_MESSAGE,
    messages
});