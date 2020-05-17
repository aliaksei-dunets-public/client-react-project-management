import React, { useState } from 'react';
import moment from 'moment';

import { DateRangePickerComponent } from '../common';
import { QueryTimesheet } from './';

export default () => {

    const [startDate, setStartDate] = useState(moment().startOf('isoWeek').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().endOf('isoWeek').format('YYYY-MM-DD'));

    const handleChangeDateRange = (filterOptions) => {
        setStartDate(moment(filterOptions.startDate).format('YYYY-MM-DD'));
        setEndDate(moment(filterOptions.endDate).format('YYYY-MM-DD'));
    };

    return (
        <>
            <DateRangePickerComponent setDateRangeFilter={handleChangeDateRange} />
            <QueryTimesheet startDate={startDate} endDate={endDate} />
        </>

    );
}