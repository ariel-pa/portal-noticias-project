import {GET_DEPARTAMENTOS} from "./Departamento";
const categoriaReducer = (state: any, action: any ) => {
    switch (action.type) {
        case GET_DEPARTAMENTOS:
            return {...state, departamentos: action.payload}    
        default:
            return state;
    }
} 

export default categoriaReducer;

