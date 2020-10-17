import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { useLazyQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';

import { DateRangePickerComponent, LoadingComponent } from '../common';
import AutocompleteProject from '../project/AutocompleteProject';
import { QueryTimesheet } from './';
import { REPORT } from '../../config/gqls';

const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    project: {
        width: '300px'
    }
}));

export default () => {

    const classes = styles();

    const [dates, setDates] = useState({
        startDate: moment().startOf('isoWeek').format('YYYY-MM-DD'),
        endDate: moment().endOf('isoWeek').format('YYYY-MM-DD')
    })

    const [project_id, setProjectId] = useState('');
    const [openReport, setOpenReport] = useState(false);

    const handleChangeDateRange = (filterOptions) => {
        setDates({
            startDate: moment(filterOptions.startDate).format('YYYY-MM-DD'),
            endDate: moment(filterOptions.endDate).format('YYYY-MM-DD')
        });
    };

    const [loadReport, { loading, data }] = useLazyQuery(REPORT, { fetchPolicy: "no-cache" });

    if (loading) return <LoadingComponent loading={loading} />;

    if (data && data.report && openReport) {
        window.open(`${process.env.REACT_APP_SERVER_URI || 'http://localhost:3005/'}static/${data.report.filename}`, 'PDF Report');
        setOpenReport(false);
    }

    return (
        <>
            <div className={classes.root}>
                <div className={classes.project}>
                    <AutocompleteProject
                        isError={false}
                        setProjectId={setProjectId}
                    />
                </div>
                <DateRangePickerComponent setDateRangeFilter={handleChangeDateRange} />
                <Button color="primary" onClick={() => { setOpenReport(true); loadReport(); }}>Download Report</Button>
            </div>
            <QueryTimesheet dates={dates} project_id={project_id} />
        </>

    );
}