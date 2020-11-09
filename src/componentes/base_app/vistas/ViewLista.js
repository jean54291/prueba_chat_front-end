import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import {
  GroupingState,
  IntegratedGrouping,
  SummaryState,
  SortingState,
  IntegratedSummary,
  IntegratedSorting,
  SelectionState,
  EditingState,
  IntegratedSelection,
  DataTypeProvider,
  IntegratedPaging,
  PagingState,
} from '@devexpress/dx-react-grid';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
  TableGroupRow,
  GroupingPanel,
  TableSummaryRow,
  
  TableSelection,
  DragDropProvider,
  Toolbar,
  ExportPanel,
  PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap4';
import saveAs from 'file-saver';
const onSave = (workbook) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
    });
};
const ViewLista = () => {

    
    const exporterRef = useRef(null);
    const startExport = useCallback((options) => {
        exporterRef.current.exportGrid(options);
    }, [exporterRef]);


    const columns = [
        // {
        //     name: 'activo',
        //     title: 'EN LINEA',
        //     // sort: true
        // }, 
        {
            name: 'id',
            title: 'ID USUARIO',
            // sort: true
        }, 
        {
            name: 'username',
            title: 'Usuario',
            // sort: true
        }, 
        {
            name: 'first_name',
            title: 'Nombres',
            // sort: true
        },
        {
            name:'last_name',
            title:'Apellidos'
        },
        {
            name:'email',
            title:'Correo'
        }
        
    ];



    const [data, cargarData] = React.useState([]);
    React.useEffect(() => {
        async function fetchData(){
            var data = await fetch("http://localhost:8000/persona/lista_personas/").then(res => {
                return res.json();
            });
            cargarData(data);
        }
        fetchData();
    }, [])
    const [selection, setSelection] = useState([]);
    
    const commitChanges = ({ changed,  deleted }) => {
        console.log(changed)
        let changedRows;
        if (changed) {
            console.log("editar usuario" + data.id)
        }
        if (deleted) {console.log("eliminar usuario")}
    };

    

    const getRowId = data => data.id;
    
    return ( 
       
            <div className="card"> 
            
                <Grid
                    rows={data}
                    columns={columns}
                    getRowId={getRowId}
                >                    
                    <PagingState
                        defaultCurrentPage={0}
                        pageSize={6}
                    />
                    
                    <SelectionState selection={selection} onSelectionChange={setSelection} />
                    <SortingState
                        defaultSorting={[{ columnName: 'id', direction: 'desc' }]}
                    />
                    
                    {/* el orden como se ponga los componentes asi mismo funciona la app
                        por ejemplo si se pone primero IntegratedSelection la seleccion es de todas las pginas
                        si se pone despues de integratePaging solo selecciona la pagina actual
                    */}
                    <IntegratedSorting />
                    <IntegratedSelection />
                    <IntegratedPaging />
                    <EditingState
                        onCommitChanges={commitChanges}
                    />
                    <Table />
                    <TableHeaderRow showSortingControls />
                   {/* <TableSelection showSelectAll /> {/* Sirve para poner los check */}
                     <Toolbar/>
                    
                    <ExportPanel startExport={startExport}  />
                    
                    {/* <TableEditColumn
                        
                        showEditCommand
                        showDeleteCommand
                    /> */}
                    <PagingPanel /> 
                    {/* Sirve para poner el panel de paginacion */}
                </Grid>
                <GridExporter
                    ref={exporterRef}
                    rows={data}
                    columns={columns}                 
                    selection={selection}
                    onSave={onSave}
                />
            </div>  
        
     );
}
 
export default ViewLista;