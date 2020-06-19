import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from '@apollo/react-components';
import { makeStyles } from '@material-ui/core/styles';

import FormProject from './FormProject';

import { UPDATE_PROJECT } from '../../config/gqls';

const styles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            width: '500px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '350px',
        },
    },
}));

const UpdateProjectDialog = ({ project, handleCloseDialog }) => {

    const classes = styles();

    const handleClose = () => {
        handleCloseDialog();
    }

    const handleSave = (input, updateProject) => {
        updateProject({ variables: { id: project.id, input } });
        handleCloseDialog();
    }

    return (
        <Mutation mutation={UPDATE_PROJECT} key={project.id}>
            {(updateProject) => (
                <div className={classes.root}>
                    <FormProject
                        project={project}
                        cancelHandler={handleClose}
                        saveHandler={(input) => { handleSave(input, updateProject) }}
                    />
                </div>
            )}
        </Mutation>
    );
}

UpdateProjectDialog.propTypes = {
    project: PropTypes.object.isRequired,
    handleCloseDialog: PropTypes.func.isRequired
};

export default UpdateProjectDialog;