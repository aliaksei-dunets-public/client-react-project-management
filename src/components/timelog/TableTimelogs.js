import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Moment from 'react-moment';

import TableRowActionComponent from '../common/TableRowActionComponent';
import DialogHandler from '../common/DialogHandler';
import { DeleteFormTimelog, UpdateFormTimelog } from './';

const useStyles = makeStyles(theme => ({
    headerTable: {
        backgroundColor: 'rgba(224, 224, 224, 1)',
    },
    paidTime: {
        color: 'green'
    },
    noPaidTime: {
        color: 'red'
    }
}));

const TableTimelogs = ({ timelogs }) => {

    const classes = useStyles();

    const [selected, setSelected] = useState({});

    const dialogUpdateHandler = DialogHandler();
    const DialogUpdateComponent = dialogUpdateHandler.component;

    const dialogDeleteHandler = DialogHandler();
    const DialogDeleteComponent = dialogDeleteHandler.component;

    return (
        <>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="simple table">
                    <TableHead className={classes.headerTable}>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="center">Time, h</TableCell>
                            <Hidden xsDown>
                                <TableCell align="center">Description</TableCell>
                            </Hidden>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timelogs.map(row => (
                            <TableRow key={row.id} onClick={() => { setSelected(row) }}>
                                <TableCell component="th" scope="row">
                                    <Moment format="DD MMM YYYY, dddd">
                                        {row.dateLog}
                                    </Moment>
                                </TableCell>
                                <TableCell
                                    className={row.paidUp ? classes.paidTime : classes.noPaidTime}
                                    align="center"
                                >
                                    {row.valueLog}
                                </TableCell>
                                <Hidden xsDown>
                                    <TableCell align="center">{row.descr}</TableCell>
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
            <DialogUpdateComponent title="Update the timelog">
                <UpdateFormTimelog timelog={selected} handleHide={dialogUpdateHandler.hide} />
            </DialogUpdateComponent>
            <DialogDeleteComponent title="Delete the timelog">
                <DeleteFormTimelog timelog={selected} handleHide={dialogDeleteHandler.hide} />
            </DialogDeleteComponent>
        </>
    );
}

export default TableTimelogs;