import {GET_CATEGORIAS} from "./Categoria";
const categoriaReducer = (state: any, action: any ) => {
    switch (action.type) {
        case GET_CATEGORIAS:
            return {...state, categorias: action.payload}    
        default:
            return state;
    }
} 

export default categoriaReducer;

