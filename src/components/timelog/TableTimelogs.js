import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TableTimelogs = ({ timelogs }) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Project</TableCell>
                            <TableCell>Issue</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time, h</TableCell>
                            <TableCell>Description</TableCell>                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timelogs.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.project_id}
                                </TableCell>
                                <TableCell align="center">{row.issue_id}</TableCell>
                                <TableCell>{row.dateLog}</TableCell>
                                <TableCell>{row.valueLog}</TableCell>
                                <TableCell align="right">{row.descr}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TableTimelogs;