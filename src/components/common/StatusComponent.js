import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { statuses } from '../../config/constants';

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

const StatusComponent = ({ status }) => {
    const classes = useStyles();

    const getClasses = () => {
        switch (status) {
            case statuses.ACTIVE.code:
            case statuses.READY.code:
                return classes.positive;

            case statuses.NEW.code:
            case statuses.PROGRESS.code:
            case statuses.DRAFT.code:
            case statuses.INACTIVE.code:
                return classes.warning;

            // case statuses.CLOSED.code:
            case statuses.HOLD.code:
            case statuses.OBSOLETE.code:
                return classes.error;

            default:
                return classes.default;
        }
    }

    return (
        <Typography className={getClasses()} variant="body2" >
            {status in statuses ? statuses[status].name : status}
        </Typography>
    );
}

export default StatusComponent;