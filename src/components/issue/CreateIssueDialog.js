import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from "@apollo/react-hooks";
import { makeStyles } from '@material-ui/core/styles';

import FormIssue from './FormIssue';

import { issueUpdater } from '../../libs';
import { CREATE_ISSUE } from '../../config/gqls';

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

const CreateIssueDialog = ({ project, handleCloseDialog }) => {

    const classes = styles();

    const [createMutation] = useMutation(CREATE_ISSUE, { update: issueUpdater.created });

    const handleClose = () => {
        handleCloseDialog();
    }

    const handleSave = (input) => {
        createMutation({ variables: { input } });
        handleClose();
    }

    return (
        <div className={classes.root}>
            <FormIssue
                issue={{ project_id: project.id, external_url: project.external_url }}
                cancelHandler={handleClose}
                saveHandler={handleSave}
            />
        </div>
    );
}

CreateIssueDialog.propTypes = {
    project: PropTypes.object.isRequired,
    handleCloseDialog: PropTypes.func
};

export default CreateIssueDialog;