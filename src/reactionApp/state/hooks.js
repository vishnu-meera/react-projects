import {useContext} from 'react';
import Context from "../Context";

export const useAppContext = ()=>(useContext(Context));