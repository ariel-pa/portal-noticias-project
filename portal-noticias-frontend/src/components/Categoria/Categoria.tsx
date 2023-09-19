import Link from 'next/link';
import { useReducer, useEffect, useState, useContext, createContext } from 'react';
import style from "./categoria.module.css";
import axiosFetch from "../../services/axios";
import categoriaReducer from "./CreateReducer";


export const GET_CATEGORIAS = "GET_CATEGORIAS"; 

export default function Categoria() {
    const inicialState = {
        categorias: [], 
    };
    const [state, dispatch] = useReducer(categoriaReducer, inicialState);
    const categoriaContext = createContext(state);

    const {categorias} = useContext(categoriaContext);

    useEffect(()=> {
        const getCategorias =  async () => {
            const {data} = await axiosFetch('categorias');
            if(Object.keys(data).length !==0){
                dispatch({
                    type: GET_CATEGORIAS,
                    payload: data,
                })
            }                 
        }
        getCategorias();
    },[]);

    return (
        <nav className={style.categoria}>
            {categorias.length !== 0 ? categorias.map((item: any)=> 
                <div key={item.id}>
                    <Link href="/">
                        <p className={style.link}>{item.nombre}</p>
                    </Link>
                </div> ) : null}
        </nav>
    );
}
