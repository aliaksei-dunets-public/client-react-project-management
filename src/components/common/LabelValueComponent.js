import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(0, 2),
    },
    label: {
        width: '6rem',
        color: 'rgb(131, 124, 124)',
        margin: theme.spacing(0.8),
    },
    value: {
        flex: 'auto',
        margin: theme.spacing(0.8),
    }
}));

const LabelValue = ({ label, value, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.label}>
                <Typography variant="body2">
                    {`${label}:`}
                </Typography>
            </div>
            <div className={classes.value}>
                {
                    children ?
                        children :
                        <Typography variant="subtitle2" color='textPrimary'>
                            {value}
                        </Typography>
                }
            </div>
        </div>
    );
}

export default LabelValue;