import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useMutation } from '@apollo/react-hooks';

import { projectUpdater } from '../../libs';
import { DELETE_PROJECT } from '../../config/gqls';

const styles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            width: '400px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    buttons: {
        // width: '100%',
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
}));

export default function DeleteProjectDialog({ project, handleHide }) {

    const classes = styles();

    const [deleteProject] = useMutation(DELETE_PROJECT);

    const handleDelete = () => {
        deleteProject({
            variables: { id: project.id, deleteChild: true },
            update: projectUpdater.deleted,
        });
        handleHide(true);
    }

    return (
        <div className={classes.root}>
            <DialogContentText id="alert-dialog-description">
                During deletion of the project all issues and timelogs will be deleted too. Are you sure?
                </DialogContentText>
            <div className={classes.buttons}>
                <Button color="primary" onClick={() => handleHide(false)}>Cancel</Button>
                <Button color="primary" onClick={handleDelete} >Delete</Button>
            </div>
        </div>
    );
};

DeleteProjectDialog.propTypes = {
    project: PropTypes.object.isRequired,
    handleHide: PropTypes.func.isRequired,
};
