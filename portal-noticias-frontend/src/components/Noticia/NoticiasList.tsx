import Image from "next/image";
import Link from "next/link";
import styleNoticia from "./noticia.module.css";
// import {useRouteMatch } from 'react;
import { use, useEffect, useState } from "react";
import axios from "axios";
import fs from "fs";
import axiosFetch from "@/services/axios";


export default function NoticiaList(props: {item: any, showAs:any}) {  

    console.log(props.item.imagen);
    

    const img = "/img/2023-03-16 10-10-46.png";
    const [imagen, setImagen] = useState([]);

    useEffect(()=> {
        const getNoticias =  async () => {
            const {data} = await axiosFetch(`noticias/imagen/${props.item.imagen}`);
            setImagen(data);
             
        }
        getNoticias();
    },[]);
    
    return (
        <div className={styleNoticia.item}>
            <div>
                <p>
                    {/* <Image src={props.item.imagen} width={300} height={200} alt={''}/>        */}
                    {/* <img src={} width={300} height={200} alt="" />  */}
                    {imagen && <Image src={`data:image/jpeg;base64,${imagen}`} width={300} height={200} alt={''} />     }
                </p>                
                <Link href={`/detalle/${props.item.id}`}>   
                    <h3>
                        <p>{props.item.titulo}</p>
                    </h3>
                    <p>{props.item.descripcion}</p>
                </Link>
            </div>

        </div>
    );
}
function readAsDataURL(img: string) {
    throw new Error("Function not implemented.");
}

