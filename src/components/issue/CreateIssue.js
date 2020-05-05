import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { Mutation } from '@apollo/react-components';
import { issueStatuses, severity } from '../../config/constants';
import { GET_ISSUE_SET, CREATE_ISSUE, GET_PROJECT } from '../../config/gqls';

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

const CreateIssue = ({ project, handleCloseDialog }) => {

    const classes = styles();

    const [summary, setSummary] = React.useState('');
    const [descr, setDescr] = React.useState('');
    const [status, setStatus] = React.useState(issueStatuses[0].code || '');
    const [external_code, setExternalCode] = React.useState('');
    const [external_url, setExternalUrl] = React.useState(project.external_url || '');

    const handleClose = () => {
        handleCloseDialog();
    }

    const handleSave = async (callMutation) => {

        callMutation({
            variables: {
                input: {
                    project_id: project.id,
                    summary,
                    descr,
                    status,
                    external_code,
                    external_url,
                }
            }
        })

        handleCloseDialog();
    }

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

    return (
        <Mutation
            mutation={CREATE_ISSUE}
            update={(cache, { data: { createIssue } }) => {

                try {
                    const { issues } = cache.readQuery({ query: GET_ISSUE_SET });
                    cache.writeQuery({
                        query: GET_ISSUE_SET,
                        data: { issues: issues.concat(createIssue) }
                    });
                } catch (error) {

                }

                try {
                    const { project } = cache.readQuery({ query: GET_PROJECT, variables: { id: createIssue.project_id } });
                    const newProject = { ...project };
                    newProject.issues = project.issues.concat(createIssue);
                    cache.writeQuery({
                        query: GET_PROJECT,
                        data: { project: newProject }
                    });
                } catch (error) {

                }

                cache.writeData({
                    data: {
                        messageBarOpen: true,
                        messageBarSeverity: severity.success,
                        messageBarText: `Issue ${createIssue.summary} (${createIssue.code}) was created successfully.`,
                    },
                });
            }}
        >
            {(createProject) => (
                <>
                    <FormControl className={classes.root}>
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
                        <Button color="primary" onClick={handleClose}>Cancel</Button>
                        <Button color="primary" onClick={() => { handleSave(createProject) }} >Save</Button>
                    </div>
                </>
            )}
        </Mutation>
    );
}

CreateIssue.propTypes = {
    project: PropTypes.object.isRequired,
    handleCloseDialog: PropTypes.func,
};

export default CreateIssue;