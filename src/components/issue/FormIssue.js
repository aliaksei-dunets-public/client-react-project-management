import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import i18n from '../../i18n';
import { issueStatuses, issuePriority } from '../../config/constants';
import AutocompleteProject from '../project/AutocompleteProject';
import ErrorPanelComponent from '../common/ErrorPanelComponent';

const styles = makeStyles(theme => ({
    form: {
        width: '100%',
        '& > *': {
            margin: theme.spacing(1),
            width: 'auto'
        },
    },
    buttons: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));

const FormIssue = ({ issue, cancelHandler, saveHandler }) => {

    const classes = styles();

    const [open, setOpen] = useState(false);
    const [project_id, setProjectId] = useState(issue.project_id || '');
    const [summary, setSummary] = useState(issue.summary || '');
    const [descr, setDescr] = useState(issue.descr || '');
    const [status, setStatus] = useState(issue.status || issueStatuses[0].code);
    const [priority, setPriority] = useState(issue.priority || issuePriority[0].code);
    const [external_code, setExternalCode] = useState(issue.external_code || '');
    const [external_url, setExternalUrl] = useState(issue.external_url || '');

    const handleChange = (event) => {
        switch (event.target.name) {
            case 'summary':
                setSummary(event.target.value);
                break;
            case 'descr':
                setDescr(event.target.value);
                break;
            case 'status':
                setStatus(event.target.value);
                break;
            case 'priority':
                setPriority(event.target.value);
                break;
            case 'external_code':
                setExternalCode(event.target.value);
                break;
            case 'external_url':
                setExternalUrl(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleSave = () => {

        if (!project_id || !summary) {
            setOpen(true);
            return;
        }

        saveHandler({
            project_id,
            summary,
            descr,
            status,
            priority,
            external_code,
            external_url,
        })

        cancelHandler();
    }

    return (
        <>
            <FormControl className={classes.form}>

                <ErrorPanelComponent open={open} setOpen={setOpen} />

                {
                    issue.project_id ? null :
                        <AutocompleteProject
                            isError={project_id ? false : true}
                            setProjectId={setProjectId}
                            setExternalUrl={setExternalUrl}
                        />
                }
                <TextField
                    id="summary"
                    name="summary"
                    label="Summary"
                    value={summary}
                    onChange={handleChange}
                    error={!summary}
                    fullWidth
                    required
                    autoFocus
                />
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
                <TextField
                    id="status"
                    label="Status"
                    name="status"
                    value={status}
                    onChange={handleChange}
                    select
                    fullWidth
                    required
                >
                    {issueStatuses.map(option => (
                        <MenuItem key={option.code} value={option.code}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="priority"
                    label="Priority"
                    name="priority"
                    value={priority}
                    onChange={handleChange}
                    select
                    fullWidth
                    required
                >
                    {issuePriority.map(option => (
                        <MenuItem key={option.code} value={option.code}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="external_code"
                    name="external_code"
                    label="External Code"
                    margin="normal"
                    value={external_code}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    id="external_url"
                    name="external_url"
                    label="External URI"
                    value={external_url}
                    onChange={handleChange}
                    fullWidth
                />
            </FormControl>
            <div className={classes.buttons}>
                <Button variant="contained" onClick={cancelHandler}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleSave} >Save</Button>
            </div>
        </>
    );
}

FormIssue.propTypes = {
    issue: PropTypes.object.isRequired,
    cancelHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired
};

export default FormIssue;