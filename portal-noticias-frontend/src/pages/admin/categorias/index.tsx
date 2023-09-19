
import axiosFetch from "@/services/axios";
import { Box, Button, Modal, TextField,Typography } from "@mui/material";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import categoriaReducer from "./../../../components/Categoria/CreateReducer";
import styleCategoria from "./categoria.module.css";
import DataGridDemo from "./CategoriaTable";
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

export const GET_CATEGORIAS = "GET_CATEGORIAS"; 

export default function Categorias() {

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
   
    //MODAL
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //FORMULARIO DE REGISTRO

    const [nombre, setnombre] = useState('');
    const [abreviatura, setAbreviatura] = useState('');


    const handlenombreChange = (event: any) => {
        setnombre(event.target.value);
        console.log(nombre);
    };

    const handleAbreviaturalChange = (event: any) => {
        setAbreviatura(event.target.value);

    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await axiosFetch.post('categorias',{
                nombre,
                abreviatura,
            })
            setnombre('');
            setAbreviatura('');
            alert('Categoria registrada correctamente');
            
        } catch (error) {
            console.log(error);
            
        }
    };    

    return (
        <>
        <nav className={styleCategoria.categoria}>
            <div>
                <Button  variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>Nuevo</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box component="form"
                            sx={style   }
                            noValidate
                            autoComplete="off">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Agregar nueva categoria
                    </Typography>
                    <form >
                        <br />
                        <div>
                        <TextField id="nombre" label="Nombre" value={nombre} style={{ width: '100%' }} onChange={handlenombreChange} />
                        </div>                        
                        <br />
                        <div>
                        <TextField id="abreviatura" label="Abreviatura" value={abreviatura} style={{ width: '100%' }} onChange={handleAbreviaturalChange} />
                        </div>                        
                        <br />
                        <div>
                        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Registrar</Button>
                        </div>                        
                    </form>
                    </Box>
                </Modal>
            </div>
        </nav>
        <div className={styleCategoria.table}>
            <h3>Listado de categorias</h3>
            {categorias &&  <DataGridDemo categorias = {categorias}/>}
        </div>
        </>
    )
}
    