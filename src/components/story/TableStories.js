import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TableStories = ({ stories }) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell align="center">Summary</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Projection</TableCell>
                            <TableCell align="right">Version</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stories.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.code}
                                </TableCell>
                                <TableCell align="center">{row.summary}</TableCell>
                                <TableCell>{row.descr}</TableCell>
                                <TableCell>{row.projection_id}</TableCell>
                                <TableCell align="right">{row.version_id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TableStories;