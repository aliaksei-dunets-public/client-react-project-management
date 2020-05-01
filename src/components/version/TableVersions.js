import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TableVersions = ({ versions }) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Version</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Projection</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {versions.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.version}
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell>{row.descr}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell align="right">{row.projection_id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TableVersions;