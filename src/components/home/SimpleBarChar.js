import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
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
import moment from 'moment';

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
        [theme.breakpoints.down('xs')]: {
            width: '90%',
            height: 400
        },
    },
}));

const SimpleBarChart = () => {

    const classes = styles();
    const theme = useTheme();

    const startDate = moment().startOf('isoWeek').format('YYYY-MM-DD');
    const endDate = moment().endOf('isoWeek').format('YYYY-MM-DD');

    const { loading, error, data } = useQuery(
        TIMESHEET_SET,
        {
            variables: { startDate, endDate },
            fetchPolicy: 'no-cache'
        },
    );

    if (loading) return <LoadingComponent loading={loading} />;
    if (error) return <ErrorServiceComponent error={error} />;

    const { legend, barChar } = generateSimpleBarChart(theme, startDate, endDate, data.timesheet);

    return (
        <div className={classes.root}>
            <ResponsiveContainer>
                <BarChart
                    // width={600}
                    // height={500}
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
                            // onClick={(data, index) => { console.log(data) }}
                            />
                        ))
                    }
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SimpleBarChart;
