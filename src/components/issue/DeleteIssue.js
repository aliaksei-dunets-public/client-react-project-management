import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useMutation } from '@apollo/react-hooks';

import { issueUpdater } from '../../libs';
import { DELETE_ISSUE } from '../../config/gqls';

const useStyles = makeStyles(theme => ({
    root: {
        // '& > *': {
        //     margin: theme.spacing(1),
        // },
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

export default function DeleteFormProject({ issue, handleHide }) {

    const classes = useStyles();

    const [deleteProject] = useMutation(DELETE_ISSUE);

    const handleDelete = () => {
        deleteProject({
            variables: { id: issue.id, deleteChild: true },
            update: issueUpdater.deleted,
        });
        handleHide(true);
    }

    return (
        <div className={classes.root}>
            <DialogContentText id="alert-dialog-description">
                During deletion of the Issue all timelogs will be deleted too. Are you sure?
            </DialogContentText>
            <div className={classes.buttons}>
                <Button color="primary" onClick={() => handleHide(false)}>Cancel</Button>
                <Button color="primary" onClick={handleDelete} >Delete</Button>
            </div>
        </div>
    );
};

DeleteFormProject.propTypes = {
    issue: PropTypes.object.isRequired,
    handleHide: PropTypes.func.isRequired
};
