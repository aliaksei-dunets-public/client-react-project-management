import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function LoadingComponent({ loading }) {
    const classes = useStyles();
    //   const [open, setOpen] = React.useState(false);
    //   const handleClose = () => {
    //     setOpen(false);
    //   };
    //   const handleToggle = () => {
    //     setOpen(!open);
    //   };

    return (
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}