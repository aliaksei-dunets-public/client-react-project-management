import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as LinkRouter } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { nav } from '../../config/constants';
import ExternalLinkComponent from '../common/ExternalLinkComponent';
import StatusComponent from '../common/StatusComponent';
import DeleteIssue from './DeleteIssue';

const useStyles = makeStyles(theme => ({
    headerTable: {
        backgroundColor: 'rgba(224, 224, 224, 1)',
    }
}));

const TableIssues = ({ issues }) => {
    const classes = useStyles();

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead className={classes.headerTable}>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell>Summary</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">External</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {issues.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    <LinkRouter to={`${nav.issue.path}/${row.id}`} >
                                        {row.code}
                                    </LinkRouter>
                                </TableCell>
                                <TableCell>{row.summary}</TableCell>
                                <TableCell>{row.descr}</TableCell>
                                <TableCell align="center">
                                    <StatusComponent status={row.status} />
                                </TableCell>
                                <TableCell align="center">
                                    <ExternalLinkComponent url={row.external_url} code={row.external_code} />
                                </TableCell>
                                <TableCell align="center">
                                    <DeleteIssue id={row.id} name={row.summary} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TableIssues;