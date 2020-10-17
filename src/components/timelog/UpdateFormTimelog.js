import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { Mutation } from '@apollo/react-components';
import { UPDATE_TIMELOG } from '../../config/gqls';
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

const UpdateFormTimelog = ({ timelog, handleHide }) => {

    const classes = styles();

    const [open, setOpen] = useState(false);
    const [dateLog, setDateLog] = useState(timelog.dateLog);
    const [valueLog, setValueLog] = useState(timelog.valueLog);
    const [descr, setDescr] = useState(timelog.descr);
    const [paidUp, setPaidUp] = useState(timelog.paidUp);

    moment.updateLocale("en", {
        week: {
            dow: 1, // First day of week is Monday
        }
    });

    const handleSave = async (callMutation) => {

        if (!valueLog) {
            setOpen(true);
            return;
        }

        callMutation({
            variables: {
                id: timelog.id,
                input: {
                    // project_id: timelog.project_id,
                    // issue_id: timelog.issue_id,
                    dateLog,
                    valueLog: parseFloat(valueLog),
                    descr,
                    paidUp
                }
            }
        })

        handleHide();
    }

    const handleChange = (event) => {
        switch (event.target.name) {
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
        <Mutation mutation={UPDATE_TIMELOG} key={timelog.id}>
            {(callMutation) => (
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
                                label='Date'
                                format="DD.MM.YYYY"
                                autoOk="true"
                                value={dateLog}
                                onChange={(date) => setDateLog(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                fullWidth
                            />
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
                        <Button color="primary" onClick={handleHide}>Cancel</Button>
                        <Button color="primary" onClick={() => { handleSave(callMutation) }} >Save</Button>
                    </div>
                </>
            )}
        </Mutation>
    );
}

UpdateFormTimelog.propTypes = {
    timelog: PropTypes.object.isRequired,
    handleHide: PropTypes.func,
};

export default UpdateFormTimelog;