import React, { useState } from 'react';

import moment from 'moment';
import 'bootstrap-daterangepicker/daterangepicker.css';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DateRangePicker from 'react-bootstrap-daterangepicker';

const DISPLAY_FORMAT = 'DD.MM.YYYY';
const LABEL_TODAY = 'Today';
const LABEL_WEEK = 'Week';
const LABEL_TWO_WEEKS = 'Two Weeks';
const LABEL_MONTH = 'Month';


const DateRangePickerComponent = (props) => {

    const [startDate, setStartDate] = useState(moment().startOf('isoWeek'));
    const [endDate, setEndDate] = useState(moment().endOf('isoWeek'));

    const handleDateRangePickerApply = (event, datePicker) => {
        _setStateDatePicker(datePicker.startDate, datePicker.endDate);
    }

    const handleNextButton = (event) => {
        const rangeDifference = endDate.diff(startDate, 'days') + 1;
        const nextStartDate = moment(startDate).add(rangeDifference, 'days');
        const nextEndDate = moment(endDate).add(rangeDifference, 'days');
        _setStateDatePicker(nextStartDate, nextEndDate);
    }

    const handleBackButton = (event) => {
        const rangeDifference = endDate.diff(startDate, 'days') + 1;
        const previousStartDate = moment(startDate).subtract(rangeDifference, 'days');
        const previousEndDate = moment(endDate).subtract(rangeDifference, 'days');
        _setStateDatePicker(previousStartDate, previousEndDate);
    }

    const _setStateDatePicker = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        props.setDateRangeFilter({
            startDate: moment(start).format('MM/DD/YYYY'),
            endDate: moment(end).format('MM/DD/YYYY'),
        });
    }

    const _getRangeOptions = () => {
        const ranges = {
            [LABEL_TODAY]: [moment(), moment()],
            [LABEL_WEEK]: [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
            [LABEL_TWO_WEEKS]: [moment().subtract(1, 'week').startOf('isoWeek'), moment().endOf('isoWeek')],
            [LABEL_MONTH]: [moment().startOf('month'), moment().endOf('month')],
        }
        return ranges;
    }

    return (
        <ButtonGroup size="large" color="primary" aria-label="outlined primary button group">
            <Button endIcon={<ArrowBackIosIcon />} onClick={handleBackButton} />
            <DateRangePicker
                onApply={handleDateRangePickerApply}
                startDate={startDate}
                endDate={endDate}
                ranges={_getRangeOptions()}
                showWeekNumbers={true}
                locale={{
                    format: DISPLAY_FORMAT,
                    firstDay: 1
                }}
            >
                <Button size="large" variant="outlined" color="primary">
                    {`${moment(startDate).format(DISPLAY_FORMAT)} - ${moment(endDate).format(DISPLAY_FORMAT)}`}
                </Button>
            </DateRangePicker>
            <Button variant="outlined" color="primary" startIcon={<ArrowForwardIosIcon />} onClick={handleNextButton} />
        </ButtonGroup>
    );
}

export default DateRangePickerComponent;