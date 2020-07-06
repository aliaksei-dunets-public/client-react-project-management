import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

import { TIMESHEET_SET } from '../../config/gqls';
import { generateTimesheet } from '../../libs';
import {
    LoadingComponent,
    ErrorServiceComponent,
} from '../common';
import { TableCellTimesheet } from './';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(1),
        },
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-center',
        width: '100%',
        ...theme.mixins.toolbar,
    },
    headerTable: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(224,224,224)',
        fontSize: '0.8rem',
    },
    headerWeekend: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(224,224,224)',
        fontSize: '0.8rem',
        opacity: 0.5,
    }
}));

const QueryTimesheet = ({ dates }) => {

    const classes = useStyles();

    const [projects, setProjects] = useState([]);
    const [timeslots, setTimeslots] = useState([]);

    const { loading, error, data, refetch, networkStatus } = useQuery(
        TIMESHEET_SET,
        {
            variables: dates,
            fetchPolicy: 'no-cache',
            notifyOnNetworkStatusChange: true,
            onCompleted: () => {
                const timesheet = generateTimesheet(dates.startDate, dates.endDate, data.timesheet);
                setProjects(timesheet.projects);
                setTimeslots(timesheet.timeslots);
            }
        },
    );

    if (networkStatus === 4) return <LoadingComponent loading={networkStatus === 4} />;
    if (loading) return <LoadingComponent loading={loading} />;
    if (error) return <ErrorServiceComponent error={error} />;

    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table} stickyHeader size='small' aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.headerTable}>Tasks</TableCell>
                            <TableCell className={classes.headerTable} align="center">Total</TableCell>
                            <Hidden xsDown>
                                {
                                    timeslots.map((item) => (
                                        <TableCell
                                            className={item.weekend ? classes.headerWeekend : classes.headerTable}
                                            align="center"
                                            key={item.date._d}
                                        >
                                            {item.date.format('DD MMM, ddd')}
                                        </TableCell>
                                    ))
                                }
                            </Hidden>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableCellTimesheet projects={projects} changedNotification={refetch} />
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}

QueryTimesheet.propTypes = {
    dates: PropTypes.object.isRequired,
};

export default QueryTimesheet;