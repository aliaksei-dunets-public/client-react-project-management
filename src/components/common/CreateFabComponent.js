import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    },
}));

const CreateFabComponent = ({ handleClick }) => {

    const classes = useStyles();

    return (
        <>
            <Fab
                className={classes.fab}
                size="medium"
                color="primary"
                aria-label="add"
                onClick={handleClick}
            >
                <AddIcon />
            </Fab>
        </>
    );
}

CreateFabComponent.propTypes = {
    handleClick: PropTypes.func.isRequired,
};

export default CreateFabComponent;

