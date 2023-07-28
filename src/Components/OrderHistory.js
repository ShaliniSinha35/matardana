import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function OrderHistory() {
  return (
    <div className='order-history' style={{display:"flex",flexDirection:"column",alignItems:"flex-start",margin:"2rem"}}>
        <h3>Order History</h3>

<TableContainer component={Paper}>
      <Table   aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  sx={{fontWeight:"bold"}}>SNO.</TableCell>
            <TableCell  sx={{fontWeight:"bold"}} align="right">Action</TableCell>
            <TableCell  sx={{fontWeight:"bold"}} align="right">OrderID</TableCell>
            <TableCell  sx={{fontWeight:"bold"}} align="right">Date</TableCell>
            <TableCell  sx={{fontWeight:"bold"}} align="right">Status</TableCell>
            <TableCell  sx={{fontWeight:"bold"}} align="right">Payment</TableCell>
            <TableCell  sx={{fontWeight:"bold"}} align="right">Delivery Boy</TableCell>
            <TableCell sx={{fontWeight:"bold"}} align="right">Support No</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <p>No Order Found</p>
        </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default OrderHistory