import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { useMutation } from "@apollo/react-hooks";
import { CREATE_TIMELOG, CREATE_MULTI_TIMELOG } from '../../config/gqls';
import { TimelogCacheUpdater } from '../../libs';
import ErrorPanelComponent from '../common/ErrorPanelComponent';

const styles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        [theme.breakpoints.up('sm')]: {
            width: '500px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '250px',
        },
    },
    buttons: {
        width: '100%',
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
}));

const CreateFormTimelog = ({ issue, handleCloseDialog }) => {

    const classes = styles();

    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(moment.utc());
    const [endDate, setEndDate] = useState(moment.utc());
    const [valueLog, setValueLog] = useState('');
    const [descr, setDescr] = useState('');
    const [isPeriod, setIsPeriod] = useState(false);
    const [paidUp, setPaidUp] = useState(true);

    const updaterTimelog = new TimelogCacheUpdater(true);

    const [createSingleTimelog] = useMutation(
        CREATE_TIMELOG, {
        update: updaterTimelog.createdSingle
    });

    const [createMultiTimelogs] = useMutation(
        CREATE_MULTI_TIMELOG, {
        update: updaterTimelog.createdMulti
    });

    moment.updateLocale("en", {
        week: {
            dow: 1, // First day of week is Monday
        }
    });

    const handleClose = () => {
        handleCloseDialog();
    }

    const handleSave = () => {

        if (!valueLog) {
            setOpen(true);
            return;
        }

        if (isPeriod) {
            const arrayBody = [];
            const start = moment(startDate);
            const end = moment(endDate);

            const diffDates = end.diff(start, 'days') + 1;

            for (let i = 0; i < diffDates; i++) {
                arrayBody.push({
                    project_id: issue.project_id,
                    issue_id: issue.id,
                    valueLog: parseFloat(valueLog),
                    dateLog: start.clone().add(i, 'days'),
                    descr,
                    paidUp
                });
            }

            createMultiTimelogs({
                variables: {
                    input: arrayBody
                }
            });

        } else {
            createSingleTimelog({
                variables: {
                    input: {
                        project_id: issue.project_id,
                        issue_id: issue.id,
                        dateLog: moment(startDate),
                        valueLog: parseFloat(valueLog),
                        descr,
                        paidUp
                    }
                }
            });
        }

        handleCloseDialog();
    }

    const handleChange = (event) => {
        switch (event.target.name) {
            case 'isPeriod':
                setIsPeriod(event.target.checked);
                break;
            case 'valueLog':
                setValueLog(event.target.value);
                break;
            case 'descr':
                setDescr(event.target.value);
                break;
            case 'paidUp':
                setPaidUp(event.target.checked);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <FormControl className={classes.root}>

                <ErrorPanelComponent open={open} setOpen={setOpen} />

                <TextField
                    id="valueLog"
                    name="valueLog"
                    label="Time Log, h"
                    margin="normal"
                    value={valueLog}
                    onChange={handleChange}
                    error={!valueLog}
                    autoFocus
                    required
                    fullWidth
                />
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isPeriod}
                                onChange={handleChange}
                                name="isPeriod"
                                color="primary"
                            />
                        }
                        label="Log Time for Period"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={paidUp}
                                onChange={handleChange}
                                name="paidUp"
                                color="primary"
                            />
                        }
                        label="Time is paid"
                    />
                </FormGroup>
                <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="startDate-picker-dialog"
                        label={isPeriod ? 'Start Date' : 'Date'}
                        format="DD.MM.YYYY"
                        autoOk="true"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        fullWidth
                    />
                    {
                        isPeriod ?

                            <KeyboardDatePicker
                                margin="normal"
                                id="endDate-picker-dialog"
                                label="End Date"
                                format="DD.MM.YYYY"
                                autoOk="true"
                                value={endDate}
                                onChange={(date) => setEndDate(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                fullWidth
                            /> :
                            null
                    }
                </MuiPickersUtilsProvider>

                <TextField
                    id="descr"
                    name="descr"
                    label="Description"
                    value={descr}
                    onChange={handleChange}
                    multiline
                    rowsMax="4"
                    fullWidth
                />
            </FormControl>
            <div className={classes.buttons}>
                <Button color="primary" onClick={handleClose}>Cancel</Button>
                <Button color="primary" onClick={handleSave} >Save</Button>
            </div>
        </>
    );
}

CreateFormTimelog.propTypes = {
    issue: PropTypes.object.isRequired,
    handleCloseDialog: PropTypes.func,
};

export default CreateFormTimelog;