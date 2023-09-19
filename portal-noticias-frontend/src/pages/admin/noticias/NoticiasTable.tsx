import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'titulo',
    headerName: 'Titulo',
    width: 150,
    editable: true,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    width: 150,
    editable: true,
  },
  {
    field: 'autor',
    headerName: 'Autor',
    width: 150,
    editable: true,
  },
  {
    field: 'fechaCreacion',
    headerName: 'Fecha Creación',
    width: 150,
    editable: true,
  },
  {
    field: '',
    headerName: 'Acciones',
    width: 150,
    editable: true,
  },
];

export default function DataGridDemo(props:{noticias: any}) {

  const rows = props.noticias;

  
  return (
    <>
    <Box sx={{ height: 400, width: '80%' }}>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </>
  );
}