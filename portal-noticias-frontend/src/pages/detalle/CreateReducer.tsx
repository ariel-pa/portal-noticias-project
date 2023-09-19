import {GET_NOTICIA} from "./[id]";
const noticiaReducer = (state: any, action: any ) => {
    switch (action.type) {
        case GET_NOTICIA:
            return {...state, noticia: action.payload}    
        default:
            return state;
    }
} 

export default noticiaReducer;

