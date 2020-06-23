import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { priority } from '../../config/constants';

const useStyles = makeStyles(theme => ({
    positive: {
        color: "green"
    },
    warning: {
        color: 'orange'
    },
    error: {
        color: 'red'
    },
    default: {
        color: 'black'
    }
}));

const PriorityComponent = ({ code }) => {
    const classes = useStyles();

    const getClasses = () => {
        switch (code) {
            case priority.LOW.code:
            // case priority.MEDIUM.code:
                return classes.positive;

            case priority.HIGH.code:
                return classes.warning;

            case priority.CRITICAL.code:
                return classes.error;

            default:
                return classes.default;
        }
    }

    return (
        <Typography className={getClasses()} variant="body2" >
            {code in priority ? priority[code].name : code}
        </Typography>
    );
}

export default PriorityComponent;