import React from 'react';
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
import { generateTimesheet, Aggregator } from '../../libs';
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
    }
}));

const QueryTimesheet = ({ startDate, endDate }) => {

    const classes = useStyles();

    const { loading, error, data, refetch } = useQuery(
        TIMESHEET_SET,
        {
            variables: { startDate, endDate },
            fetchPolicy: 'no-cache'
        },
    );

    if (loading) return <LoadingComponent />
    if (error) return <ErrorServiceComponent />

    const timesheetData = generateTimesheet(data.timesheet, startDate, endDate);

    const aggregator = new Aggregator(startDate, endDate);
    const timesheetData_new = aggregator.buildTimelogs(data.timesheet.timelogs)
        .buildIssues(data.timesheet.issues)
        .buildProjects(data.timesheet.projects)
        .getTimesheet();

    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table} stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.headerTable}>Tasks</TableCell>
                            <TableCell className={classes.headerTable} align="center">Total</TableCell>
                            <Hidden xsDown>
                                {
                                    aggregator.getRangeDates().map((item) => (
                                        <TableCell
                                            className={classes.headerTable}
                                            align="center"
                                            key={item._d}
                                        >
                                            {item.format('MMM-DD, ddd')}
                                        </TableCell>
                                    ))
                                }
                            </Hidden>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableCellTimesheet projects={timesheetData.timesheet} changedNotification={refetch} />
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}

QueryTimesheet.propTypes = {
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
};

export default QueryTimesheet;