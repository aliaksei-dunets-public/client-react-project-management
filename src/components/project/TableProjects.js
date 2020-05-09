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
import TableRowActionComponent from '../common/TableRowActionComponent';
import CreateDialogComponent from '../common/CreateDialogComponent';
import CreateFormProject from './CreateFormProject';
import UpdateFormProject from './UpdateFormProject';
import DeleteFormProject from './DeleteFormProject';
import DialogHandler from '../common/DialogHandler';

const useStyles = makeStyles(theme => ({
    headerTable: {
        backgroundColor: 'rgba(224, 224, 224, 1)',
    }
}));

const TableProjects = ({ projects }) => {
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
                            <TableCell>Name</TableCell>
                            <Hidden xsDown>
                                <TableCell>Description</TableCell>
                            </Hidden>
                            <TableCell align="center">Status</TableCell>
                            <Hidden xsDown>
                                <TableCell align="center">External</TableCell>
                            </Hidden>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    <LinkRouter to={`${nav.project.path}/${row.id}`} >
                                        {row.code}
                                    </LinkRouter>
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <Hidden xsDown>
                                    <TableCell>{row.descr}</TableCell>
                                </Hidden>
                                <TableCell align="center">
                                    <StatusComponent status={row.status} />
                                </TableCell>
                                <Hidden xsDown>
                                    <TableCell align="center">
                                        <ExternalLinkComponent url={row.external_url} code={row.external_code} />
                                    </TableCell>
                                </Hidden>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateDialogComponent title="Create a new project">
                <CreateFormProject />
            </CreateDialogComponent>
            <DialogUpdateComponent title={`Update the project - ${selected.name}`}>
                <UpdateFormProject project={selected} handleHide={dialogUpdateHandler.hide} />
            </DialogUpdateComponent>
            <DialogDeleteComponent title={`Delete the project - ${selected.name}`}>
                <DeleteFormProject project={selected} handleHide={dialogDeleteHandler.hide} />
            </DialogDeleteComponent>
        </>
    );
}

export default TableProjects;