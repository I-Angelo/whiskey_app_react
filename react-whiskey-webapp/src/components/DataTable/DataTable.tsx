import React, {useState } from 'react'
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useGetData } from '../../custom-hooks';
import { server_calls } from '../../api';
import { Button, Dialog,
DialogActions,
DialogContent,
DialogContentText,
DialogTitle } from '@material-ui/core';
import { WhiskeyForm } from '../WhiskeyForm'


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90, hide: true }, //hides the id #
  { field: 'brand', headerName: 'Brand Name', flex: 1 }, //is like a flexbox, where the width is only going to be 1 unit or 1/7th (flextricks module)
  { field: 'year', headerName: 'Year Made', flex: 1 },
  { field: 'malt', headerName: 'Type of Malt', flex: 1 },
  { field: 'grain', headerName: 'Type of Grain', flex: 2 }, // 2 units flex
];

interface gridData {
  data: {
      id?:string
  }
}

export const DataTable = () => {

  let { contactData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<gridData>({data:{}});
  const [selectionModel, setSelectionModel] = useState<any>([]);
  

  let handleOpen = () => {
      setOpen(true)
  };
  let handleClose = () => {
      setOpen(false)
  };

  let deleteData = () => {
      server_calls.delete(selectionModel);
      // console.log(gridData.data.id);
      getData();
      setTimeout( () => { window.location.reload(); }, 1000)
  }

  // console.log(gridData.data.id!);
  // console.log(`testing for data ${contactData}`)
  return (
    <div style={{ height: 400, width: '100%' }}>
        <h2>My Whiskeys</h2>

    <DataGrid rows={ contactData } columns={ columns } pageSize={ 5 } checkboxSelection={true} // this comes from 'columns' in line 13
                                // pageSize is 5 because it is 5 fields we want to display
    onSelectionModelChange={ (item) => {
        setSelectionModel(item)
        // console.log(item)
      }}
    />

    <Button onClick={handleOpen}>Update</Button>
    <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

    {/* Dialog pop-up */}
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Whiskey {selectionModel}</DialogTitle>
        <DialogContent>
            <DialogContentText>Update Whiskey</DialogContentText>
                <WhiskeyForm id={selectionModel!}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color="primary">Done</Button>
        </DialogActions>
    </Dialog>
        
    </div>
)
}
