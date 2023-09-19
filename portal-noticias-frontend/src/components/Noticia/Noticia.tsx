import Link from 'next/link';
import { useReducer, useEffect, useContext, createContext } from 'react';
import styleNoticia from "./noticia.module.css";
import axiosFetch from "../../services/axios";
import noticiaReducer from "./CreateReducer";
import NoticiasList from './NoticiasList'


export const GET_NOTICIAS = "GET_NOTICIAS"; 

export default function Noticia() {
    const inicialState = {
        noticias: [], 
    };
    const [state, dispatch] = useReducer(noticiaReducer, inicialState);
    const noticiaContext = createContext(state);
    const {noticias} = useContext(noticiaContext);    

    useEffect(()=> {
        const getNoticias =  async () => {
            const {data} = await axiosFetch('noticias');
            if(Object.keys(data).length !==0){
                dispatch({
                    type: GET_NOTICIAS,
                    payload: data,
                })
            }                 
        }
        getNoticias();
    },[]);
    
    // console.log(noticias);
    
    return (
        <div>
            <h1>Noticias</h1>
            <div className={styleNoticia.items}>
            {noticias.length !==0 ?  noticias.map((item: any) => <NoticiasList key={item.id} item={item}  showAs="Default"/> ): null}
            </div>
            
        </div>
    );
}

