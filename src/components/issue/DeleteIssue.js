import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useMutation } from '@apollo/react-hooks';
import { severity } from '../../config/constants';
import { MESSAGE_BAR_LOCAL, GET_ISSUE_SET, GET_PROJECT, DELETE_ISSUE } from '../../config/gqls';

export default function DeleteFormProject({ id, name }) {

    const [open, setOpen] = useState(false);

    const [deleteProject] = useMutation(DELETE_ISSUE);

    const updateCache = (cache, { data: { deleteIssue } }) => {
        try {
            const { issues } = cache.readQuery({ query: GET_ISSUE_SET });
            cache.writeQuery({
                query: GET_ISSUE_SET,
                data: { issues: issues.filter((item) => deleteIssue.id !== item.id) }
            });
        } catch (error) {

        }

        try {
            const { project } = cache.readQuery({ query: GET_PROJECT, variables: { id: deleteIssue.project_id } });
            const newProject = { ...project };
            newProject.issues = project.issues.filter((item) => deleteIssue.id !== item.id);
            cache.writeQuery({
                query: GET_PROJECT,
                data: { project: newProject }
            });
        } catch (error) {

        }

        cache.writeQuery({
            query: MESSAGE_BAR_LOCAL,
            data: {
                messageBarOpen: true,
                messageBarSeverity: severity.success,
                messageBarText: `Issue ${name} was deleted successfully.`,
            },
        });
    };

    const handleDelete = () => {
        deleteProject({
            variables: { id },
            update: updateCache,
        });
        handleClose();
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Tooltip title="Delete entry" aria-label="Delete">
                <IconButton color="primary" aria-label="Delete" onClick={() => setOpen(true)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Delete project ${name}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        During deletion of the Issue all timelogs will be deleted too. Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

DeleteFormProject.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
};
