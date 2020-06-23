import React, { useState } from 'react';
import moment from 'moment';

import { DateRangePickerComponent } from '../common';
import { QueryTimesheet } from './';

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

    return (
        <>
            <DateRangePickerComponent setDateRangeFilter={handleChangeDateRange} />
            <QueryTimesheet dates={dates} />
        </>

    );
}