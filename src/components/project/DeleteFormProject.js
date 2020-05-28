import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';

import { useMutation } from '@apollo/react-hooks';
import { severity } from '../../config/constants';
import { MESSAGE_BAR_LOCAL, GET_PROJECT_SET, DELETE_PROJECT } from '../../config/gqls';

const styles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        width: 400,
    },
    buttons: {
        width: '100%',
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
}));

export default function DeleteFormProject({ project, handleHide }) {

    const classes = styles();

    const [deleteProject] = useMutation(DELETE_PROJECT);

    const updateCache = (cache) => {
        const { projects } = cache.readQuery({ query: GET_PROJECT_SET });
        cache.writeQuery({
            query: GET_PROJECT_SET,
            data: { projects: projects.filter((item) => project.id !== item.id) }
        });
        cache.writeQuery({
            query: MESSAGE_BAR_LOCAL,
            data: {
                messageBarOpen: true,
                messageBarSeverity: severity.success,
                messageBarText: `Project ${project.name} (${project.code}) was deleted successfully.`,
            },
        });
    };

    const handleDelete = () => {
        deleteProject({
            variables: { id: project.id, deleteChild: true },
            update: updateCache,
        });
        handleHide();
    }

    // const handleClose = () => {
    //     handleHide();
    // }

    return (
        <div className={classes.root}>
            <DialogContentText id="alert-dialog-description">
                During deletion of the project all issues and timelogs will be deleted too. Are you sure?
                </DialogContentText>
            <div className={classes.buttons}>
                <Button color="primary" onClick={handleHide}>Cancel</Button>
                <Button color="primary" onClick={handleDelete} >Delete</Button>
            </div>
        </div>
    );
};

DeleteFormProject.propTypes = {
    project: PropTypes.object.isRequired,
    handleHide: PropTypes.func.isRequired,
};
