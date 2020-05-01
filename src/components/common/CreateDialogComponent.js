import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    },
}));

const DialogComponent = (props) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleCloseDialog = () => setOpen(false);

    const childrenWithState = React.cloneElement(props.children, { handleCloseDialog })

    return (
        <>
            <Fab className={classes.fab} color="primary" aria-label="add" onClick={() => { setOpen(true) }}>
                <AddIcon />
            </Fab>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    {childrenWithState}
                </DialogContent>
            </Dialog>
        </>
    );
}

DialogComponent.propTypes = {
    title: PropTypes.string.isRequired,
};

export default DialogComponent;

