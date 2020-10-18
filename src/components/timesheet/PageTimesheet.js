import React, { useState } from 'react';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { DateRangePickerComponent } from '../common';
import AutocompleteProject from '../project/AutocompleteProject';
import { QueryTimesheet, DownloadPDFTimesheet } from './';

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

    const handleChangeDateRange = (filterOptions) => {
        setDates({
            startDate: moment(filterOptions.startDate).format('YYYY-MM-DD'),
            endDate: moment(filterOptions.endDate).format('YYYY-MM-DD')
        });
    };

    return (
        <>
            <div className={classes.root}>
                <Hidden xsDown>
                    <div className={classes.project}>
                        <AutocompleteProject
                            isError={false}
                            setProjectId={setProjectId}
                        />
                    </div>
                </Hidden>
                <DateRangePickerComponent setDateRangeFilter={handleChangeDateRange} />
                <DownloadPDFTimesheet startDate={dates.startDate} endDate={dates.endDate} project_id={project_id} />
            </div>
            <QueryTimesheet dates={dates} project_id={project_id} />
        </>

    );
}