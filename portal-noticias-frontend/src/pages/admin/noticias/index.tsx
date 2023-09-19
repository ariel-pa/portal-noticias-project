
import axiosFetch from "@/services/axios";
import { Box, Button, FormControl, Input, InputLabel, MenuItem, Modal, Select, TextField,Typography } from "@mui/material";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import noticiasReducer from "./../../../components/Noticia/CreateReducer";
import styleNoticia from "./noticia.module.css";
import AddIcon from '@mui/icons-material/Add';
import DataGridDemo from "./NoticiasTable";
import categoriaReducer from "@/components/Categoria/CreateReducer";
import departamentoReducer from "@/components/Departamento/CreateReducer";

export const GET_NOTICIAS = "GET_NOTICIAS"; 
export const GET_CATEGORIAS = "GET_CATEGORIAS"; 
export const GET_DEPARTAMENTOS = "GET_DEPARTAMENTOS"; 

export default function Noticias() {

    //NOTICIA
    const inicialState = {
        noticias: [], 
    };
    const [state, dispatch] = useReducer(noticiasReducer, inicialState);
    const noticiasContext = createContext(state);
    const {noticias} = useContext(noticiasContext);

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
   
    //CATEGORIA 
    const inicialStateCategoria = {
        categorias: [], 
    };
    const [stateCategoria, dispatchCategoria] = useReducer(categoriaReducer, inicialStateCategoria);
    const categoriaContext = createContext(stateCategoria);

    const {categorias} = useContext(categoriaContext);

    useEffect(()=> {
        const getCategorias =  async () => {
            const {data} = await axiosFetch('categorias');
            if(Object.keys(data).length !==0){
                dispatchCategoria({
                    type: GET_CATEGORIAS,
                    payload: data,
                })
            }                 
        }
        getCategorias();
    },[]); 
        
    //DEPARTAMENTO
    const inicialStateDepartamento = {
        departamentos: [], 
    };
    const [stateDepartamento, dispatchDepartamento] = useReducer(departamentoReducer, inicialStateDepartamento);
    const departamnetoContext = createContext(stateDepartamento);

    const {departamentos} = useContext(departamnetoContext);

    useEffect(()=> {
        const getDepartamentos =  async () => {
            const {data} = await axiosFetch('departamentos');
            if(Object.keys(data).length !==0){
                dispatchDepartamento({
                    type: GET_DEPARTAMENTOS,
                    payload: data,
                })
            }                 
        }
        getDepartamentos();
    },[]);    

    //MODAL
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //FORMULARIO DE REGISTRO

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [autor, setAutor] = useState('');
    const [categoriaId, setSelectOptionOne] = useState('');
    const [departamentoId, setSelectOptionTwo] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [previewSrc, setPreviewSrc] = useState(''); 

    const handleTituloChange = (event: any) => {
        setTitulo(event.target.value);
    };

    const handleDescripcionChange = (event: any) => {
        setDescripcion(event.target.value);
    };

    const handleAutorChange = (event: any) => {
        setAutor(event.target.value);
    };

    const handleSelectChangeOne = (event: any) => {
        setSelectOptionOne(event.target.value);
    };
    const handleSelectChangeTwo = (event: any) => {
        setSelectOptionTwo(event.target.value);
    };

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () =>  {
            setPreviewSrc(reader.result as string);
        };
        reader.readAsDataURL(file);

    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {

            const formData = new FormData();
            formData.append('archivo', selectedFile);
            formData.append('titulo', titulo);
            formData.append('descripcion', descripcion);
            formData.append('autor', autor);
            formData.append('categoriaId', categoriaId);
            formData.append('departamentoId', departamentoId);

            console.log(Object.fromEntries( formData.entries()));
            
            // const response = await axiosFetch.post('noticias',formData)
            alert('Noticia registrada correctamente');
            
        } catch (error) {
            console.log(error);
            
        }
    };    

    // console.log([ selectedFile]);
    
    return (
        <>
        <nav className={styleNoticia.noticia}>
            <div>
                <Button  variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>Nuevo</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    
                >
                    <Box component="form"
                            sx={style}
                            noValidate
                            autoComplete="off">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Agregar nueva noticia
                    </Typography>
                    <form >
                        <br />
                        <div>
                        <TextField id="titulo" label="Titulo" value={titulo} style={{ width: '40%' }} onChange={handleTituloChange} /> 
                        
                        <TextField id="descripcion" label="Descripcion" value={descripcion} style={{ width: '40%' }} onChange={handleDescripcionChange} />
                         <br /><br />
                        <TextField id="autor" label="Autor" value={autor} style={{ width: '40%' }} onChange={handleAutorChange} />
                        <FormControl style={{ width: '40%' }}>
                            <InputLabel id="select-label">SELECCIONAR CATEGORIA</InputLabel>
                            <Select
                            labelId="select-label"
                            value={categoriaId}
                            onChange={handleSelectChangeOne}
                            >
                            {categorias && categorias.map((item: any) => <MenuItem key={item.id} value={item.id}>{item.nombre}</MenuItem> )}
                            </Select>
                        </FormControl>
                        </div><br /><br />                

                        <FormControl style={{ width: '40%' }}>
                            <InputLabel id="select-label">SELECCIONAR DEPARTAMENTO</InputLabel>
                            <Select
                            labelId="select-label"
                            value={departamentoId}
                            onChange={handleSelectChangeTwo}
                            >
                            {departamentos && departamentos.map((item: any)=> <MenuItem key={item.id} value={item.id}>{item.nombre}</MenuItem> )}    
                            </Select><br />
                        </FormControl>
                        <Input type="file" onChange={handleFileChange} />
                        { previewSrc && <img src={previewSrc} width={200} height={100} alt="Imagen seleccionada" />}
                        <br />
                        <br />
                        <div>
                        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Registrar</Button>
                        </div>                        
                    </form>
                    </Box>
                </Modal>
            </div>
        </nav>
        <div className={styleNoticia.table}>
            <h3>Listado de noticias</h3>
            {noticias &&  <DataGridDemo noticias = {noticias}/>}
        </div>
        </>
    )
}
    