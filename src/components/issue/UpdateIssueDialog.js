import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from '@apollo/react-components';
import { makeStyles } from '@material-ui/core/styles';

import FormIssue from './FormIssue';

import { issueUpdater } from '../../libs';
import { UPDATE_ISSUE } from '../../config/gqls';

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

const UpdateIssueDialog = ({ issue, handleCloseDialog }) => {

    const classes = styles();

    const handleClose = () => {
        handleCloseDialog();
    }

    const handleSave = (input, updateIssue) => {
        updateIssue({ variables: { id: issue.id, input } });
        handleCloseDialog();
    }

    return (
        <Mutation
            mutation={UPDATE_ISSUE}
            key={issue.id}
            update={issueUpdater.updated}
        >
            {(updateIssue) => (
                <div className={classes.root}>
                    <FormIssue
                        issue={issue}
                        cancelHandler={handleClose}
                        saveHandler={(input) => { handleSave(input, updateIssue) }}
                    />
                </div>
            )}
        </Mutation>
    );
}

UpdateIssueDialog.propTypes = {
    issue: PropTypes.object.isRequired,
    handleCloseDialog: PropTypes.func.isRequired
};

export default UpdateIssueDialog;