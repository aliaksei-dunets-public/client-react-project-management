import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as LinkRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
import CreateProjectDialog from './CreateProjectDialog';
import UpdateProjectDialog from './UpdateProjectDialog';
import DeleteProjectDialog from './DeleteProjectDialog';
import DialogHandler from '../common/DialogHandler';
import CreateFabComponent from '../common/CreateFabComponent';

const useStyles = makeStyles(theme => ({
    headerTable: {
        backgroundColor: 'rgba(224, 224, 224, 1)',
    }
}));

const TableProjects = ({ projects }) => {
    const classes = useStyles();
    const history = useHistory();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    const [selected, setSelected] = useState({});

    const dialogUpdateHandler = DialogHandler();
    const DialogUpdateComponent = dialogUpdateHandler.component;

    const dialogDeleteHandler = DialogHandler();
    const DialogDeleteComponent = dialogDeleteHandler.component;

    const handleSelectRow = (id, event) => {
        switch (event.target.tagName) {
            case 'TH':
            case 'TD':
            case 'P':
                history.push(`${nav.project.path}/${id}`);
                break;

            default:
                break;
        }
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table size={matches ? 'medium' : 'small'} aria-label="simple table">
                    <TableHead className={classes.headerTable}>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell>Name</TableCell>
                            <Hidden smDown>
                                <TableCell>Description</TableCell>
                            </Hidden>
                            <TableCell align="center">Status</TableCell>
                            <Hidden xsDown>
                                <TableCell align="center">External</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </Hidden>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map(row => (
                            <TableRow key={row.id} onClick={handleSelectRow.bind(this, row.id)}>
                                <TableCell component="th" scope="row" >
                                    <LinkRouter to={`${nav.dashboard.path}/${row.id}`} >
                                        {row.code}
                                    </LinkRouter>
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <Hidden smDown>
                                    <TableCell>{row.descr}</TableCell>
                                </Hidden>
                                <TableCell align="center">
                                    <StatusComponent status={row.status} />
                                </TableCell>
                                <Hidden xsDown>
                                    <TableCell align="center">
                                        <ExternalLinkComponent url={row.external_url} code={row.external_code} />
                                    </TableCell>
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

            <Hidden mdUp>
                <CreateFabComponent handleClick={() => history.push(nav.create_project.path)} />
            </Hidden>
            <Hidden smDown>
                <CreateDialogComponent title="Create a new project">
                    <CreateProjectDialog />
                </CreateDialogComponent>
            </Hidden>

            <DialogUpdateComponent title={`Update project: ${selected.code}`}>
                <UpdateProjectDialog project={selected} handleCloseDialog={dialogUpdateHandler.hide} />
            </DialogUpdateComponent>

            <DialogDeleteComponent title={`Delete project: ${selected.code}`}>
                <DeleteProjectDialog project={selected} handleHide={dialogDeleteHandler.hide} />
            </DialogDeleteComponent>
        </>
    );
}

export default TableProjects;