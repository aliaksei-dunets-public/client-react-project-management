import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


import { projectStatuses } from '../../config/constants';

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

const FormProject = ({ project, cancelHandler, saveHandler }) => {

    const classes = styles();

    const [code, setCode] = React.useState(project.code || '');
    const [name, setName] = React.useState(project.name || '');
    const [descr, setDescr] = React.useState(project.descr || '');
    const [status, setStatus] = React.useState(project.status || projectStatuses[0].code);
    const [external_code, setExternalCode] = React.useState(project.external_code || '');
    const [external_url, setExternalUrl] = React.useState(project.external_url || '');

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

    const handleSave = () => {
        saveHandler({
            code,
            name,
            descr,
            status,
            external_code,
            external_url
        });

        cancelHandler();
    }

    return (
        <>
            <FormControl className={classes.form}>
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
                    rowsMax="6"
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
                <Button variant="contained" onClick={cancelHandler}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleSave} >Save</Button>
            </div>
        </>
    );
}

FormProject.propTypes = {
    project: PropTypes.object,
    cancelHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired
};

export default FormProject;