import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import { makeStyles } from '@material-ui/core/styles';

import FormProject from './FormProject';

import { projectUpdater } from '../../libs';
import { CREATE_PROJECT } from '../../config/gqls';

const styles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            width: '500px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '300px',
        },
    },
}));

const CreateProjectDialog = ({ handleCloseDialog }) => {

    const classes = styles();

    const [createMutation] = useMutation(CREATE_PROJECT, { update: projectUpdater.created });

    const handleClose = () => {
        handleCloseDialog();
    }

    const handleSave = (input) => {
        createMutation({ variables: { input } });
        handleCloseDialog();
    }

    return (
        <div className={classes.root}>
            <FormProject
                project={{}}
                cancelHandler={handleClose}
                saveHandler={handleSave}
            />
        </div>
    );
}

export default CreateProjectDialog;