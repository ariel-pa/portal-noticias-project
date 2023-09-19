import Categoria from "@/components/Categoria/Categoria";
import styles from '@/styles/Home.module.css'
import Link from "next/link";
import { useRouter } from "next/router";
import axiosFetch from "../../services/axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import noticiaReducer from "./CreateReducer";
import axios from "axios";


export const GET_NOTICIA = "GET_NOTICIA"; 

export default function noticia(){
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    const inicialState = {
      noticia: [], 
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useReducer(noticiaReducer, inicialState);
  const noticiaContext = createContext(state);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {noticia} = useContext(noticiaContext);

  
  const id = Number(router.query.id);   
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=> {
      const getNoticias =  async () => {  
        
        if(id){
          const {data }= await axios.get(`http://localhost:3000/noticias/${Number(id)}`);
          // console.log(data);          
          if(Object.keys(data).length !==0){
            dispatch({
                type: GET_NOTICIA,
                payload: data,
            })
          }
        }                            
      }
      getNoticias();
    },[]);
    
    return  (
    <>
      <Categoria/>
      <main className={styles.baneer}>
        <div>
          {noticia.length !== 0 ? <div>{noticia.id}</div> : null}        
        </div>
      </main>
    
    </>
    )
}