import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as LinkRouter } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

import { nav } from '../../config/constants';
import ExternalLinkComponent from '../common/ExternalLinkComponent';
import StatusComponent from '../common/StatusComponent';
import PriorityComponent from '../common/PriorityComponent';
import TableRowActionComponent from '../common/TableRowActionComponent';
import { UpdateIssue, DeleteIssue } from './';
import DialogHandler from '../common/DialogHandler';


const useStyles = makeStyles(theme => ({
    headerTable: {
        backgroundColor: 'rgba(224, 224, 224, 1)',
    },
    actionCell: {
        minWidth: '100px'
    },
    descrCell: {
        maxWidth: '600px'
    }
}));

const TableIssues = ({ issues }) => {
    const classes = useStyles();

    const [selected, setSelected] = useState({});

    const dialogUpdateHandler = DialogHandler();
    const DialogUpdateComponent = dialogUpdateHandler.component;

    const dialogDeleteHandler = DialogHandler();
    const DialogDeleteComponent = dialogDeleteHandler.component;

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead className={classes.headerTable}>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell>Summary</TableCell>
                            <Hidden smDown>
                                <TableCell className={classes.descrCell}>Description</TableCell>
                            </Hidden>
                            <TableCell align="center">Status</TableCell>
                            <Hidden xsDown>
                                <TableCell align="center">Priority</TableCell>
                            </Hidden>
                            <Hidden smDown>
                                <TableCell align="center">External</TableCell>
                            </Hidden>
                            <Hidden xsDown>
                                <TableCell className={classes.actionCell} align="center">Actions</TableCell>
                            </Hidden>
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
                                <Hidden smDown>
                                    <TableCell className={classes.descrCell}>{row.descr}</TableCell>
                                </Hidden>
                                <TableCell align="center">
                                    <StatusComponent status={row.status} />
                                </TableCell>
                                <Hidden xsDown>
                                    <TableCell align="center">
                                        <PriorityComponent code={row.priority} />
                                    </TableCell>
                                </Hidden>
                                <Hidden smDown>
                                    <TableCell align="center">
                                        <ExternalLinkComponent url={row.external_url} code={row.external_code} />
                                    </TableCell>
                                </Hidden>
                                <Hidden xsDown>
                                    <TableCell align="center">
                                        <TableRowActionComponent
                                            row={row}
                                            handleUpdate={() => {
                                                setSelected(row);
                                                dialogUpdateHandler.show();
                                            }}
                                            handleDelete={() => {
                                                setSelected(row);
                                                dialogDeleteHandler.show();
                                            }}
                                        />
                                    </TableCell>
                                </Hidden>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DialogUpdateComponent title={`Update the issue - ${selected.summary}`}>
                <UpdateIssue issue={selected} handleHide={dialogUpdateHandler.hide} />
            </DialogUpdateComponent>
            <DialogDeleteComponent title={`Delete the issue - ${selected.summary}`}>
                <DeleteIssue issue={selected} handleHide={dialogDeleteHandler.hide} />
            </DialogDeleteComponent>
        </>
    );
}

export default TableIssues;