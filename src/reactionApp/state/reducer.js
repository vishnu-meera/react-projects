import {NEW_MESSAGE,READ_MESSAGE} from './types';

export const initState = {messages:[]};
const reducer = (state , action) => {
    switch (action.type) {
        case NEW_MESSAGE:
            return {
                ...state,
                messages:[...state.messages,action.item]
            };
        case READ_MESSAGE:
            return {
                messages:[...state.messages]
            };
        default: return state;
    }
};

export default reducer;
