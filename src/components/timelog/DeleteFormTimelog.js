import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';

import { useMutation } from '@apollo/react-hooks';
import { DELETE_TIMELOG } from '../../config/gqls';
import { TimelogCacheUpdater } from '../../libs';

const useStyles = makeStyles(theme => ({
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

export default function DeleteFormTimelog({ timelog, handleHide }) {

    const classes = useStyles();

    const [deleteMutation] = useMutation(DELETE_TIMELOG);

    const handleDelete = () => {
        deleteMutation({
            variables: { id: timelog.id },
            update: new TimelogCacheUpdater(true).deleted,
        });
        handleHide();
    }

    return (
        <div className={classes.root}>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete timelog?
            </DialogContentText>
            <div className={classes.buttons}>
                <Button color="primary" onClick={handleHide}>Cancel</Button>
                <Button color="primary" onClick={handleDelete} >Delete</Button>
            </div>
        </div>
    );
};

DeleteFormTimelog.propTypes = {
    timelog: PropTypes.object.isRequired,
    handleHide: PropTypes.func.isRequired
};
