import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ExternalLinkComponent from '../common/ExternalLinkComponent';
import StatusComponent from '../common/StatusComponent';
import DeleteFormProject from './DeleteFormProject';

const useStyles = makeStyles(theme => ({
    headerTable: {
        backgroundColor: 'rgba(224, 224, 224, 1)',
    }
}));

const TableProjects = ({ projects }) => {
    const classes = useStyles();

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead className={classes.headerTable}>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">External</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.code}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.descr}</TableCell>
                                <TableCell align="center">
                                    <StatusComponent status={row.status} />
                                </TableCell>
                                <TableCell align="center">
                                    <ExternalLinkComponent url={row.external_url} code={row.external_code} />
                                </TableCell>
                                <TableCell align="center">
                                    <DeleteFormProject id={row.id} name={row.name} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TableProjects;