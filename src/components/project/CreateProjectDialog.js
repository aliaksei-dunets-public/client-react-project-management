import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { Mutation } from '@apollo/react-components';
import { projectStatuses, severity } from '../../config/constants';
import { GET_PROJECT_SET, CREATE_PROJECT } from '../../config/gqls';

const styles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        [theme.breakpoints.up('xs')]: {
            width: 400
        },
        [theme.breakpoints.down('xs')]: {
            width: 250
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

const CreateProject = ({ handleCloseDialog }) => {

    const classes = styles();

    const [code, setCode] = React.useState('');
    const [name, setName] = React.useState('');
    const [descr, setDescr] = React.useState('');
    const [status, setStatus] = React.useState(projectStatuses[0].code || '');
    const [external_code, setExternalCode] = React.useState('');
    const [external_url, setExternalUrl] = React.useState('');

    const handleClose = () => {
        handleCloseDialog();
    }

    const handleSave = async (callMutation) => {

        callMutation({
            variables: {
                input: {
                    code,
                    name,
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
            case 'code':
                setCode(event.target.value.toUpperCase());
                break;
            case 'name':
                setName(event.target.value);
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
            mutation={CREATE_PROJECT}
            update={(cache, { data: { createProject } }) => {
                const { projects } = cache.readQuery({ query: GET_PROJECT_SET });
                cache.writeQuery({
                    query: GET_PROJECT_SET,
                    data: { projects: projects.concat([createProject]) },
                });
                cache.writeData({
                    data: {
                        messageBarOpen: true,
                        messageBarSeverity: severity.success,
                        messageBarText: `Project ${createProject.name} (${createProject.code}) was created successfully.`,
                    },
                });
            }}
        >
            {(createProject) => (
                <>
                    <FormControl className={classes.root}>
                        <TextField
                            id="code"
                            name="code"
                            label="Code"
                            value={code}
                            onChange={handleChange}
                            error={!code}
                            fullWidth
                            required
                            autoFocus
                        />
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            value={name}
                            onChange={handleChange}
                            error={!name}
                            fullWidth
                            required
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
                            {projectStatuses.map(option => (
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

CreateProject.propTypes = {
    handleCloseDialog: PropTypes.func,
};

export default CreateProject;