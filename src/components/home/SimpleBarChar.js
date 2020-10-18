import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import { nav } from '../../config/constants';
import { TIMESHEET_SET } from '../../config/gqls';
import { generateSimpleBarChart } from '../../libs';
import {
    LoadingComponent,
    ErrorServiceComponent,
} from '../common';

const styles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('xs')]: {
            width: '50%',
            height: 500,
            paddingRight: '8px'
        },
        [theme.breakpoints.down('md')]: {
            width: '50%',
            height: 280
        },
        [theme.breakpoints.down('xs')]: {
            width: '90%',
            height: 280
        },
    },
    title :{
        marginLeft: theme.spacing(4)
    }
}));

const SimpleBarChart = () => {
    
    const history = useHistory();
    const classes = styles();

    const [legend, setLegend] = useState([]);
    const [barChar, setBarChar] = useState([]);

    const startOfWeek = moment().startOf('isoWeek');
    const endOfWeek = moment().endOf('isoWeek');
    const startDate = startOfWeek.format('YYYY-MM-DD');
    const endDate = endOfWeek.format('YYYY-MM-DD');

    const { loading, error, data } = useQuery(
        TIMESHEET_SET,
        {
            variables: { startDate, endDate },
            fetchPolicy: 'no-cache',
            onCompleted: () => {
                const barData = generateSimpleBarChart(startDate, endDate, data.timesheet);
                setLegend(barData.legend);
                setBarChar(barData.barChar);
            }
        },
    );

    if (loading) return <LoadingComponent loading={loading} />;
    if (error) return <ErrorServiceComponent error={error} />;

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h6" color="primary">
                {`Week Time, h: ${startOfWeek.format('DD MMM')} - ${endOfWeek.format('DD MMM')}`}
            </Typography>
            <ResponsiveContainer>
                <BarChart
                    data={barChar}
                    margin={{
                        top: 10, right: 5, left: 5, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="point" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {
                        legend.map((item) => (
                            <Bar
                                key={item.id}
                                stackId="project"
                                dataKey={item.key}
                                name={item.legend}
                                fill={item.fill}
                                onClick={(data, index) => { history.push(nav.timesheet.path) }}
                            />
                        ))
                    }
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SimpleBarChart;
