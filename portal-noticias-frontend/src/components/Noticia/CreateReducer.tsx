import {GET_NOTICIAS} from "./Noticia";
const noticiaReducer = (state: any, action: any ) => {
    switch (action.type) {
        case GET_NOTICIAS:
            return {...state, noticias: action.payload}    
        default:
            return state;
    }
} 

export default noticiaReducer;

