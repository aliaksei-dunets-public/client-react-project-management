import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { Mutation } from '@apollo/react-components';
import { projectStatuses } from '../../config/constants';
import { UPDATE_PROJECT } from '../../config/gqls';

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

const UpdateFormProject = ({ project, handleHide }) => {

    const classes = styles();

    const [code, setCode] = React.useState(project.code || '');
    const [name, setName] = React.useState(project.name || '');
    const [descr, setDescr] = React.useState(project.descr || '');
    const [status, setStatus] = React.useState(project.status || '');
    const [external_code, setExternalCode] = React.useState(project.external_code || '');
    const [external_url, setExternalUrl] = React.useState(project.external_url || '');

    const handleSave = async (updateProject) => {

        updateProject({
            variables: {
                id: project.id,
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

        handleHide();
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
        <Mutation mutation={UPDATE_PROJECT} key={project.id}>
            {(updateProject) => (
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
                        <Button color="primary" onClick={handleHide}>Cancel</Button>
                        <Button color="primary" onClick={() => { handleSave(updateProject) }} >Save</Button>
                    </div>
                </>
            )}
        </Mutation>
    );
}

UpdateFormProject.propTypes = {
    project: PropTypes.object.isRequired,
    handleHide: PropTypes.func.isRequired,
};

export default UpdateFormProject;