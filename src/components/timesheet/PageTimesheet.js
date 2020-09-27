import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { useLazyQuery } from '@apollo/react-hooks';

import { DateRangePickerComponent, LoadingComponent } from '../common';
import { QueryTimesheet } from './';
import { REPORT } from '../../config/gqls';

export default () => {

    const [dates, setDates] = useState({
        startDate: moment().startOf('isoWeek').format('YYYY-MM-DD'),
        endDate: moment().endOf('isoWeek').format('YYYY-MM-DD')
    })

    const handleChangeDateRange = (filterOptions) => {
        setDates({
            startDate: moment(filterOptions.startDate).format('YYYY-MM-DD'),
            endDate: moment(filterOptions.endDate).format('YYYY-MM-DD')
        });
    };

    const [openReport, { loading, data }] = useLazyQuery(REPORT);

    if (loading) return <LoadingComponent loading={loading} />;

    if (data && data.report) {
        window.open(`http://localhost:3005/static/${data.report.filename}`, 'PDF Report');
    }

    return (
        <>
            <DateRangePickerComponent setDateRangeFilter={handleChangeDateRange} />
            <Button color="primary" onClick={openReport}>Primary</Button>
            <QueryTimesheet dates={dates} />
        </>

    );
}