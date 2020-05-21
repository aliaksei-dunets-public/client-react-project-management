import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { useMutation } from "@apollo/react-hooks";
import { CREATE_TIMELOG } from '../../config/gqls';
import { createdTimelog } from '../../libs';

const styles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        width: 400,
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

    const [startDate, setStartDate] = React.useState(moment());
    const [endDate, setEndDate] = React.useState(moment());
    const [valueLog, setValueLog] = React.useState('');
    const [descr, setDescr] = React.useState('');
    const [isPeriod, setIsPeriod] = React.useState(false);

    moment.updateLocale("en", {
        week: {
            dow: 1, // First day of week is Monday
        }
    });

    const handleClose = () => {
        handleCloseDialog();
    }

    const handleSave = async (callMutation) => {

        let valueDate = null;

        // if (isPeriod) {
        // body.startDate = moment(this.state.startDate);
        // body.endDate = moment(this.state.endDate);
        // } else {
        valueDate = moment(startDate);
        // }

        callMutation({
            variables: {
                input: {
                    project_id: issue.project_id,
                    issue_id: issue.id,
                    dateLog: valueDate,
                    valueLog: parseFloat(valueLog),
                    descr,
                }
            }
        })

        handleCloseDialog();
    }

    const handleChange = (event) => {
        switch (event.target.name) {
            case 'isPeriod':
                setIsPeriod(event.target.checked);
                break;
            // case 'startDate':
            //     setStartdDate(event.target.value);
            //     break;
            // case 'endDate':
            //     setEndDate(event.target.value);
            //     break;
            case 'valueLog':
                setValueLog(event.target.value);
                break;
            case 'descr':
                setDescr(event.target.value);
                break;
            default:
                break;
        }
    }

    const [create] = useMutation(
        CREATE_TIMELOG, {
        update: createdTimelog
    });

    return (
        <>
            <FormControl className={classes.root}>
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
                <Button color="primary" onClick={() => { handleSave(create) }} >Save</Button>
            </div>
        </>
    );
}

CreateFormTimelog.propTypes = {
    issue: PropTypes.object.isRequired,
    handleCloseDialog: PropTypes.func,
};

export default CreateFormTimelog;