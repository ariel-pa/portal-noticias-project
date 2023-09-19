import axiosFetch from "@/services/axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import departamentoReducer from "../../../components/Departamento/CreateReducer";
import DataGridDemo from "./DepartamentoTable";
import styleDepartamento from "./departamento.module.css";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export const GET_DEPARTAMENTOS = "GET_DEPARTAMENTOS"; 

export default function Departamneto() {
    
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


    const handleNombreChange = (event: any) => {
        setnombre(event.target.value);
        console.log(nombre);
    };

    const handleAbreviaturalChange = (event: any) => {
        setAbreviatura(event.target.value);

    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();        
        try {
            const response = await axiosFetch.post('departamentos',{
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
        <nav className={styleDepartamento.departamento}>
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
                            Agregar nuevo Departamento.
                        </Typography>
                        <form >
                            <br />
                            <div>
                            <TextField id="nombre" label="Nombre" value={nombre} style={{ width: '100%' }} onChange={handleNombreChange} />
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
        <div className={styleDepartamento.table}>
            <h3>Listado de departamentos</h3>
            {departamentos && <DataGridDemo departamentos= {departamentos}/>}
        </div>
        </>
    )
}
    