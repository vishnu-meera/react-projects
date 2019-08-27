const ROOT_URL  = `https://reduxblog.herokuapp.com/api`;
const Pkey      = `?key=ayaan0624`;
import axios from 'axios';

export const FETCH_POSTS    = 'fecth_posts'
export const FETCH_POST     = 'fecth_post'
export const CREATE_POST    = 'create_post'
export const DELETE_POST    = 'delete_post'

export function fecthPosts(){
    const request = axios.get(`${ROOT_URL}/posts${Pkey}`);
    return {
        type:FETCH_POSTS,
        payload:request
    }
}

export function createPost(values,cb){
    const request = axios.post(`${ROOT_URL}/posts${Pkey}`,values).then(()=>cb())
    return {
        type:CREATE_POST,
        payload:request
    }
}

export function fetchPost(id){
    const request = axios.get(`${ROOT_URL}/posts/${id}/${Pkey}`)
    return {
        type:FETCH_POST,
        payload:request
    }
}

export function deletePost(id,cb){
    const request = axios.delete(`${ROOT_URL}/posts/${id}/${Pkey}`).then(()=>cb())
    return {
        type:DELETE_POST,
        payload:request
    }
}